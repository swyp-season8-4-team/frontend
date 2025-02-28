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
import React from 'react';

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
  type PreferenceData,
} from '@repo/entity/src/store';

import { LocationPermissionModal } from '../../_modals/LocationPermissionModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { GeolocationPermissionError } from '@repo/usecase/src/geolocationService';
import { ReFetchStoreBtn } from '../ReFetchStoreBtn';
import { calculateDistance } from '../../_utils/distance';
import { useTag } from '../../../_hooks/useTag';

interface KakaoMapProps {
  preferenceCategories: PreferenceData[];
}

// 서비스가 모두 초기화되었는지 확인하는 헬퍼 함수
const areServicesInitialized = (services: {
  mapService: MapService | null;
  geoService: GeolocationService | null;
  storeService: StoreService | null;
}) => {
  return services.mapService && services.geoService && services.storeService;
};

export function KakaoMap({ preferenceCategories }: KakaoMapProps) {
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

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });
  const [, setLastFetchPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [nearByStores, setNearByStores] = useState<NearByStoreData[]>([]);
  const [mapCenter, setMapCenter] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });

  const [isFetchRequired, setIsFetchRequired] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // const FETCH_RADIUS_M = 4000; // 최대 거리 고정
  const isLoadingRef = useRef(false);

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 3;
  const RETRY_DELAY = 3000;

  const { push, pop } = useContext(PortalContext);

  const {
    selectedCategories,
    isMyPreferSelected,
    updateSelectedTag,
    handleMyPreferenceTagClick,
    selectedPreferenceTags,
  } = useTag();

  const closeModal = useCallback(() => {
    pop('modal');
  }, [pop]);

  const openPermissionModal = useCallback(() => {
    push('modal', {
      component: <LocationPermissionModal onClose={closeModal} />,
    });
  }, [closeModal, push]);

  // 각 마커 클릭 - 바텀시트 열리고, 클릭한 마커 storeId 업데이트
  const handleStoreMarkerClick = useCallback(
    (storeId: string) => {
      router.replace(`?storeId=${storeId}&bottomsheet=true`, {
        scroll: false,
      });
    },
    [router],
  );

  // 제일 먼저 서비스 초기화
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

  const calculateFetchRadius = useCallback(() => {
    if (!servicesRef.current.mapService) {
      return 4000; // 기본값
    }

    const bounds = servicesRef.current.mapService.getMapBound();
    const center = servicesRef.current.mapService.getMapCenter();

    // 각 경계 지점까지의 거리 계산
    const distances = [
      calculateDistance(center, bounds.ne),
      calculateDistance(center, bounds.sw),
      calculateDistance(center, {
        latitude: bounds.ne.latitude,
        longitude: bounds.sw.longitude,
      }), // nw
      calculateDistance(center, {
        latitude: bounds.sw.latitude,
        longitude: bounds.ne.longitude,
      }), // se
    ];

    // 최대 거리 선택
    const maxDistance = Math.max(...distances);

    console.log(
      'calculateFetchRadius: 계산된 최대 반지름 📏:',
      maxDistance,
      'm',
    );
    return maxDistance * 1000;
  }, []);

  const fetchNearbyStores = useCallback(
    async (
      position: MapPosition,
      preferenceTagIds?: number[],
      searchKeyword?: string,
    ) => {
      try {
        if (!servicesRef.current.storeService) {
          console.log(
            'fetchNearbyStores: storeService 서비스가 초기화되지 않음, 주변 가게 불러오기 중지 🛑',
          );
          return null;
        }

        const fetchRadius = calculateFetchRadius();

        const nearByStores =
          await servicesRef.current.storeService!.getNearbyStores({
            latitude: position.latitude,
            longitude: position.longitude,
            radius: fetchRadius,
            preferenceTagIds,
            searchKeyword,
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
          setTimeout(
            () => fetchNearbyStores(position, preferenceTagIds, searchKeyword),
            RETRY_DELAY,
          );
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
    [retryCount, calculateFetchRadius],
  );

  const updateLastFetchPosition = useCallback((position: MapPosition) => {
    console.log('updateLastFetchPosition: 마지막 fetch 위치 저장 ✅');
    setLastFetchPosition(position);
  }, []);

  // 지도 중심, 반경내 상점들 받아서 마커 및 클러스터 마커 추가
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

        console.log('updateCurrentMarker: 이전 마커 모두두 제거 시작 🗑️');
        await servicesRef.current.mapService?.clearAllMarkers();

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
          setError('주변 가게가 없습니다');
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

  const [hasUpdatedPosition, setHasUpdatedPosition] = useState(false);

  const updateCurrentMarker = useCallback(
    async (position: MapPosition) => {
      if (hasUpdatedPosition) {
        console.log('updateCurrentMarker: 이미 위치 업데이트 완료, 스킵 🛑');
        return;
      }

      try {
        if (!areServicesInitialized(servicesRef.current)) {
          console.log(
            'updateCurrentMarker: 서비스들이 초기화되지 않음, 위치 업데이트 중지 🛑',
          );
          return;
        }

        console.log(
          'updateCurrentMarker: 트래킹 시작, 위치 업데이트 콜백 실행',
          position,
        );

        console.log('updateCurrentMarker: 현재 위치 마커 제거 시작 🗑️');
        await servicesRef.current.mapService?.removeCurrentPositionMarker();

        console.log('updateCurrentMarker: 새로운 현재 위치 마커 추가 📍');
        await servicesRef.current.mapService?.addCurrentPositionMaker(
          position,
          userMarkerImage.src,
        );
        setCurrentPosition(position);
        console.log('updateCurrentMarker: 새로운 현재 위치 저장 🧍‍♂️');

        setHasUpdatedPosition(true); // 위치 업데이트 완료 상태 설정
      } catch (error) {
        console.error(
          'updateCurrentMarker: 위치 마커 업데이트 중 오류 발생 ⚠️:',
          error,
        );
        if (
          error instanceof GeolocationPermissionError &&
          error.message === 'PERMISSION_DENIED'
        ) {
          console.log(
            'updateCurrentMarker: 위치 권한 거부됨, 권한 요청 모달 표시 🪧',
          );
          openPermissionModal();
        } else {
          console.error('updateCurrentMarker: 위치 권한 외 오류 발생', error);
        }
        return;
      }
    },
    [hasUpdatedPosition, openPermissionModal],
  );

  const handleInitialGeoPositonFetch = async (
    initializedServices: {
      geoService: GeolocationService;
    },
    openPermissionModal: () => void,
  ) => {
    const permissionStatus = await navigator.permissions.query({
      name: 'geolocation',
    });
    console.log('handleInitialGeoPositonFetch: 위치 권한 확인');

    if (permissionStatus.state === 'denied') {
      console.log('handleInitialGeoPositonFetch: 위치 권한 거부됨');
      openPermissionModal();
      return null;
    }

    console.log('handleInitialGeoPositonFetch: 현재 위치 정보 요청 시작 🏃');
    const result = await initializedServices.geoService.getCurrentPosition();

    if ('errorMessage' in result) {
      console.log('handleInitialGeoPositonFetch: 오류 발생 ⚠️:', {
        message: result.errorMessage,
        type: result.errorType,
      });
      console.log(
        'handleInitialGeoPositonFetch: 현재 위치 권한 상태 다시 확인:',
        {
          state: permissionStatus.state,
          errorType: result.errorType,
        },
      );

      if (result.errorType === 'POSITION_UNAVAILABLE') {
        console.log('handleInitialGeoPositonFetch: GPS 사용 불가');
        setError('GPS를 활성화하고 다시 시도해주세요.');
      } else if (result.errorType === 'TIMEOUT') {
        console.log('handleInitialGeoPositonFetch: 위치 정보 요청 시간 초과');
        setError('위치 정보를 가져오는데 시간이 너무 오래 걸립니다.');
      } else {
        setError('위치 정보를 가져오는데 실패했습니다.');
      }
      return null;
    }

    console.log('handleInitialGeoPositonFetch: 현재 위치 정보 획득 성공 🚩:', {
      latitude: result.latitude,
      longitude: result.longitude,
    });

    setCurrentPosition(result);
    console.log('handleInitialGeoPositonFetch: 현재 위치 저장 🚩');

    return result;
  };

  const handleMapCenterChange = useCallback(() => {
    if (servicesRef.current.mapService) {
      const center = servicesRef.current.mapService.getMapCenter();
      setMapCenter(center);

      // 거리 기반으로 fetch 필요성 판단
      // determineFetch(lastFetchPosition, center);
    }
  }, []);

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
      // 첫 위치는 현재 위치
      const result = await handleInitialGeoPositonFetch(
        initializedServices,
        openPermissionModal,
      );

      if (!result) {
        console.error(
          '현재 위치 로딩에 문제가 생겼습니다.⚠️ 지도 로드 중지 🛑',
        );
        return;
      }

      console.log('loadMap: 지도 초기화 시작');
      await initializedServices.mapService.initializeMap(
        mapRef.current,
        result,
      );

      console.log('loadMap: 지도 중심 추적 시작');
      initializedServices.mapService.addCenterChangedListener(
        handleMapCenterChange,
      );

      console.log('loadMap: 지도 초기화 완료 🗺️');

      console.log('loadMap: 현재 위치 마커 추가 시작');
      await initializedServices.mapService.addCurrentPositionMaker(
        result,
        userMarkerImage.src,
      );
      console.log('loadMap: 현재 위치 마커 추가 완료 📍');

      initializedServices.geoService.startWatchingPosition(
        updateCurrentMarker,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
      console.log('loadMap: 실시간 위치 추적 시작');

      // 첫 로드 시에만 지도 중심 위치 변경
      if (isFirstLoad) {
        await initializedServices.mapService.setMapCenter(result);
        console.log('loadMap: 불러온 위치로 지도 중심 위치 변경');
        setIsFirstLoad(false); // 첫 로드 이후로는 실행되지 않도록 설정
      }

      console.log('loadMap: 주변 가게 마커 추가 시작');
      await initializedServices.mapService.addMarkersWithClustering(
        nearByStores,
        storeMarkerImage.src,
        handleStoreMarkerClick,
      );
      console.log('loadMap: 주변 가게 마커 추가 완료 📍');
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

  // 현재 실시간 유저 위치로 이동
  const handleMoveToCurrentPosition = useCallback(() => {
    if (servicesRef.current.mapService && isMapLoaded) {
      servicesRef.current.mapService.setMapCenter(currentPosition);
    }
  }, [isMapLoaded, currentPosition]);

  // 버튼에 연동
  const mapPanelProps = useMemo(
    () => ({
      moveToCurrentPosition: handleMoveToCurrentPosition,
    }),
    [handleMoveToCurrentPosition],
  );

  useEffect(() => {
    return () => {
      if (
        servicesRef.current.geoService &&
        servicesRef.current.mapService &&
        isInitialized
      ) {
        servicesRef.current.geoService.stopWatchingPosition();
        servicesRef.current.mapService.removeCurrentPositionMarker();
      }
    };
  }, [servicesRef, isInitialized]);

  const handleRefetchBtnClick = () => {
    setIsFetchRequired(true);
  };

  const mapCenterRef = useRef(mapCenter);

  useEffect(() => {
    mapCenterRef.current = mapCenter;
  }, [mapCenter]);

  const previousSelectedTagsRef = useRef<number[]>([]);

  useEffect(() => {
    if (
      JSON.stringify(previousSelectedTagsRef.current) !==
      JSON.stringify(selectedPreferenceTags)
    ) {
      const fetchAndUpdate = async () => {
        const stores = await fetchNearbyStores(
          mapCenterRef.current,
          selectedPreferenceTags,
        );
        if (stores) {
          await updateNewClusterMarkers(mapCenterRef.current, stores);
          setIsFetchRequired(false);
        }
      };
      fetchAndUpdate();
      previousSelectedTagsRef.current = selectedPreferenceTags;
    }
  }, [selectedPreferenceTags, fetchNearbyStores, updateNewClusterMarkers]);

  useEffect(() => {
    if (
      JSON.stringify(previousSelectedTagsRef.current) !==
      JSON.stringify(selectedPreferenceTags)
    ) {
      const fetchAndUpdate = async () => {
        const stores = await fetchNearbyStores(
          mapCenterRef.current,
          selectedPreferenceTags,
        );
        if (stores) {
          await updateNewClusterMarkers(mapCenterRef.current, stores);
          setIsFetchRequired(false);
        }
      };
      fetchAndUpdate();
      previousSelectedTagsRef.current = selectedPreferenceTags;
    }
  }, [selectedPreferenceTags, fetchNearbyStores, updateNewClusterMarkers]);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      const stores = await fetchNearbyStores(mapCenterRef.current);
      if (stores) {
        await updateNewClusterMarkers(mapCenterRef.current, stores);
        setIsFetchRequired(false);
      }
    };
    fetchAndUpdate();
  }, [isFetchRequired, fetchNearbyStores, updateNewClusterMarkers]);

  const preferenceTagsProps = useMemo(
    () => ({
      categories: preferenceCategories,
      isMyPreferSelected,
      handleMyPreferenceTagClick,
      updateSelectedTag,
      selectedCategories,
    }),
    [
      preferenceCategories,
      handleMyPreferenceTagClick,
      isMyPreferSelected,
      updateSelectedTag,
      selectedCategories,
    ],
  );

  return (
    <div>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        // strategy="lazyOnload"
        async
        src={KAKAO_MAP_API_URL}
        onLoad={() => setIsScriptLoaded(true)}
        onReady={() => {
          if (!isScriptLoaded) {
            console.log('(0) 카카오맵 스크립트 최초 로드');
            window.kakao.maps.load(async () => {
              console.log(
                '-----------------(1) services 체크 시작-------------------',
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
                console.log(
                  '-----------------(2) load map 시작-------------------',
                );
                await loadMap(initializedServices);
                console.log(
                  '-----------------load map 완료-------------------',
                );
              } catch (error) {
                console.error('서비스 초기화 및 지도 로드 중 오류:', error);
                setError(
                  '지도 로드에 실패했습니다. 잠시 후 다시 시도해주세요.',
                );
              } finally {
                setIsInitialized(true);
                console.log(
                  '-----------------카카오맵 스크립트 onReady 이벤트 종료-------------------',
                );
              }
            });
            setIsScriptLoaded(true);
          }
        }}
      />
      <div
        ref={mapRef}
        className="relative bg-[#E8E8E8] mb-[9px] rounded-base w-full h-[calc(100dvh-295px)] overflow-x-hidden"
      >
        {error && (
          <div className="top-1/3  left-1/2 z-20 absolute bg-red-100 px-4 py-2 border border-red-400 rounded text-red-700 -translate-x-1/2 transform">
            {error}
          </div>
        )}
        <PreferenceTags {...preferenceTagsProps} />
        <MapPanel {...mapPanelProps} />
        <ReFetchStoreBtn refetchStore={handleRefetchBtnClick} />
      </div>
    </div>
  );
}

export default React.memo(KakaoMap);
