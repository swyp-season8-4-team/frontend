import { useEffect, useRef } from "react";

const createMap = (map: typeof naver.maps, container: HTMLDivElement) => {
  const center = new map.LatLng(37.3595704, 127.105399);

  return new map.Map(container, {
    center,
    zoom: 16,
  });
};

const useNaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    createMap(naver.maps, container);

    return () => {
      mapInstance.current = null;
    };
  }, []);

  return {
    mapRef,
  };
};

export default useNaverMap;
