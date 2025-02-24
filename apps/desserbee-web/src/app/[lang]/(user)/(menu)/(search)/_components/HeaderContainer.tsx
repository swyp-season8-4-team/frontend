'use client';

import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui';
import { usePathname } from 'next/navigation';

interface HeaderContainer extends WithChildren {
  fontClass: string;
}

export function HeaderContainer({ fontClass, children }: HeaderContainer) {
  const pathname = usePathname();

  // FIXME: 이 조건이 왜 들어가야하는지 모르겠음. 라우트를 변경하는게 맞음
  const isStoreDetailPage = () => {
    const segments = pathname.split('/');
    return (
      segments.includes('map') && segments.length > segments.indexOf('map') + 1 // 경로에 map 포함한지 확인, /map/[storeId](상세페이지)인지 확인
    );
  };

  if (isStoreDetailPage()) return null;

  return (
    <Header title="디저비" fontClass={fontClass}>
      {children}
    </Header>
  );
}
