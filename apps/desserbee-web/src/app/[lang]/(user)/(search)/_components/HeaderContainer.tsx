'use client';

import { Header } from '@repo/design-system/components/Header';
import { usePathname } from 'next/navigation';
import { SearchBarContainer } from './SearchBarContainer';

interface HeaderContainer {
  fontClass: string;
}

export function HeaderContainer({ fontClass }: HeaderContainer) {
  const pathname = usePathname();

  const isStoreDetailPage = () => {
    const segments = pathname.split('/');
    return (
      segments.includes('map') && segments.length > segments.indexOf('map') + 1 // 경로에 map 포함한지 확인, /map/[storeId](상세페이지)인지 확인
    );
  };

  if (isStoreDetailPage()) return null;

  return (
    <Header title="디저비" fontClass={fontClass}>
      <SearchBarContainer />
    </Header>
  );
}
