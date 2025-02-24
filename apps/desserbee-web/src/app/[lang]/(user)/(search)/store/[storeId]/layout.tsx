import type { WithChildren } from '@repo/ui/index';

export default function StoreDetailLayout({ children }: WithChildren) {
  return (
    <div className="absolute top-0 flex flex-col min-h-[100dvh] bg-white w-full z-[60]">
      {children}
    </div>
  );
}
