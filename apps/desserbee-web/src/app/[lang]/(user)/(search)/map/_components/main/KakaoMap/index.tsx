'use client';

import Script from 'next/script';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import storeMarkerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-marker.svg';
import userMarkerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-current-marker.svg';

import { PreferenceTags } from '../PreferenceTags';
import { MapPanel } from '../MapPanel';
import { SideBarContainer } from '../../sidebar/SidebarContainer';
import { BottomSheetContainer } from '../../bottomsheet/BottomSheetContainer';

import { useBottomSheet } from '../../../../_hooks/useBottomSheet';
import { useSideBar } from '../../../../_hooks/useSidebar';

import type { MapPosition } from '@repo/entity/src/map';

import GeolocationService from '@repo/usecase/src/geolocationService';
import GeolocationController from '@repo/infrastructures/src/controllers/geolocationController';
import { KalmanLocationFilter } from '@repo/infrastructures/src/filters/locationFilter';
import { MovingAverageFilter } from '@repo/infrastructures/src/filters/movingAverageFilter';

import MapService from '@repo/usecase/src/mapService';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

import { KAKAO_MAP_API_URL } from '../../../_consts/map';
import type { NearByStoreData, SavedListData } from '@repo/entity/src/store';

import { LocationPermissionModal } from '../../modal/LocationPermissionModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';

interface KakaoMapProps {
  userPreferences: string[];
  preferenceCategories: string[];
  totalSavedList: SavedListData[];
}

