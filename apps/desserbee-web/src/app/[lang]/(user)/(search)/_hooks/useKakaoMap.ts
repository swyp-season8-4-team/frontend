import { useEffect, useRef, useState } from 'react';
import markerImage from '../map/_assets/svg/icon-marker.svg'; // 이미지 import
import type { MapPosition } from '@repo/entity/src/map';
import MapService from '@repo/usecase/src/mapService';
import StoreService from '@repo/usecase/src/storeService';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

export function useKakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapService = new MapService({
    mapController: new KakaoMapController(),
  });
  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const [errorMessage, setErrorMessage] = useState<string>();
  useEffect(() => {
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

        mapService.addMarkersWithClustering(positions, markerImage.src);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    });
  }, []);

  return {
    mapRef,
    errorMessage,
  };
}
