import type { WithChildren } from '@repo/ui/index';

export default function StoreListLayout({ children }: WithChildren) {
  return <div className="flex flex-col overflow-auto">{children}</div>;
}
