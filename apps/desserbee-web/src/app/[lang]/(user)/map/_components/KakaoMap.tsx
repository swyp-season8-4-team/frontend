"use client";

import { useKakaoMap } from "@/app/[lang]/(user)/map/_hooks/useKakaoMap";
import type { ReactNode } from "react";

interface KakoMapProps {
  children: ReactNode;
}
export function KakaoMap({ children }: KakoMapProps) {
  const { mapRef } = useKakaoMap();

  //TODO: rounded-20px tailwind.config.ts에 등록
  return (
    <div
      ref={mapRef}
      className="w-full h-[574px] my-[26px] rounded-[20px] relative">
      {children}
    </div>
  );
}
