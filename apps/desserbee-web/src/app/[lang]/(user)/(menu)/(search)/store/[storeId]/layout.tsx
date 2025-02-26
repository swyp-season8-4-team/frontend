import type { WithChildren } from '@repo/ui/index';
import type React from 'react';

export default function StoreDetailLayout({ children }: WithChildren) {
  return (
    <div className="top-0 z-30 absolute flex flex-col bg-white w-full min-h-[100dvh]">
      {children}
    </div>
  );
}
