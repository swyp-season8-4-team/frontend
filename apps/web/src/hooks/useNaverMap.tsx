import { useEffect, useRef } from "react";

declare global {
  class MarkerClustering {
    constructor(options: {
      map: naver.maps.Map;
      markers?: naver.maps.Marker[];
      minClusterSize?: number;
      maxZoom?: number;
      gridSize?: number;
      indexGenerator?: number[];
      stylingFunction?: (marker: naver.maps.Marker, count: number) => void;
      disableClickZoom?: boolean;
    });
  }
}

const DEFAULT_POSITION = {
  latitude: 37.3595704,
  longitude: 127.105399,
};

const MAP_ZOOM_LEVEL = 16;

const MARKER_IMG_URL = "/images/svg/honey.svg";

const MARKER_SIZE = {
  width: 30,
  height: 30,
};

const MARKER_ORIGIN = {
  x: 0,
  y: 0,
};

const MARKER_ANCHOR = {
  x: MARKER_SIZE.width / 2, // 가로 중앙
  y: MARKER_SIZE.height,
};

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

const createMap = (
  map: typeof naver.maps,
  container: HTMLDivElement,
  initPosition: { latitude: number; longitude: number }
) => {
  const center = new map.LatLng(initPosition.latitude, initPosition.longitude);

  return new map.Map(container, {
    center,
    zoom: MAP_ZOOM_LEVEL,
    zoomControl: true, // 줌 컨트롤
    disableDoubleTapZoom: true, // 더블탭 줌 허용
    mapTypeControl: true, // 지도 유형 컨트롤
  });
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

const createCustomMarker = (
  map: naver.maps.Map,
  position: naver.maps.LatLng
) => {
  const markerOptions = {
    position,
    map: map,
    icon: {
      url: MARKER_IMG_URL,
      size: new naver.maps.Size(MARKER_SIZE.width, MARKER_SIZE.height),
      scaledSize: new naver.maps.Size(MARKER_SIZE.width, MARKER_SIZE.height),
      origin: new naver.maps.Point(MARKER_ORIGIN.x, MARKER_ORIGIN.y),
      anchor: new naver.maps.Point(MARKER_ANCHOR.x, MARKER_ANCHOR.y),
    },
  };

  return new naver.maps.Marker(markerOptions);
};

const createMarkers = (
  positions: { latitude: number; longitude: number }[],
  map: naver.maps.Map
) => {
  return positions.map((position) =>
    createCustomMarker(
      map,
      new naver.maps.LatLng(position.latitude, position.longitude)
    )
  );
};

const createClusterer = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
  return new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 8,
    map,
    markers,
    disableClickZoom: false,
    gridSize: 120,
    indexGenerator: [10, 100, 200, 500, 1000],
    stylingFunction: (clusterMarker: naver.maps.Marker, count: number) => {
      const element = clusterMarker.getElement() as HTMLElement;
      if (element) {
        let countElement = element.querySelector(
          ".cluster-count"
        ) as HTMLDivElement;
        if (!countElement) {
          countElement = document.createElement("div");
          countElement.className = "cluster-count";
          countElement.style.position = "absolute";
          countElement.style.width = "100%";
          countElement.style.textAlign = "center";
          countElement.style.color = "white";
          countElement.style.fontSize = "12px";
          countElement.style.fontWeight = "bold";
          countElement.style.textShadow = "1px 1px 1px rgba(0,0,0,0.5)";
          countElement.style.lineHeight = "40px";
          element.appendChild(countElement);
        }
        countElement.textContent = count.toString();
      }
    },
  });
};

const useNaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    const initializeMap = async () => {
      const userPosition = await getUserPosition();
      const map = createMap(naver.maps, container, userPosition);
      const positions = await generateRandomPositions(100, userPosition);

      const markers = createMarkers(positions, map);
      createClusterer(map, markers);
    };

    initializeMap();
  }, []);

  return {
    mapRef,
  };
};

export default useNaverMap;
