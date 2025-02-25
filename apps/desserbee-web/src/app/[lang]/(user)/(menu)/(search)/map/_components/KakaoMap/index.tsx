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

// const nearByStores = [
//   {
//     storeId: 1,
//     storeUuid: 'uuid-1',
//     name: '디저트39 강남점',
//     address: '서울 강남구 강남대로 396',
//     latitude: 37.497175,
//     longitude: 127.027926,
//   },
//   {
//     storeId: 2,
//     storeUuid: 'uuid-2',
//     name: '아티제 강남역점',
//     address: '서울 강남구 테헤란로 151',
//     latitude: 37.499462,
//     longitude: 127.028274,
//   },
//   {
//     storeId: 3,
//     storeUuid: 'uuid-3',
//     name: '투썸플레이스 강남파이낸스센터점',
//     address: '서울 강남구 테헤란로 152',
//     latitude: 37.500175,
//     longitude: 127.029046,
//   },
//   {
//     storeId: 4,
//     storeUuid: 'uuid-4',
//     name: '설빙 강남역점',
//     address: '서울 강남구 강남대로 358',
//     latitude: 37.496533,
//     longitude: 127.0268,
//   },
//   {
//     storeId: 5,
//     storeUuid: 'uuid-5',
//     name: '폴바셋 강남역사거리점',
//     address: '서울 강남구 테헤란로 129',
//     latitude: 37.498325,
//     longitude: 127.027892,
//   },
//   {
//     storeId: 6,
//     storeUuid: 'uuid-6',
//     name: '배스킨라빈스 강남우성점',
//     address: '서울 강남구 테헤란로 156',
//     latitude: 37.500929,
//     longitude: 127.028979,
//   },
// ];

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
        // 바텀시트 열기위해
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
  }, [
    servicesRef.current.mapService,
    isMapLoaded,
    currentPosition,
    servicesRef.current,
  ]);

  const mapPanelProps = useMemo(
    () => ({
      moveToCurrentPosition: handleMoveToCurrentPosition,
    }),
    [handleMoveToCurrentPosition],
  );

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 3;
  const RETRY_DELAY = 3000;

  const fetchNearbyStores = useCallback(
    async (position: MapPosition) => {
      try {
        if (!servicesRef.current.storeService) return null;

        const nearByStores =
          await servicesRef.current.storeService.getNearbyStores({
            latitude: position.latitude,
            longitude: position.longitude,
            radius: FETCH_RADIUS_KM,
          });

        setNearByStores(nearByStores);

        setRetryCount(0);
        setError(null);
        return nearByStores;
      } catch (error) {
        console.error('가게 정보를 불러오는데 실패했습니다:', error);
        if (retryCount < MAX_RETRY) {
          setRetryCount((prev) => prev + 1);
          setTimeout(() => fetchNearbyStores(position), RETRY_DELAY);
        } else {
          setError(
            '가게 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
          );
        }
        return null;
      }
    },
    [retryCount, servicesRef.current.storeService],
  );

  const updateNearbyStores = useCallback(
    async (position: MapPosition) => {
      if (!areServicesInitialized(servicesRef.current)) {
        console.log('서비스가 초기화되지 않음, 가게 정보 업데이트 스킵');
        return;
      }

      try {
        console.log('가게 정보 업데이트 시작');
        isLoadingRef.current = true;

        if (nearByStores) {
          console.log('새로운 가게 마커 추가 시작');
          await servicesRef.current.mapService?.addMarkersWithClustering(
            nearByStores,
            storeMarkerImage.src,
            handleStoreMarkerClick,
          );
          console.log('새로운 가게 마커 추가 완료');
          setLastFetchPosition(position);
        } else {
          console.log('주변 가게 정보 없음');
        }
      } catch (error) {
        console.error('가게 마커 업데이트 중 오류:', error);
        setError('가게 정보 업데이트에 실패했습니다.');
      } finally {
        isLoadingRef.current = false;
        console.log('가게 정보 업데이트 프로세스 완료');
      }
    },
    [servicesRef, handleStoreMarkerClick, nearByStores],
  );

  const onPositionSuccess = useCallback(
    async (position: MapPosition) => {
      console.log('위치 업데이트 콜백 실행', position);

      if (!areServicesInitialized(servicesRef.current)) {
        console.log('서비스가 초기화되지 않음, 위치 업데이트 스킵');
        return;
      }

      const now = Date.now();
      if (now - lastUpdateTimeRef.current < POSITION_UPDATE_INTERVAL) {
        console.log('업데이트 간격이 너무 짧음, 스킵');
        return;
      }

      if (isLoadingRef.current) {
        console.log('이전 업데이트가 진행 중, 스킵');
        return;
      }

      lastUpdateTimeRef.current = now;
      console.log('위치 업데이트 시작');

      try {
        console.log('현재 위치 마커 제거 시작');
        await servicesRef.current.mapService?.removeCurrentPositionMarker();

        console.log('새로운 현재 위치 마커 추가');
        await servicesRef.current.mapService?.addCurrentPositionMaker(
          position,
          userMarkerImage.src,
        );
        setCurrentPosition(position);

        const distanceFromLastFetch = calculateDistance(
          lastFetchPosition,
          position,
        );
        console.log(
          '마지막 데이터 요청 위치와의 거리:',
          distanceFromLastFetch,
          'km',
        );

        if (
          lastFetchPosition.latitude === 0 ||
          distanceFromLastFetch > REFETCH_THRESHOLD_KM
        ) {
          console.log('재요청 임계값 초과, 주변 가게 정보 업데이트 시작');
          await updateNearbyStores(position);
          console.log('주변 가게 정보 업데이트 완료');
        } else {
          console.log('재요청 임계값 이내, 업데이트 스킵');
        }
      } catch (error) {
        console.error('위치 마커 업데이트 중 오류 발생:', error);
        if (error instanceof Error) {
          console.log('위치 권한 관련 오류, 권한 요청 모달 표시');
          openPermissionModal();
        }
      }
    },
    [
      calculateDistance,
      lastFetchPosition,
      updateNearbyStores,
      openPermissionModal,
    ],
  );

  const initializeServices = () => {
    console.log('서비스 초기화 시작');

    const mapService = new MapService({
      mapController: new KakaoMapController(),
    });
    console.log('MapService 초기화 완료');

    const geoService = new GeolocationService({
      geolocationController: new GeolocationController(
        new KalmanLocationFilter(),
        new MovingAverageFilter(3),
      ),
    });
    console.log('GeolocationService 초기화 완료');

    const storeService = new StoreService({
      storeRepository: new StoreAPIReopository(),
    });
    console.log('StoreService 초기화 완료');

    return { mapService, geoService, storeService };
  };

  const loadMap = async (initializedServices: {
    mapService: MapService;
    geoService: GeolocationService;
    storeService: StoreService;
  }) => {
    console.log('지도 로딩 시작');

    if (!mapRef.current) {
      console.error('Map container not found');
      return;
    }

    try {
      console.log('현재 위치 가져오기 시작');
      const result = await initializedServices.geoService.getCurrentPosition();
      if ('errorMessage' in result) {
        console.log('위치 권한 없음, 권한 요청 모달 표시');
        openPermissionModal();
        return;
      }
      console.log('현재 위치:', result);

      setCurrentPosition(result);
      console.log('지도 초기화 시작');
      await initializedServices.mapService.initializeMap(
        mapRef.current,
        result,
      );
      console.log('지도 초기화 완료');

      console.log('현재 위치 마커 추가');
      await initializedServices.mapService.addCurrentPositionMaker(
        result,
        userMarkerImage.src,
      );
      await initializedServices.mapService.setMapCenter(result);

      console.log('주변 가게 마커 추가 시작');
      await initializedServices.mapService.addMarkersWithClustering(
        nearByStores,
        storeMarkerImage.src,
        handleStoreMarkerClick,
      );
      console.log('주변 가게 마커 추가 완료');

      console.log('위치 추적 시작');
      initializedServices.geoService.startWatchingPosition(onPositionSuccess, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } catch (err) {
      console.error('초기화 중 오류 발생:', err);
      setError('서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
          console.log('카카오맵 스크립트 onReady 이벤트 발생');
          window.kakao.maps.load(async () => {
            console.log('카카오맵 API load 콜백 실행');
            if (isInitialized) {
              console.log('이미 초기화된 상태, 초기화 스킵');
              return;
            }
            try {
              console.log('서비스 초기화 시작');
              const initializedServices = initializeServices();
              console.log('서비스 객체 생성 완료', initializedServices);

              if (!areServicesInitialized(initializedServices)) {
                console.error('서비스 초기화 검증 실패');
                throw new Error('서비스 초기화 실패');
              }

              // useRef를 사용하여 서비스 인스턴스 저장
              servicesRef.current = initializedServices;
              setIsMapLoaded(true);
              console.log('지도 로딩 시작 전 상태 설정 완료');

              await loadMap(initializedServices);
            } catch (error) {
              console.error('맵 초기화 중 오류:', error);
              setError(
                '서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.',
              );
            } finally {
              setIsInitialized(true);
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
