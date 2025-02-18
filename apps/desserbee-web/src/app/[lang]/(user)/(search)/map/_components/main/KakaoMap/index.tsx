'use client';

import type { WithChildren } from '@repo/ui/index';
import Script from 'next/script';
import type { RefObject } from 'react';

interface KakoMapProps extends WithChildren {
  mapRef: RefObject<HTMLDivElement | null>;
  errorMessage: string | undefined;
  apiUrl: string;
  loadMap: () => Promise<void>;
  updateUserPosition: () => Promise<void>;
}
export function KakaoMap({
  mapRef,
  children,
  apiUrl,
  loadMap,
  updateUserPosition,
  errorMessage,
}: KakoMapProps) {
  return (
    <div>
      <Script
        type="text/javascript"
        async
        src={apiUrl}
        onReady={() => {
          window.kakao.maps.load(async () => {
            await loadMap();
            await updateUserPosition();
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
