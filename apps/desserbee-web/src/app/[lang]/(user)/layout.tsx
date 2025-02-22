import type { WithChildren } from '@repo/ui/index';

export default async function UserLayout({ children }: WithChildren) {
  return (
    <>
      {children}
    </>
  );
}
