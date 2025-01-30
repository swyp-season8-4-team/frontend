import { useEffect, useRef } from "react";

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

const createMap = (map: typeof naver.maps, container: HTMLDivElement) => {
  const center = new map.LatLng(
    DEFAULT_POSITION.latitude,
    DEFAULT_POSITION.longitude
  );

  return new map.Map(container, {
    center,
    zoom: MAP_ZOOM_LEVEL,
    zoomControl: true, // 줌 컨트롤
    disableDoubleTapZoom: true, // 더블탭 줌 허용
    mapTypeControl: true, // 지도 유형 컨트롤
  });
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

const useNaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    const map = createMap(naver.maps, container);
    const position = new naver.maps.LatLng(
      DEFAULT_POSITION.latitude,
      DEFAULT_POSITION.longitude
    );

    createCustomMarker(map, position);
  }, []);

  return {
    mapRef,
  };
};

export default useNaverMap;
