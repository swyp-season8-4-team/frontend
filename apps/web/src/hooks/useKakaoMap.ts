import { useEffect, useRef } from "react";
import image from "@/assets/svg/honey.svg"; // 이미지 import

const DEFAULT_POSITION = {
  latitude: 37.555,
  longitude: 126.9025,
};

// 지도 확대 레벨 (동네/거리 수준)
const MAP_LEVEL = 3;

// 마커 이미지의 크기
const MARKER_SIZE = {
  x: 30,
  y: 30,
};

// 마커 정확한 위치에 표시되도록 조정
const MARKER_OFFSET = {
  x: MARKER_SIZE.x / 2,
  y: MARKER_SIZE.y,
};

// geolocation 사용
const getUserPosition = async () => {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        const options = {
          timeout: 3000, // 3초 타임아웃
          maximumAge: 5000, // 5초 이내의 캐시된 위치 사용
          enableHighAccuracy: false, // 높은 정확도 비활성화로 응답 속도 향상
        };

        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      }
    );

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    console.error("위치 정보 가져오기 싫패:", error);
    return DEFAULT_POSITION;
  }
};

// 지도 옵션을 생성
const createMapOptions = (position: {
  latitude: number;
  longitude: number;
}) => ({
  center: new kakao.maps.LatLng(position.latitude, position.longitude),
  level: MAP_LEVEL,
});

// 지도를 생성
const createMap = async (container: HTMLDivElement) => {
  const position = await getUserPosition();
  const options = createMapOptions(position);
  return new kakao.maps.Map(container, options);
};

// 컨트롤 추가
const createControls = (map: kakao.maps.Map) => {
  const mapTypeControl = new kakao.maps.MapTypeControl(); // 지도/스카이뷰 전환 컨트롤
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT); // 오른쪽에 추가

  const zoomControl = new kakao.maps.ZoomControl(); // 줌인 줌아웃 컨트롤
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); // 오른쪽에 추가
};

// 테스트 - 랜덤 위치 생성
const generateRandomPositions = async (
  count: number,
  userPosition: { latitude: number; longitude: number }
) => {
  const center = userPosition;
  const RADIUS = 0.01; // 약 1km 반경
  const positions = [];

  for (let i = 0; i < count; i++) {
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomRadius = Math.random() * RADIUS;
    positions.push({
      latitude: center.latitude + randomRadius * Math.cos(randomAngle),
      longitude: center.longitude + randomRadius * Math.sin(randomAngle),
    });
  }
  return positions;
};

// 커스텀 마커 생성
const createCustomMarker = (
  maps: typeof kakao.maps,
  position: { latitude: number; longitude: number }
) => {
  const imageSize = new maps.Size(MARKER_SIZE.x, MARKER_SIZE.y);
  const imageOption = {
    offset: new kakao.maps.Point(MARKER_OFFSET.x, MARKER_OFFSET.y),
  };

  const markerImage = new maps.MarkerImage(image.src, imageSize, imageOption);

  const markerPosition = new maps.LatLng(position.latitude, position.longitude);

  return new maps.Marker({
    position: markerPosition,
    image: markerImage,
  });
};

const createMarkers = (
  positions: { latitude: number; longitude: number }[],
  map: kakao.maps.Map
) => {
  positions.forEach((position) => {
    const marker = createCustomMarker(window.kakao.maps, {
      latitude: position.latitude,
      longitude: position.longitude,
    });
    marker.setMap(map);
  });
};

export function useKakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    window.kakao.maps.load(async () => {
      const container = mapRef.current; // load 내부에 작성
      if (!container) return;

      const map = await createMap(container);
      const userPosition = await getUserPosition();
      const positions = await generateRandomPositions(100, userPosition);

      createControls(map);
      createMarkers(positions, map);

      mapInstance.current = map;
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
