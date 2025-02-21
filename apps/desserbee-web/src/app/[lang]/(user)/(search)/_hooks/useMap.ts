'use client';

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
import { type MapPosition } from '@repo/entity/src/map';

export const useMap = (handleMakerClick: (storeUuid: string) => void) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapServiceRef = useRef<MapService | null>(null);

  const [mapInitialized, setMapInitialized] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });

  const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

  const initializeServices = () => {
    if (!mapServiceRef.current) {
      mapServiceRef.current = new MapService({
        mapController: new KakaoMapController(),
      });
    }
    return {
      mapService: mapServiceRef.current,
      geoService: new GeolocationService({
        geolocationController: new GeolocationController(
          new KalmanLocationFilter(),
          new MovingAverageFilter(3),
        ),
      }),
      storeService: new StoreService({
        storeRepository: new StoreAPIReopository(),
      }),
    };
  };

  const loadMap = async () => {
    const container = mapRef.current;
    if (!container) return;

    try {
      const { mapService, geoService, storeService } = initializeServices();

      const result = await geoService.getCurrentPosition();
      if ('errorMessage' in result) {
        setErrorMessage(result.errorMessage as string);
        return;
      }
      setCurrentPosition(result);

      await mapService.initializeMap(container, result);
      await mapService.setMapCenter(result);

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

      setMapInitialized(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const startTracking = async () => {
    if (!mapServiceRef.current) return;

    const { geoService } = initializeServices();

    const onSuccess = async (position: MapPosition) => {
      try {
        await mapServiceRef.current?.addCurrentPositionMaker(
          position,
          currentMarkerImage.src,
        );
        setCurrentPosition(position);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };

    await geoService.startWatchingPosition(onSuccess);
  };

  const stopTracking = async () => {
    if (!mapServiceRef.current) return;

    const { geoService } = initializeServices();
    await geoService.stopWatchingPosition();
    await mapServiceRef.current.removeCurrentPositionMarker();
  };

  const moveToCurrentPosition = () => {
    mapServiceRef.current?.setMapCenter(currentPosition);
  };

  return {
    mapRef,
    errorMessage,
    apiUrl: KAKAO_MAP_API_URL,
    loadMap,
    startTracking,
    stopTracking,
    moveToCurrentPosition,
  };
};
