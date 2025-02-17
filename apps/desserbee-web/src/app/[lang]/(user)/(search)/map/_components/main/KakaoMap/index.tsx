'use client';

import { useRef, useState, type ReactNode } from 'react';
import Script from 'next/script';

import markerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-marker.svg';
import currentMarkerImage from '@/app/[lang]/(user)/(search)/map/_assets/svg/icon-current-marker.svg';

import MapService from '@repo/usecase/src/mapService';
import StoreService from '@repo/usecase/src/storeService';

import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';
import GeolocationController from '@repo/infrastructures/src/controllers/geolocationController';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

import { KalmanLocationFilter } from '@repo/infrastructures/src/filters/locationFilter';
import { MovingAverageFilter } from '@repo/infrastructures/src/filters/movingAverageFilter';

interface KakoMapProps {
  children: ReactNode;
  handleMakerClick: (storeId: number) => void;
}
export function KakaoMap({ children, handleMakerClick }: KakoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapService = new MapService({
    mapController: new KakaoMapController(),
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
      const result = await mapService.getInitialPosition();

      if ('errorMessage' in result) {
        setErrorMessage(result.errorMessage as string); // geoLocation error
        return;
      }

      await mapService.initializeMap(container, result);

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

  const updateUserPosition = async () => {
    try {
      const result = await mapService.getcurrentPosition();
      if ('errorMessage' in result) {
        setErrorMessage(result.errorMessage as string);
        return;
      }
      await mapService.addCurrentPositionMaker(result, currentMarkerImage.src);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div>
      <Script
        type="text/javascript"
        async
        src={KAKAO_MAP_API_URL}
        onReady={() => {
          window.kakao.maps.load(async () => {
            loadMap();
            updateUserPosition();
          });
        }}
      />

      <div
        ref={mapRef}
        className="relative bg-gray-100 my-[26px] rounded-base w-full h-[calc(100dvh-480px)]  overflow-hidden"
      >
        {errorMessage ? errorMessage : children}
      </div>
    </div>
  );
}
