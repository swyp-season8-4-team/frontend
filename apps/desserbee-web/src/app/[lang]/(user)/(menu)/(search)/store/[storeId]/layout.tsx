import type { WithChildren } from '@repo/ui/index';
import type React from 'react';

interface StoreDetailLayoutProps extends WithChildren {
  detail: React.ReactNode;
  tabs: React.ReactNode;
  params: Promise<{ storeId: string }>;
}

export default async function StoreDetailLayout({
  children,
}: StoreDetailLayoutProps) {
  return (
    <div className="top-0 z-30 absolute flex flex-col bg-white w-full min-h-[100dvh]">
      {children}
    </div>
  );
}
