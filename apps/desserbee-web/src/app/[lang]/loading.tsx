'use client';

import { MobileScreenProvider } from './_contexts/MobileScreenProvider';
import LoadingUI from './_components/LoadingUI';

export default function Loading() {
  return (
    <MobileScreenProvider>
      <LoadingUI description="페이지 로딩 중..." />
    </MobileScreenProvider>
  );
}
