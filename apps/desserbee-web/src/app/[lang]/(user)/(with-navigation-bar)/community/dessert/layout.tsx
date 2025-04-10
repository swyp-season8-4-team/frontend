'use client';

import type { WithChildren } from '@repo/ui';
import { DessertHeader } from './_components/DessertHeader';
import { usePathname } from 'next/navigation';

export default function CommunityDessertLayout({ children }: WithChildren) {
  const pathname = usePathname();

  let title = '';
  if (pathname.endsWith('/dessert/mate')) {
    title = '디저트 메이트';
  } else if (pathname.endsWith('/dessert/review')) {
    title = '디저트 리뷰';
  }

  return (
    <>
      <DessertHeader title={title} />
      {children}
    </>
  );
}
