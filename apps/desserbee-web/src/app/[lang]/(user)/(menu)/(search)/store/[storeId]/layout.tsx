import type { WithChildren } from '@repo/ui/index';
import type { ReactNode } from 'react';
import type React from 'react';
interface StoreDetailLayoutProps extends WithChildren {
  saveStoreSheet: ReactNode;
}
export default function StoreDetailLayout({
  children,
  saveStoreSheet,
}: StoreDetailLayoutProps) {
  return (
    <div className="h-full top-0 z-30 absolute flex flex-col max-w-[768px] bg-white">
      {children}
      {saveStoreSheet}
    </div>
  );
}
