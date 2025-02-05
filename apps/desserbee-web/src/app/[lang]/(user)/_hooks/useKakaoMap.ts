import { useEffect, useRef, useState } from 'react';
import markerImage from '../map/_assets/svg/icon-marker.svg'; // 이미지 import
import type { MapPosition } from '@repo/entity/src/map';
import MapService from '@repo/usecase/src/mapService';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';

const generateRandomPositions = (
  center: MapPosition,
  count: number,
): MapPosition[] => {
  const RADIUS = 0.01;
  return Array.from({ length: count }, () => {
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomRadius = Math.random() * RADIUS;
    return {
      latitude: center.latitude + randomRadius * Math.cos(randomAngle),
      longitude: center.longitude + randomRadius * Math.sin(randomAngle),
    };
  });
};

export function useKakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapService = new MapService({
    mapController: new KakaoMapController(),
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
        const positions = generateRandomPositions(result, 100);

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
