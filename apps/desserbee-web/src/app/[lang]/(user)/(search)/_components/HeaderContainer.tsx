'use client';

import { Header } from '@repo/design-system/components/Header';
import { usePathname } from 'next/navigation';
import { SearchBarContainer } from './SearchBarContainer';

interface HeaderContainer {
  fontClass: string;
}

export function HeaderContainer({ fontClass }: HeaderContainer) {
  const pathname = usePathname();

  const normalizedPath = pathname.split('/', 4)[3];
  const currentPathName = `/map/${normalizedPath}`;
  const isStoreDetail = /^\/map\/\d+$/.test(currentPathName);

  if (isStoreDetail) return null;

  return (
    <Header title="디저비" fontClass={fontClass}>
      <SearchBarContainer />
    </Header>
  );
}
