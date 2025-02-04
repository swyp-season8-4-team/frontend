"use client";

import { useKakaoMap } from "@/app/[lang]/(user)/map/_hooks/useKakaoMap";
import type { ReactNode } from "react";

interface KakoMapProps {
  children: ReactNode;
}
export function KakaoMap({ children }: KakoMapProps) {
  // const { mapRef, errorMessage } = useKakaoMap();

  // //TODO: rounded-20px tailwind.config.ts에 등록
  // if (errorMessage) {
  //   return (
  //     <div className="w-full h-[574px] my-[26px] rounded-[20px] relative flex justify-center items-center">
  //       {errorMessage}
  //     </div>
  //   );
  // }
  return (
    <div
      // ref={mapRef}
      className="w-full h-[574px] my-[26px] rounded-[20px] relative bg-gray-100">
      {children}
    </div>
  );
}
