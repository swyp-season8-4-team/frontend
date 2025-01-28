import { useEffect, useRef } from "react";
import beeImage from "@/assets/img/map-marker-bee.png"; // 이미지 import

// 유저의 현재 위치 받아오는 걸로 변경 필요
const INIT_POSITION = {
  latitude: 37.555,
  longitude: 126.9025,
};

export function useKakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);

  const createControls = (map: kakao.maps.Map) => {
    const mapTypeControl = new kakao.maps.MapTypeControl(); // 지도/스카이뷰 전환 컨트롤
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT); // 오른쪽에 추가

    const zoomControl = new kakao.maps.ZoomControl(); // 줌인 줌아웃 컨트롤
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); // 오른쪽에 추가
  };

  const createCustomMarker = (
    maps: typeof kakao.maps,
    position: { latitude: number; longitude: number }
  ) => {
    const imageSize = new maps.Size(30, 30); // 마커 이미지의 크기
    const markerImage = new maps.MarkerImage(beeImage.src, imageSize);
    const markerPosition = new maps.LatLng(
      position.latitude,
      position.longitude
    );

    return new maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
  };

  // 테스트 - 랜덤 위치 생성
  const generateRandomPositions = (count: number) => {
    const MARKER_CONFIG = {
      LOCATION_BOUNDS: {
        // 망원동 일대
        MIN_LAT: 37.55,
        MAX_LAT: 37.56,
        MIN_LNG: 126.895,
        MAX_LNG: 126.91,
      },
    } as const;

    const { MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG } =
      MARKER_CONFIG.LOCATION_BOUNDS;
    const positions = [];

    for (let i = 0; i < count; i++) {
      positions.push({
        latitude: MIN_LAT + Math.random() * (MAX_LAT - MIN_LAT),
        longitude: MIN_LNG + Math.random() * (MAX_LNG - MIN_LNG),
      });
    }
    return positions;
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      const options = {
        center: new kakao.maps.LatLng(
          INIT_POSITION.latitude,
          INIT_POSITION.longitude
        ), // 지도 중심 좌표
        level: 3, // 지도 확대 축소 레벨
      };

      const map = new kakao.maps.Map(container, options); // 지도 생성
      mapInstance.current = map;

      createControls(map);

      // 마커 생성 및 지도에 표시
      const positions = generateRandomPositions(10); // 추후 저장된 가게들의 좌표 받아오는 것으로 변경

      positions.forEach((position) => {
        const marker = createCustomMarker(window.kakao.maps, {
          latitude: position.latitude,
          longitude: position.longitude,
        });
        marker.setMap(map);
      });
    });

    return () => {
      mapInstance.current = null;
    };
  }, []);

  return {
    mapRef,
    map: mapInstance.current,
  };
}
