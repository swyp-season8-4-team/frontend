'use client';

import { Logo } from '@/app/[lang]/_components/Logo';
import { recipeKorea } from '@/app/fonts';
import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui';

interface HeaderContainer extends WithChildren {
  fontClass: string;
}

export function HeaderContainer({ fontClass, children }: HeaderContainer) {
  return (
    <Header
      title="디저비"
      fontClass={recipeKorea.className}
      logo={<Logo height={20} width={20} />}
    >
      {children}
    </Header>
  );
}
