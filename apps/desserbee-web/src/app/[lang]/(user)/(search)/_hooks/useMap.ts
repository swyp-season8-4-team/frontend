import { useEffect, useRef, useState } from 'react';

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
import { type ExternalMap, type MapPosition } from '@repo/entity/src/map';

export const useMap = (handleMakerClick: (storeId: number) => void) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [mapInitialized, setMapInitialized] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<MapPosition>();
  const [isTracking, setIsTracking] = useState(false);

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
      setCurrentPosition(result);
      updateMapCenter(result);

      await mapService.initializeMap(container, result);

      mapService.addCurrentPositionMaker(result, currentMarkerImage.src);
      const storeMapData = await storeService.getNearbyStores({
        latitude: result.latitude,
        longitude: result.longitude,
        radius: 2,
      });

      mapService.addMarkersWithClustering(
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

  const startTracking = async () => {
    const onSuccess = async (position: MapPosition) => {
      try {
        mapService.addCurrentPositionMaker(position, currentMarkerImage.src);
        setCurrentPosition(position);
        // console.log(currentPosition);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };

    await geoService.startWatchingPosition(onSuccess);
  };

  const stopTracking = async () => {
    await geoService.stopWatchingPosition();
    mapService.removeCurrentPositionMarker();
  };

  const updateMapCenter = async (position: MapPosition) => {
    if (mapInitialized) {
      mapService.setMapCenter(position);
    }
  };

  const handleTrackingToggle = () => {
    setIsTracking((prev) => !prev);

    if (!currentPosition) return;
    updateMapCenter(currentPosition);
  };

  return {
    mapRef,
    errorMessage,
    isTracking,
    apiUrl: KAKAO_MAP_API_URL,
    loadMap,
    startTracking,
    handleTrackingToggle,
    stopTracking,
  };
};
