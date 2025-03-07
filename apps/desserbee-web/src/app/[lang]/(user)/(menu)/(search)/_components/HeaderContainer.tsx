'use client';

import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui';

interface HeaderContainer extends WithChildren {
  fontClass: string;
}

export function HeaderContainer({ fontClass, children }: HeaderContainer) {
  return (
    <Header title="디저비" fontClass={fontClass}>
      {children}
    </Header>
  );
}