export function KakaoMap({
  userPreferences,
  preferenceCategories,
  totalSavedList,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedStoreUuid, setSelectedStoreUuid] = useState<string>();
  const [geoErrorMessage, setGeoErrorMessage] = useState<string>();
  const [, setIsPermissionModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });

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

  const { isBottomSheetOpen, handleBottomSheetOpen, handleBottomSheetClose } =
    useBottomSheet();

  const { isSideBarOpen, handleSideBarOpen, handleSideBarClose } = useSideBar();

  const { push, pop } = useContext(PortalContext);

  const closeModal = useCallback(() => {
    pop('modal');
  }, [pop]);

  const openPermissionModal = useCallback(() => {
    push('modal', {
      component: <LocationPermissionModal onClose={closeModal} />,
    });
  }, [closeModal, push]);

  const bottomSheetProps = {
    storeUuid: selectedStoreUuid as string,
    isBottomSheetOpen,
    handleBottomSheetClose,
  };

  const sideBarProps = {
    isSideBarOpen,
    handleSideBarClose,
    handleSideBarOpen,
    totalSavedList,
  };

  const handleStoreMarkerClick = useCallback(
    (storeUuid: string) => {
      setSelectedStoreUuid(storeUuid);
      handleBottomSheetOpen();
    },
    [handleBottomSheetOpen],
  );

  const initializeServices = () => {
    const mapService = new MapService({
      mapController: new KakaoMapController(),
    });

    const geoService = new GeolocationService({
      geolocationController: new GeolocationController(
        new KalmanLocationFilter(),
        new MovingAverageFilter(3),
      ),
    });

    const storeService = new StoreService({
      storeRepository: new StoreAPIReopository(),
    });

    return { mapService, geoService, storeService };
  };

  const initializeMap = async (services: {
    mapService: MapService;
    geoService: GeolocationService;
    storeService: StoreService;
  }) => {
    try {
      const container = mapRef.current;
      if (!container) {
        console.error('Map container not found');
        return;
      }

      if (
        !services.geoService ||
        !services.mapService ||
        !services.storeService
      ) {
        throw new Error('services are not initialized');
        return;
      }

      const result = await services.geoService.getCurrentPosition();

      if ('errorMessage' in result) {
        setGeoErrorMessage(result.errorMessage);
        setIsPermissionModalOpen(true);
        return;
      }

      setCurrentPosition(result);

      await services.mapService.initializeMap(container, result);
      await services.mapService.setMapCenter(result);
      await services.mapService.addCurrentPositionMaker(
        result,
        userMarkerImage.src,
      );

      // const nearByStores = await services.storeService.getNearbyStores({
      //   latitude: result.latitude,
      //   longitude: result.longitude,
      //   radius: 2,
      // });

      const nearByStores: NearByStoreData[] = [
        {
          storeId: 1,
          storeUuid: 'uuid-1',
          name: '디저트39 강남점',
          address: '서울 강남구 강남대로 396',
          latitude: 37.497175,
          longitude: 127.027926,
        },
        {
          storeId: 2,
          storeUuid: 'uuid-2',
          name: '아티제 강남역점',
          address: '서울 강남구 테헤란로 151',
          latitude: 37.499462,
          longitude: 127.028274,
        },
        {
          storeId: 3,
          storeUuid: 'uuid-3',
          name: '투썸플레이스 강남파이낸스센터점',
          address: '서울 강남구 테헤란로 152',
          latitude: 37.500175,
          longitude: 127.029046,
        },
        {
          storeId: 4,
          storeUuid: 'uuid-4',
          name: '설빙 강남역점',
          address: '서울 강남구 강남대로 358',
          latitude: 37.496533,
          longitude: 127.0268,
        },
        {
          storeId: 5,
          storeUuid: 'uuid-5',
          name: '폴바셋 강남역사거리점',
          address: '서울 강남구 테헤란로 129',
          latitude: 37.498325,
          longitude: 127.027892,
        },
        {
          storeId: 6,
          storeUuid: 'uuid-6',
          name: '배스킨라빈스 강남우성점',
          address: '서울 강남구 테헤란로 156',
          latitude: 37.500929,
          longitude: 127.028979,
        },
      ];

      if (!nearByStores) {
        console.log('가게 없음!');
        setError(
          '가게 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
        );
        return;
      }

      await services.mapService.addMarkersWithClustering(
        nearByStores,
        storeMarkerImage.src,
        handleStoreMarkerClick,
      );
    } catch (err) {
      console.error('초기화 중 오류 발생:', err);
      setError('서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const [lastFetchPosition, setLastFetchPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });
  const FETCH_RADIUS_KM = 3; // 3km 반경
  const REFETCH_THRESHOLD_KM = 2; // 마지막 위치에서 2km 이상 멀어지면 새로 불러옴

  // 두 지점 간의 거리를 계산하는 함수 (Haversine formula)
  const calculateDistance = (pos1: MapPosition, pos2: MapPosition): number => {
    const R = 6371; // 지구의 반지름 (km)
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
  };

  const POSITION_UPDATE_INTERVAL = 3000; // 3초
  const lastUpdateTimeRef = useRef(0);
  const isLoadingRef = useRef(false);

  const [error, setError] = useState<string | null>(null);

  const startTracking = useCallback(() => {
    if (services.mapService && services.geoService && services.storeService) {
      const onSuccess = async (position: MapPosition) => {
        if (
          !services.mapService ||
          !services.geoService ||
          !services.storeService
        ) {
          return;
        }

        const now = Date.now();
        if (
          now - lastUpdateTimeRef.current < POSITION_UPDATE_INTERVAL ||
          isLoadingRef.current
        ) {
          return;
        }
        lastUpdateTimeRef.current = now;

        try {
          await services.mapService.addCurrentPositionMaker(
            position,
            userMarkerImage.src,
          );
          setCurrentPosition(position);
          setError(null); // 성공 시 에러 초기화

          const distanceFromLastFetch = calculateDistance(
            lastFetchPosition,
            position,
          );

          if (
            lastFetchPosition.latitude === 0 ||
            distanceFromLastFetch > REFETCH_THRESHOLD_KM
          ) {
            services.mapService.clearAllMarkers();

            isLoadingRef.current = true;
            try {
              const nearByStores = await services.storeService.getNearbyStores({
                latitude: position.latitude,
                longitude: position.longitude,
                radius: FETCH_RADIUS_KM,
              });

              await services.mapService.addMarkersWithClustering(
                nearByStores,
                storeMarkerImage.src,
                handleStoreMarkerClick,
              );

              setLastFetchPosition(position);
              setError(null);
            } catch (error) {
              console.error('가게 정보를 불러오는데 실패했습니다:', error);
              setError(
                '가게 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
              );
            } finally {
              isLoadingRef.current = false;
            }
          }
        } catch (error) {
          console.error('위치 정보 처리 중 오류 발생:', error);
          if (error instanceof Error) {
            setGeoErrorMessage(error.message);
          }
        }
      };

      services.geoService.startWatchingPosition(onSuccess, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    }
  }, [handleStoreMarkerClick, lastFetchPosition, services]);

  const stopTracking = useCallback(async () => {
    if (
      services.mapService &&
      services.geoService &&
      services.storeService &&
      isMapLoaded
    ) {
      await services.geoService.stopWatchingPosition();
      await services.mapService.removeCurrentPositionMarker();
    }
  }, [
    isMapLoaded,
    services.geoService,
    services.mapService,
    services.storeService,
  ]);

  const moveToCurrentPosition = () => {
    if (
      services.mapService &&
      services.geoService &&
      services.storeService &&
      isMapLoaded
    ) {
      services.mapService.setMapCenter(currentPosition);
    }
  };

  const mapPanelProps = {
    handleSideBarOpen,
    moveToCurrentPosition,
  };

  useEffect(() => {
    if (geoErrorMessage) {
      openPermissionModal();
    }
  }, [geoErrorMessage, openPermissionModal]);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (
      !isInitialized &&
      !isInitializing &&
      isMapLoaded &&
      services.mapService &&
      services.geoService &&
      services.storeService
    ) {
      const initialize = async () => {
        setIsInitializing(true); // 초기화 시작
        try {
          if (
            !services.geoService ||
            !services.mapService ||
            !services.storeService
          ) {
            throw new Error('services are not initialized');
          }

          const result = await services.geoService.getCurrentPosition();

          if ('errorMessage' in result) {
            setGeoErrorMessage(result.errorMessage);
            setIsPermissionModalOpen(true);
            return;
          }

          await services.mapService.initializeMap(mapRef.current!, result);
          await services.mapService.setMapCenter(result);
          await services.mapService.addCurrentPositionMaker(
            result,
            userMarkerImage.src,
          );

          setIsInitialized(true);
        } catch (err) {
          console.error('초기화 중 오류 발생:', err);
          setError('서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
          setIsInitializing(false); // 초기화 완료 또는 실패
        }
      };

      initialize();
    }
  }, [isMapLoaded, services, isInitialized, isInitializing]);

  useEffect(() => {
    if (
      isMapLoaded &&
      services.mapService &&
      services.geoService &&
      services.storeService
    ) {
      // startTracking();
      return () => {
        stopTracking();
      };
    }
  }, [isMapLoaded, services, stopTracking]);

  return (
    <div>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        async
        src={KAKAO_MAP_API_URL}
        onReady={() => {
          console.log('Kakao script ready');
          window.kakao.maps.load(async () => {
            console.log('Kakao maps loaded');
            if (isInitialized) return;

            try {
              const initializedServices = initializeServices();
              setServices(initializedServices);
              setIsMapLoaded(true);
              await initializeMap(initializedServices); // 여기서 500 에러 발생
              // 에러가 발생해도 isInitialized가 true로 설정되지 않음
            } catch (error) {
              console.error('맵 초기화 중 오류:', error);
            } finally {
              setIsInitialized(true); // 에러가 나도 초기화 완료로 처리
            }
          });
        }}
      />
      <div
        ref={mapRef}
        // className="relative bg-[#E8E8E8] mb-[9px] md:mb-4 rounded-base w-full h-[calc(100dvh-311.68px)] md:h-[calc(100dvh-450px)] overflow-x-hidden"
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
        {isBottomSheetOpen && <BottomSheetContainer {...bottomSheetProps} />}
        {isSideBarOpen && <SideBarContainer {...sideBarProps} />}
      </div>
    </div>
  );
}
