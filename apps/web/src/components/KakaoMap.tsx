"use client";

import { useKakaoMap } from "@/hooks/useKakaoMap";

export function KakaoMap() {
  const { mapRef } = useKakaoMap();
  return (
    <div ref={mapRef} className="w-full h-[500px] border border-red-500"></div>
  );
}
