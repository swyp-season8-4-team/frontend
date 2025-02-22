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
import type { SavedListData } from '@repo/entity/src/store';

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
    totalSavedList,
  };

  const handleStoreMarkerClick = (storeUuid: string) => {
    setSelectedStoreUuid(storeUuid);
    handleBottomSheetOpen();
  };

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

      const result = await services.geoService.getCurrentPosition();
      if ('errorMessage' in result) {
        setGeoErrorMessage(result.errorMessage as string);
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

      const nearByStores = await services.storeService.getNearbyStores({
        latitude: result.latitude,
        longitude: result.longitude,
        radius: 2,
      });

      await services.mapService.addMarkersWithClustering(
        nearByStores,
        storeMarkerImage.src,
        handleStoreMarkerClick,
      );
    } catch (err) {
      console.error('맵 초기화 중 오류 발생:', err);
      setGeoErrorMessage('맵을 불러오는 데 실패했습니다.');
      setIsPermissionModalOpen(true);
    }
  };

  const startTracking = async () => {
    if (services.mapService && services.geoService && services.storeService) {
      const onSuccess = async (position: MapPosition) => {
        if (
          !services.mapService ||
          !services.geoService ||
          !services.storeService
        ) {
          console.error('필요한 서비스가 초기화되지 않았습니다.');
          return;
        }

        try {
          await services?.mapService.addCurrentPositionMaker(
            position,
            userMarkerImage.src,
          );
          setCurrentPosition(position);
        } catch (error) {
          if (error instanceof Error) {
            setGeoErrorMessage(error.message);
          }
        }
      };
      await services.geoService.startWatchingPosition(onSuccess);
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

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return (
    <div>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        async
        src={KAKAO_MAP_API_URL}
        onReady={() => {
          window.kakao.maps.load(async () => {
            try {
              const initializedServices = initializeServices();
              setServices(initializedServices);

              // 상태 업데이트를 기다리기 위한 짧은 지연
              await new Promise((resolve) => setTimeout(resolve, 100));

              await initializeMap(initializedServices);
              await startTracking();
              setIsMapLoaded(true);
            } catch (error) {
              console.error('맵 초기화 중 오류 발생:', error);
              setGeoErrorMessage('맵을 불러오는 데 실패했습니다.');
              setIsPermissionModalOpen(true);
            }
          });
        }}
      />
      <div
        ref={mapRef}
        // className="relative bg-[#E8E8E8] mb-[9px] md:mb-4 rounded-base w-full h-[calc(100dvh-311.68px)] md:h-[calc(100dvh-450px)] overflow-x-hidden"
        className="relative bg-[#E8E8E8] mb-[9px] rounded-base w-full h-[calc(100dvh-295px)]  overflow-x-hidden"
      >
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
