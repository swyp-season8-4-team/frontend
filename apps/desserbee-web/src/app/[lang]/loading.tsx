'use client';

import { MobileScreenProvider } from './_contexts/MobileScreenProvider';
import LoadingUI from './_components/LoadingUI';
import { HeaderContainer } from './(user)/_components/HeaderContainer';

export default function Loading() {
  return (
    <MobileScreenProvider>
      <HeaderContainer />
      <LoadingUI description="페이지 로딩 중..." />
    </MobileScreenProvider>
  );
}
