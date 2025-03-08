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
    <div className="fixed inset-0 z-30 flex flex-col max-w-[768px] bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto">{children}</div>
      {saveStoreSheet}
    </div>
  );
}
