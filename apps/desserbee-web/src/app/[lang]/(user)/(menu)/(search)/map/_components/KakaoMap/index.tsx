'use client';

import Script from 'next/script';
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';

import storeMarkerImage from '@/app/[lang]/(user)/(menu)/(search)/map/_assets/svg/icon-marker.svg';
import userMarkerImage from '@/app/[lang]/(user)/(menu)/(search)/map/_assets/svg/icon-current-marker.svg';

import { PreferenceTags } from '../PreferenceTags';
import { MapPanel } from '../MapPanel';

import type { MapPosition } from '@repo/entity/src/map';

import GeolocationService from '@repo/usecase/src/geolocationService';
import GeolocationController from '@repo/infrastructures/src/controllers/geolocationController';
import { KalmanLocationFilter } from '@repo/infrastructures/src/filters/locationFilter';
import { MovingAverageFilter } from '@repo/infrastructures/src/filters/movingAverageFilter';

import MapService from '@repo/usecase/src/mapService';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

import { KAKAO_MAP_API_URL } from '../../_consts/map';
import {
  type NearByStoreData,
  type SavedListData,
} from '@repo/entity/src/store';

import { LocationPermissionModal } from '../../_modals/LocationPermissionModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { GeolocationPermissionError } from '@repo/usecase/src/geolocationService';

interface KakaoMapProps {
  userPreferences: string[];
  preferenceCategories: string[];
  totalSavedList: SavedListData[];
}

// 서비스가 모두 초기화되었는지 확인하는 헬퍼 함수
const areServicesInitialized = (services: {
  mapService: MapService | null;
  geoService: GeolocationService | null;
  storeService: StoreService | null;
}) => {
  return services.mapService && services.geoService && services.storeService;
};

