'use client';

import { useRef, useState, type ReactNode } from 'react';
import Script from 'next/script';
import type { MapPosition } from '@repo/entity/src/map';

import markerImage from '../../_assets/svg/icon-marker.svg'; // 이미지 import

import MapService from '@repo/usecase/src/mapService';
import StoreService from '@repo/usecase/src/storeService';

import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

interface KakoMapProps {
  children: ReactNode;
  handleMakerClick: (storeId: number) => void;
}
export function KakaoMap({ children, handleMakerClick }: KakoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapService = new MapService({
    mapController: new KakaoMapController(),
  });
  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const [errorMessage, setErrorMessage] = useState<string>();

  const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

  return (
    <div>
      <Script
        type="text/javascript"
        async
        src={KAKAO_MAP_API_URL}
        onLoad={() => {
          window.kakao.maps.load(async () => {
            const container = mapRef.current;
            if (!container) return;

            try {
              const result = await mapService.getCurrentPosition();

              if ('errorMessage' in result) {
                setErrorMessage(result.errorMessage as string); // geoLocation error
                return;
              }

              await mapService.initializeMap(container, result);

              const stores = await storeService.getNearbyStores({
                latitude: result.latitude,
                longitude: result.longitude,
                radius: 2,
              });

              const positions: MapPosition[] = stores.map((store) => ({
                latitude: store.latitude,
                longitude: store.longitude,
              }));

              mapService.addMarkersWithClustering(
                positions,
                markerImage.src,
                handleMakerClick,
              );
            } catch (error) {
              if (error instanceof Error) {
                setErrorMessage(error.message);
              }
            }
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
