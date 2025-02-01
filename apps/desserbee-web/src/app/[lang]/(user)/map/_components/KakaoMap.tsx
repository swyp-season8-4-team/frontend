"use client";

import { useKakaoMap } from "@/hooks/useKakaoMap";
import type { ReactNode } from "react";

interface KakoMapProps {
  children: ReactNode;
}
export function KakaoMap({ children }: KakoMapProps) {
  const { mapRef } = useKakaoMap();

  return (
    <div ref={mapRef} className="w-full h-[574px] rounded-[20px] relative">
      {children}
    </div>
  );
}
