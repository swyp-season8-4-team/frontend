import { useEffect, useRef } from "react";

const DEFAULT_POSITION = {
  latitude: 37.3595704,
  longitude: 127.105399,
};

const MAP_ZOOM_LEVEL = 16;

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

const useNaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    const map = createMap(naver.maps, container);

    mapInstance.current = map;

    return () => {
      mapInstance.current = null;
    };
  }, []);

  return {
    mapRef,
    map: mapInstance.current,
  };
};

export default useNaverMap;
