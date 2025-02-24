import type { WithChildren } from '@repo/ui/index';
import type { ReactNode } from 'react';

interface StoreDetailLayoutProps extends WithChildren {
  tabs: ReactNode;
}

export default function StoreDetailLayout({
  children,
  tabs,
}: StoreDetailLayoutProps) {
  return (
    <div className="absolute top-0 flex flex-col min-h-[100dvh] bg-white w-full z-[60]">
      {children}
      {tabs}
    </div>
  );
}
