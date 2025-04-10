import type { WithChildren } from '@repo/ui/index';

export default function MyPageBookmarkLayout({ children }: WithChildren) {
  return (
    <div className="bg-page w-full h-full pb-[20%] min-h-[100dvh] fixed max-w-[768px] z-[100] overflow-y-auto">
      {children}
    </div>
  );
}
