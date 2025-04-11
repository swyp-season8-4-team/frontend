'use client';

import { Logo } from '@/app/[lang]/_components/Logo';
import { recipeKorea } from '@/app/fonts';
import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui';

export function HeaderContainer({ children }: WithChildren) {
  return (
    <div className="w-full max-w-screen-md">
      <Header
        title="디저비"
        fontClass={recipeKorea.className}
        logo={<Logo height={20} width={20} />}
      >
        {children}
      </Header>
    </div>
  );
}
