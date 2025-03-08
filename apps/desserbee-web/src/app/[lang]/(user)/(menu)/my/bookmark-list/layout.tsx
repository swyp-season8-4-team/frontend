import type { WithChildren } from '@repo/ui/index';

export default function MyPageBookmarkLayout({ children }: WithChildren) {
  return (
    <div className="bg-page w-full h-full px-base pb-[20%] min-h-[100dvh]">
      {children}
    </div>
  );
}
