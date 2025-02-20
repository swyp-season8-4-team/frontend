'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

import { CATEGORIES, USER_PREFERENCES } from '../../../_consts/tag'; // Map page에서

import storeMarkerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-marker.svg';
import userMarkerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-current-marker.svg';

import { PreferenceTags } from '../PreferenceTags';
import { MapPanel } from '../MapPanel';
import { SideBarContainer } from '../../sidebar/SidebarContainer';
import { BottomSheetContainer } from '../../bottomsheet/BottomSheetContainer';

import { useMap } from '../../../../_hooks/useMap';
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
export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  const [selectedStoreUuid, setSelectedStoreUuid] = useState<string>();
  const [geoErrorMessage, setGeoErrorMessage] = useState<string>();
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

    console.log('서비스 초기화 완료:', {
      mapService,
      geoService,
      storeService,
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

      console.log('맵 로드');
    } catch (err) {
      console.error('맵 초기화 중 오류 발생:', err);
      setGeoErrorMessage('맵을 불러오는 데 실패했습니다.');
    }
  };

  const startTracking = async () => {
    console.log('트래킹');
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

  const stopTracking = async () => {
    if (
      services.mapService &&
      services.geoService &&
      services.storeService &&
      isMapLoaded
    ) {
      await services.geoService.stopWatchingPosition();
      await services.mapService.removeCurrentPositionMarker();
    }
  };

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
    return () => {
      stopTracking();
    };
  }, []);

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
            }
          });
        }}
      />
      <div
        ref={mapRef}
        className="relative bg-gray-400 mb-[9px] md:mb-4 rounded-base w-full h-[calc(100dvh-311.68px)] md:h-[calc(100dvh-450px)] overflow-x-hidden"
      >
        {geoErrorMessage ? (
          geoErrorMessage // 모달
        ) : (
          <>
            <PreferenceTags
              userPreferences={USER_PREFERENCES}
              categories={CATEGORIES}
            />
            <MapPanel {...mapPanelProps} />
          </>
        )}
      </div>
    </div>
  );
}
