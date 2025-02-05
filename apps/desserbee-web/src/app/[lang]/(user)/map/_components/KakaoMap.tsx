'use client';

import { useKakaoMap } from '@/app/[lang]/(user)/_hooks/useKakaoMap';
import type { ReactNode } from 'react';

interface KakoMapProps {
  children: ReactNode;
}
export function KakaoMap({ children }: KakoMapProps) {
  const { mapRef, errorMessage } = useKakaoMap();

  if (errorMessage) {
    return (
      <div className="relative flex justify-center items-center my-[26px] rounded-base w-full h-100vh min-h-[574px]">
        {errorMessage}
      </div>
    );
  }
  return (
    <div
      ref={mapRef}
      className="relative bg-gray-400 my-[26px] rounded-base w-full h-100vh min-h-[574px] overflow-x-hidden"
    >
      {children}
    </div>
  );
}
