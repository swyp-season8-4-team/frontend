"use client";

import useNaverMap from "@/hooks/useNaverMap";

export function NaverMap() {
  const { mapRef } = useNaverMap();

  return <div ref={mapRef} className="w-full h-[400px]"></div>;
}
