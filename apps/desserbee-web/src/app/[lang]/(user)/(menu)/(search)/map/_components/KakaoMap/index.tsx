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
  const [services, setServices] = useState<{
    mapService: MapService | null;
    geoService: GeolocationService | null;
    storeService: StoreService | null;
  }>({
    mapService: null,
    geoService: null,
    storeService: null,
  });
  const [nearByStores, setNearByStores] = useState<NearByStoreData[]>();

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
      // shallow: true를 사용하여 페이지 리프레시 없이 URL만 업데이트
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
    if (services.mapService && isMapLoaded) {
      services.mapService.setMapCenter(currentPosition);
    }
  }, [services.mapService, isMapLoaded, currentPosition]);

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
        if (!services.storeService) {
          console.log('🚨 storeService가 초기화되지 않았습니다.', services);
          return null;
        }

        console.log('📍 주변 가게 요청 시작:', {
          latitude: position.latitude,
          longitude: position.longitude,
          radius: FETCH_RADIUS_KM,
          storeService: services.storeService,
        });

        const nearByStores = await services.storeService.getNearbyStores({
          latitude: position.latitude,
          longitude: position.longitude,
          radius: FETCH_RADIUS_KM,
        });

        console.log('✅ 주변 가게 응답 받음:', nearByStores);

        setNearByStores(nearByStores);
        setRetryCount(0);
        setError(null);
        return nearByStores;
      } catch (error) {
        console.error('🚨 가게 정보 요청 실패:', error);
        if (retryCount < MAX_RETRY) {
          console.log(`재시도 ${retryCount + 1}/${MAX_RETRY} 시작...`);
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
    [retryCount, services],
  );

  const updateNearbyStores = useCallback(
    async (position: MapPosition) => {
      if (!areServicesInitialized(services)) return;

      try {
        isLoadingRef.current = true;
        if (nearByStores) {
          await services.mapService?.addMarkersWithClustering(
            nearByStores,
            storeMarkerImage.src,
            handleStoreMarkerClick,
          );
          setLastFetchPosition(position);
        }
      } catch (error) {
        console.error('가게 마커 업데이트 중 오류:', error);
        setError('가게 정보 업데이트에 실패했습니다.');
      } finally {
        isLoadingRef.current = false;
      }
    },
    [services, handleStoreMarkerClick, nearByStores],
  );

  const onPositionSuccess = useCallback(
    async (position: MapPosition) => {
      if (!areServicesInitialized(services)) return;

      const now = Date.now();
      if (
        now - lastUpdateTimeRef.current < POSITION_UPDATE_INTERVAL ||
        isLoadingRef.current
      ) {
        return;
      }
      lastUpdateTimeRef.current = now;

      try {
        await services.mapService?.removeCurrentPositionMarker();
        await services.mapService?.addCurrentPositionMaker(
          position,
          userMarkerImage.src,
        );
        setCurrentPosition(position);

        const distanceFromLastFetch = calculateDistance(
          lastFetchPosition,
          position,
        );
        if (
          lastFetchPosition.latitude === 0 ||
          distanceFromLastFetch > REFETCH_THRESHOLD_KM
        ) {
          await updateNearbyStores(position);
        }
      } catch (error) {
        console.error('위치 마커 업데이트 중 오류 발생:', error);
        if (error instanceof Error) {
          openPermissionModal();
        }
      }
    },
    [
      services,
      calculateDistance,
      lastFetchPosition,
      updateNearbyStores,
      openPermissionModal,
    ],
  );

  const initializeServices = useCallback(() => {
    console.log('서비스 초기화 시작');

    const mapService = new MapService({
      mapController: new KakaoMapController(),
    });
    console.log('mapService 초기화 완료');

    const geoService = new GeolocationService({
      geolocationController: new GeolocationController(
        new KalmanLocationFilter(),
        new MovingAverageFilter(3),
      ),
    });
    console.log('geoService 초기화 완료');

    const storeService = new StoreService({
      storeRepository: new StoreAPIReopository(),
    });
    console.log('storeService 초기화 완료:', storeService);

    return { mapService, geoService, storeService };
  }, []);

  const loadMap = async (initializedServices: {
    mapService: MapService;
    geoService: GeolocationService;
    storeService: StoreService;
  }) => {
    if (!mapRef.current) {
      console.error('Map container not found');
      return;
    }

    try {
      // 먼저 services 상태를 업데이트하고
      setServices(initializedServices);

      const result = await initializedServices.geoService.getCurrentPosition();
      if ('errorMessage' in result) {
        openPermissionModal();
        return;
      }

      setCurrentPosition(result);
      await initializedServices.mapService.initializeMap(
        mapRef.current,
        result,
      );

      // 현재 위치 마커 추가
      await initializedServices.mapService.addCurrentPositionMaker(
        result,
        userMarkerImage.src,
      );
      await initializedServices.mapService.setMapCenter(result);

      // 직접 initializedServices를 사용하여 가게 정보 가져오기
      console.log('가게 정보 요청 시작', initializedServices.storeService);
      const stores = await initializedServices.storeService.getNearbyStores({
        latitude: result.latitude,
        longitude: result.longitude,
        radius: FETCH_RADIUS_KM,
      });

      console.log('가게 정보 응답:', stores);
      if (stores) {
        setNearByStores(stores);
        await initializedServices.mapService.addMarkersWithClustering(
          stores,
          storeMarkerImage.src,
          handleStoreMarkerClick,
        );
        setLastFetchPosition(result);
      }

      initializedServices.geoService.startWatchingPosition(onPositionSuccess, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });

      setIsMapLoaded(true);
    } catch (err) {
      console.error('초기화 중 오류 발생:', err);
      setError('서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    return () => {
      if (services.geoService && services.mapService) {
        services.geoService.stopWatchingPosition();
        services.mapService.removeCurrentPositionMarker();
      }
    };
  }, [services]);

  return (
    <div>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        async
        src={KAKAO_MAP_API_URL}
        onReady={() => {
          window.kakao.maps.load(async () => {
            if (isInitialized) return;
            try {
              console.log('카카오맵 로드 완료, 서비스 초기화 시작');
              const initializedServices = initializeServices();

              if (!initializedServices.storeService) {
                throw new Error('storeService 초기화 실패');
              }

              console.log('서비스 초기화 완료:', initializedServices);
              setIsInitialized(true);
              await loadMap(initializedServices);
            } catch (error) {
              console.error('맵 초기화 중 오류:', error);
              setError(
                '서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.',
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
