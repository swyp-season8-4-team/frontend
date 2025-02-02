import { useEffect, useRef } from "react";
import markerImage from "@/assets/svg/honey.svg"; // 이미지 import
import type { Position } from "@repo/entity/src/map";
import MapService from "@repo/usecase/src/mapService";
import KakaoMapRepository from "@repo/infrastructures/src/repositories/kakaoMapRepository";

const generateRandomPositions = (
  center: Position,
  count: number
): Position[] => {
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
    mapRepository: new KakaoMapRepository(),
  });

  useEffect(() => {
    window.kakao.maps.load(async () => {
      const container = mapRef.current;
      if (!container) return;

      const map = await mapService.initializeMap(container);

      if (!map) throw new Error("map 로드 안됨");

      const currentPosition = await mapService.getCurrentPosition();
      const positions = generateRandomPositions(currentPosition, 10);
      mapService.addMarkersWithClustering(positions, markerImage.src);
    });
  }, []);

  return {
    mapRef,
  };
}