export function KakaoMap({
  userPreferences,
  preferenceCategories,
}: KakaoMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<{
    mapService: MapService | null;
    geoService: GeolocationService | null;
    storeService: StoreService | null;
  }>({
    mapService: null,
    geoService: null,
    storeService: null,
  });

  const [currentPosition, setCurrentPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });
  const [lastFetchPosition, setLastFetchPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [nearByStores, setNearByStores] = useState<NearByStoreData[]>([]);

  const FETCH_RADIUS_KM = 3;
  const REFETCH_THRESHOLD_KM = 2;
  const POSITION_UPDATE_INTERVAL = 3000;
  const lastUpdateTimeRef = useRef(0);
  const isLoadingRef = useRef(false);

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 3;
  const RETRY_DELAY = 3000;

  const { push, pop } = useContext(PortalContext);

  const closeModal = useCallback(() => {
    pop('modal');
  }, [pop]);

  const openPermissionModal = useCallback(() => {
    push('modal', {
      component: <LocationPermissionModal onClose={closeModal} />,
    });
  }, [closeModal, push]);

  const handleStoreMarkerClick = useCallback(
    (storeId: string) => {
      router.replace(`?storeId=${storeId}&bottomsheet=true`, {
        scroll: false,
      });
    },
    [router],
  );

  const calculateDistance = useCallback(
    (pos1: MapPosition, pos2: MapPosition): number => {
      const R = 6371;
      const dLat = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
      const dLon = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((pos1.latitude * Math.PI) / 180) *
          Math.cos((pos2.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    [],
  );

  const handleMoveToCurrentPosition = useCallback(() => {
    if (servicesRef.current.mapService && isMapLoaded) {
      servicesRef.current.mapService.setMapCenter(currentPosition);
    }
  }, [isMapLoaded]);

  const mapPanelProps = useMemo(
    () => ({
      moveToCurrentPosition: handleMoveToCurrentPosition,
    }),
    [handleMoveToCurrentPosition],
  );

  // 지도 로드 후
  // 1. 현재 위치 기반으로 일정 거리 내의 새로운 가게 불러오기
  const fetchNearbyStores = useCallback(
    async (position: MapPosition) => {
      try {
        if (!servicesRef.current.storeService) {
          console.log(
            'fetchNearbyStores: storeService 서비스가 초기화되지 않음, 주변 가게 불러오기 중지 🛑',
          );
          return null;
        }

        const nearByStores =
          await servicesRef.current.storeService!.getNearbyStores({
            latitude: position.latitude,
            longitude: position.longitude,
            radius: FETCH_RADIUS_KM,
          });

        setNearByStores(nearByStores);
        console.log('fetchNearbyStores: 주변 가게 업데이트 완료 🏪');

        setRetryCount(0);
        setError(null);
        return nearByStores;
      } catch (error) {
        console.error('가게 정보를 불러오는데 실패했습니다:', error);
        console.error('다시 시도합니다 :' + 'retry(' + retryCount + ')');
        if (retryCount < MAX_RETRY) {
          setRetryCount((prev) => prev + 1);
          setTimeout(() => fetchNearbyStores(position), RETRY_DELAY);
        } else {
          setError(
            '가게 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
          );
        }
        console.log(
          'fetchNearbyStores: 가게 정보 재시도에도 불러오기 실패, 주변 가게 불러오기 중지 🛑',
        );
        return null;
      }
    },
    [retryCount],
  );

  // 2. 새로운 위치 저장 + 새로운 위치에 따른 새로운 가게들 정보 담은 클러스터 마커 추가
  const updateLastFetchPosition = useCallback((position: MapPosition) => {
    console.log('updateLastFetchPosition: 마지막 fetch 위치 저장 ✅');
    setLastFetchPosition(position);
  }, []);

  const updateNewClusterMarkers = useCallback(
    async (position: MapPosition, stores: NearByStoreData[]) => {
      if (!areServicesInitialized(servicesRef.current)) {
        console.log(
          'updateNewClusterMarkers: 서비스가 초기화되지 않음, 가게 클러스터 마커 업데이트 중지 🛑',
        );
        return;
      }
      try {
        isLoadingRef.current = true;

        if (stores.length !== 0) {
          console.log(
            'updateNewClusterMarkers: 주변 가게 있음 🏪, 새로운 가게 마커 추가 시작  ',
          );
          await servicesRef.current.mapService?.addMarkersWithClustering(
            stores,
            storeMarkerImage.src,
            handleStoreMarkerClick,
          );
          console.log('updateNewClusterMarkers: 새로운 가게 마커 추가 완료 📍');
          updateLastFetchPosition(position);
        } else {
          console.log('updateNewClusterMarkers: 주변 가게 정보 없음 🍃');
        }
      } catch (error) {
        console.error(
          'updateNewClusterMarkers: 가게 마커 업데이트 중 오류 ⚠️:',
          error,
        );
        setError('가게 정보 업데이트에 실패했습니다.');
      } finally {
        isLoadingRef.current = false;
      }
    },
    [servicesRef, handleStoreMarkerClick, updateLastFetchPosition],
  );

  // 3. tracking 중 지속적으로 실행되는 메서드
  const onPositionSuccess = useCallback(
    async (position: MapPosition) => {
      try {
        if (!areServicesInitialized(servicesRef.current)) {
          console.log(
            'onPositionSuccess: 서비스들이 초기화되지 않음, 위치 업데이트 중지 🛑',
          );
          return;
        }

        console.log(
          'onPositionSuccess: 트래킹 시작, 위치 업데이트 콜백 실행',
          position,
        );

        const now = Date.now();
        if (now - lastUpdateTimeRef.current < POSITION_UPDATE_INTERVAL) {
          console.log('onPositionSuccess: 업데이트 간격이 너무 짧음, 스킵 🛑');
          return;
        }

        if (isLoadingRef.current) {
          console.log('onPositionSuccess: 이전 업데이트가 진행 중, 스킵 🛑');
          return;
        }

        lastUpdateTimeRef.current = now;
        console.log('onPositionSuccess: 위치 업데이트 시작 🚩');

        console.log('onPositionSuccess: 현재 위치 마커 제거 시작 🗑️');
        await servicesRef.current.mapService?.removeCurrentPositionMarker();

        console.log('onPositionSuccess: 새로운 현재 위치 마커 추가 📍');
        await servicesRef.current.mapService?.addCurrentPositionMaker(
          position,
          userMarkerImage.src,
        );
        setCurrentPosition(position);
        console.log('onPositionSuccess: 새로운 현재 위치 저장 🧍‍♂️');

        const distanceFromLastFetch = calculateDistance(
          lastFetchPosition,
          position,
        );
        console.log(
          'onPositionSuccess: 마지막 데이터 요청 위치와의 거리 📏:',
          distanceFromLastFetch,
          'km',
        );

        if (
          lastFetchPosition.latitude === 0 ||
          distanceFromLastFetch > REFETCH_THRESHOLD_KM
        ) {
          console.log(
            'onPositionSuccess: 재요청 할 때 됨, (임계값 초과), 주변 가게 정보 업데이트 시작 ✅',
          );

          const nearByStores =
            await servicesRef.current.storeService!.getNearbyStores({
              latitude: position.latitude,
              longitude: position.longitude,
              radius: FETCH_RADIUS_KM,
            });

          await updateNewClusterMarkers(position, nearByStores);
          console.log(
            'onPositionSuccess: 주변 가게 정보 업데이트 완료, 클러스터 마커들도 새로 추가 📍',
          );
        } else {
          console.log(
            'onPositionSuccess: 재요청 임계값 이내, 아직 새로운 가게 재요청 안함 ⌛',
          );
        }
      } catch (error) {
        console.error(
          'onPositionSuccess: 위치 마커 업데이트 중 오류 발생 ⚠️:',
          error,
        );
        if (
          error instanceof GeolocationPermissionError &&
          error.message === 'PERMISSION_DENIED'
        ) {
          console.log(
            'onPositionSuccess: 위치 권한 거부됨, 권한 요청 모달 표시 🪧',
          );
          openPermissionModal();
        } else {
          console.error('onPositionSuccess: 알 수 없는 오류 발생');
        }
        return;
      }
    },
    [
      calculateDistance,
      lastFetchPosition,
      updateNewClusterMarkers,
      openPermissionModal,
    ],
  );

  // 0. 서비스 시작
  const initializeServices = () => {
    console.log('initializeServices: 서비스 초기화 시작');

    const mapService = new MapService({
      mapController: new KakaoMapController(),
    });
    console.log('initializeServices: MapService 초기화 완료 ✅');

    const geoService = new GeolocationService({
      geolocationController: new GeolocationController(
        new KalmanLocationFilter(),
        new MovingAverageFilter(3),
      ),
    });
    console.log('initializeServices: GeolocationService 초기화 완료 ✅');

    const storeService = new StoreService({
      storeRepository: new StoreAPIReopository(),
    });
    console.log('initializeServices: StoreService 초기화 완료 ✅');

    return { mapService, geoService, storeService };
  };

  const loadMap = async (initializedServices: {
    mapService: MapService;
    geoService: GeolocationService;
    storeService: StoreService;
  }) => {
    console.log('loadMap: 지도 로딩 시작 🗺️');

    if (!mapRef.current) {
      console.error('loadMap: Map container not found (mapRef.current falsy');
      return;
    }

    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'geolocation',
      });
      console.log('loadMap - geoService.getCurrentPosition(): 위치 권한 확인');

      if (permissionStatus.state === 'denied') {
        console.log('loadMap: 위치 권한 거부됨');
        openPermissionModal();
        return;
      }

      console.log(
        'loadMap - geoService.getCurrentPosition(): 현재 위치 정보 요청 시작 🏃',
      );
      const result = await initializedServices.geoService.getCurrentPosition();

      if ('errorMessage' in result) {
        console.log(
          'loadMap - geoService.getCurrentPosition(): 오류 발생 ⚠️:',
          {
            message: result.errorMessage,
            type: result.errorType,
          },
        );
        console.log('loadMap: 현재 위치 권한 상태 다시 확인:', {
          state: permissionStatus.state,
          errorType: result.errorType,
        });

        if (result.errorType === 'POSITION_UNAVAILABLE') {
          console.log('loadMap: GPS 사용 불가');
          setError('GPS를 활성화하고 다시 시도해주세요.');
        } else if (result.errorType === 'TIMEOUT') {
          console.log('loadMap: 위치 정보 요청 시간 초과');
          setError('위치 정보를 가져오는데 시간이 너무 오래 걸립니다.');
        } else {
          setError('위치 정보를 가져오는데 실패했습니다.');
        }
        return;
      }

      console.log('loadMap: 현재 위치 정보 획득 성공 🚩:', {
        latitude: result.latitude,
        longitude: result.longitude,
      });

      setCurrentPosition(result);
      console.log('loadMap: 현재 위치 저장 🚩');

      console.log('loadMap: 지도 초기화 시작');
      await initializedServices.mapService.initializeMap(
        mapRef.current,
        result,
      );
      console.log('loadMap: 지도 초기화 완료 🗺️');

      console.log('loadMap: 현재 위치 마커 추가 시작');
      await initializedServices.mapService.addCurrentPositionMaker(
        result,
        userMarkerImage.src,
      );
      console.log('loadMap: 현재 위치 마커 추가 완료 📍');

      await initializedServices.mapService.setMapCenter(result);
      console.log('loadMap: 불러온 위치로 지도 중심 위치 변경');

      console.log('loadMap: 주변 가게 마커 추가 시작');

      await initializedServices.mapService.addMarkersWithClustering(
        nearByStores,
        storeMarkerImage.src,
        handleStoreMarkerClick,
      );
      console.log('loadMap: 주변 가게 마커 추가 완료 📍');

      console.log('loadMap: 실시간 위치 추적 시작');
      initializedServices.geoService.startWatchingPosition(onPositionSuccess, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } catch (err) {
      console.error('loadMap: 지도 초기화 중 오류 발생 ⚠️:', err);
      if (err instanceof GeolocationPermissionError) {
        if (err.message === 'PERMISSION_DENIED') {
          openPermissionModal();
        }
      } else {
        setError('지도 로딩에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (servicesRef.current.geoService && servicesRef.current.mapService) {
        servicesRef.current.geoService.stopWatchingPosition();
        servicesRef.current.mapService.removeCurrentPositionMarker();
      }
    };
  }, [servicesRef]);

  return (
    <div>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        async
        src={KAKAO_MAP_API_URL}
        onReady={() => {
          console.log(
            '-----------------카카오맵 스크립트 onReady 이벤트 발생-------------------',
          );
          window.kakao.maps.load(async () => {
            console.log('카카오맵 API load 콜백 실행');
            console.log(
              '-----------------services 체크 시작-------------------',
            );
            if (isInitialized) {
              console.log('이미 초기화된 상태, 초기화 스킵');
              return;
            }
            try {
              console.log('서비스 초기화 시작');
              const initializedServices = initializeServices();
              console.log('서비스 객체 생성 완료 ☑️', initializedServices);

              if (!areServicesInitialized(initializedServices)) {
                console.error('서비스 초기화 검증 실패 ⚠️');
                throw new Error('서비스 초기화 실패 ⚠️');
              }

              // useRef를 사용하여 서비스 인스턴스 저장
              servicesRef.current = initializedServices;
              setIsMapLoaded(true);
              console.log('지도 로딩 시작 전 서비스 상태 설정 완료');
              console.log(
                '-----------------services 체크 완료-------------------',
              );
              console.log('-----------------load map 시작-------------------');
              await loadMap(initializedServices);
              console.log('-----------------load map 완료-------------------');
            } catch (error) {
              console.error('서비스 초기화 및 지도 로드 중 오류:', error);
              setError('지도 로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
            } finally {
              setIsInitialized(true);
              console.log(
                '-----------------카카오맵 스크립트 onReady 이벤트 종료-------------------',
              );
            }
          });
        }}
      />
      <div
        ref={mapRef}
        className="relative bg-[#E8E8E8] mb-[9px] rounded-base w-full h-[calc(100dvh-295px)] overflow-x-hidden"
      >
        {error && (
          <div className="top-4 left-1/2 z-50 absolute bg-red-100 px-4 py-2 border border-red-400 rounded text-red-700 -translate-x-1/2 transform">
            {error}
          </div>
        )}
        <PreferenceTags
          userPreferences={userPreferences}
          categories={preferenceCategories}
        />
        <MapPanel {...mapPanelProps} />
      </div>
    </div>
  );
}
