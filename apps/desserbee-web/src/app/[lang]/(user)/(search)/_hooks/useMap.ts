import { useRef, useState } from 'react';

import markerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-marker.svg';
import currentMarkerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-current-marker.svg';

import GeolocationService from '@repo/usecase/src/geolocationService';
import MapService from '@repo/usecase/src/mapService';
import StoreService from '@repo/usecase/src/storeService';

import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';
import GeolocationController from '@repo/infrastructures/src/controllers/geolocationController';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

import { KalmanLocationFilter } from '@repo/infrastructures/src/filters/locationFilter';
import { MovingAverageFilter } from '@repo/infrastructures/src/filters/movingAverageFilter';
import type { MapPosition } from '@repo/entity/src/map';

export const useMap = (handleMakerClick: (storeId: number) => void) => {
  const mapRef = useRef<HTMLDivElement>(null);
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

  const [errorMessage, setErrorMessage] = useState<string>();

  const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

  const loadMap = async () => {
    const container = mapRef.current;
    if (!container) return;

    try {
      const result = await geoService.getCurrentPosition();

      if ('errorMessage' in result) {
        setErrorMessage(result.errorMessage as string); // geoLocation error
        return;
      }

      await mapService.initializeMap(container, result);

      await mapService.addCurrentPositionMaker(result, currentMarkerImage.src);

      const storeMapData = await storeService.getNearbyStores({
        latitude: result.latitude,
        longitude: result.longitude,
        radius: 2,
      });

      await mapService.addMarkersWithClustering(
        storeMapData,
        markerImage.src,
        handleMakerClick,
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const onSuccess = async (position: MapPosition) => {
    try {
      await mapService.addCurrentPositionMaker(
        position,
        currentMarkerImage.src,
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const updateUserPosition = async () => {
    geoService.startWatchingPosition(onSuccess);
  };

  return {
    mapRef,
    errorMessage,
    apiUrl: KAKAO_MAP_API_URL,
    loadMap,
    updateUserPosition,
  };
};
