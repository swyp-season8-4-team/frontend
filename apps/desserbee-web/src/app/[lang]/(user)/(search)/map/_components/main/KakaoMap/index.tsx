'use client';

import type { WithChildren } from '@repo/ui/index';
import Script from 'next/script';
import { useEffect, type RefObject } from 'react';

interface KakoMapProps extends WithChildren {
  mapRef: RefObject<HTMLDivElement | null>;
  errorMessage: string | undefined;
  apiUrl: string;
  loadMap: () => Promise<void>;
  startTracking: () => Promise<void>;
  stopTracking: () => Promise<void>;
}
export function KakaoMap({
  children,
  mapRef,
  apiUrl,
  errorMessage,
  loadMap,
  startTracking,
  stopTracking,
}: KakoMapProps) {
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return (
    <div>
      <Script
        type="text/javascript"
        async
        src={apiUrl}
        onReady={() => {
          window.kakao.maps.load(async () => {
            await loadMap();
          });
        }}
        onLoad={() => {
          window.kakao.maps.load(async () => {
            await startTracking();
          });
        }}
      />

      <div
        ref={mapRef}
        className="relative bg-gray-100 my-[26px] rounded-base w-full h-[calc(100dvh-480px)]  overflow-hidden"
      >
        {errorMessage ? errorMessage : children}
      </div>
    </div>
  );
}
