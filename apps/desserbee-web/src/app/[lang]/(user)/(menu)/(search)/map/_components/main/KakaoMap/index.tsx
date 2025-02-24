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
  const [lastFetchPosition, setLastFetchPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });

  const FETCH_RADIUS_KM = 3;
  const REFETCH_THRESHOLD_KM = 2;
  const POSITION_UPDATE_INTERVAL = 3000;
  const lastUpdateTimeRef = useRef(0);
  const isLoadingRef = useRef(false);

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

  const handleStoreMarkerClick = useCallback(
    (storeUuid: string) => {
      setSelectedStoreUuid(storeUuid);
      handleBottomSheetOpen();
    },
    [handleBottomSheetOpen],
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

  const bottomSheetProps = useMemo(
    () => ({
      storeUuid: selectedStoreUuid as string,
      isBottomSheetOpen,
      handleBottomSheetClose,
    }),
    [selectedStoreUuid, isBottomSheetOpen, handleBottomSheetClose],
  );

  const sideBarProps = useMemo(
    () => ({
      isSideBarOpen,
      handleSideBarClose,
      handleSideBarOpen,
      totalSavedList,
    }),
    [isSideBarOpen, handleSideBarClose, handleSideBarOpen, totalSavedList],
  );

  const handleMoveToCurrentPosition = useCallback(() => {
    if (services.mapService && isMapLoaded) {
      services.mapService.setMapCenter(currentPosition);
    }
  }, [services.mapService, isMapLoaded, currentPosition]);

  const mapPanelProps = useMemo(
    () => ({
      handleSideBarOpen,
      moveToCurrentPosition: handleMoveToCurrentPosition,
    }),
    [handleSideBarOpen, handleMoveToCurrentPosition],
  );

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 3;
  const RETRY_DELAY = 3000;

  const fetchNearbyStores = useCallback(
    async (position: MapPosition) => {
      try {
        if (!services.storeService) return null;

        const nearByStores = await services.storeService.getNearbyStores({
          latitude: position.latitude,
          longitude: position.longitude,
          radius: FETCH_RADIUS_KM,
        });

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
    [services.storeService, retryCount],
  );

  const onPositionSuccess = useCallback(
    async (position: MapPosition) => {
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

        const distanceFromLastFetch = calculateDistance(
          lastFetchPosition,
          position,
        );

        if (
          lastFetchPosition.latitude === 0 ||
          distanceFromLastFetch > REFETCH_THRESHOLD_KM
        ) {
          isLoadingRef.current = true;

          const nearByStores = await fetchNearbyStores(position);
          if (nearByStores) {
            await services.mapService.addMarkersWithClustering(
              nearByStores,
              storeMarkerImage.src,
              handleStoreMarkerClick,
            );
            setLastFetchPosition(position);
          }
        }
      } catch (error) {
        console.error('위치 정보 처리 중 오류 발생:', error);
        if (error instanceof Error) {
          setGeoErrorMessage(error.message);
        }
      } finally {
        isLoadingRef.current = false;
      }
    },
    [
      services,
      lastFetchPosition,
      calculateDistance,
      handleStoreMarkerClick,
      fetchNearbyStores,
    ],
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

      const nearByStores = await fetchNearbyStores(result);
      if (nearByStores) {
        await services.mapService.addMarkersWithClustering(
          nearByStores,
          storeMarkerImage.src,
          handleStoreMarkerClick,
        );
      }
    } catch (err) {
      console.error('초기화 중 오류 발생:', err);
      setError('서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const [error, setError] = useState<string | null>(null);

  const startTracking = () => {
    if (services.mapService && services.geoService && services.storeService) {
      const geoService = services.geoService;
      geoService.startWatchingPosition(onPositionSuccess, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    }
  };

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
  }, [services, isMapLoaded]);

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
        setIsInitializing(true);
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
          setIsInitializing(false);
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
      const startTracking = async () => {
        return () => stopTracking();
      };
      startTracking();
    }
  }, [isMapLoaded, services, lastFetchPosition, stopTracking]);

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
              await initializeMap(initializedServices);

              if (geoErrorMessage) {
                openPermissionModal();
              }

              if (
                isMapLoaded &&
                initializedServices.mapService &&
                initializedServices.geoService &&
                initializedServices.storeService
              ) {
                startTracking();
              }
            } catch (error) {
              console.error('맵 초기화 중 오류:', error);
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
        {isBottomSheetOpen && <BottomSheetContainer {...bottomSheetProps} />}
        {isSideBarOpen && <SideBarContainer {...sideBarProps} />}
      </div>
    </div>
  );
}
