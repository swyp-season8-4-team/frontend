// clientErrorActions.ts
'use client';

import { useRouter } from 'next/navigation';

export const clientErrorActions: Record<
  string,
  (router: ReturnType<typeof useRouter>) => void
> = {
  A006: (router) => router.push('/sign-out'),
  A016: (router) => router.push('/sign-out'),
  A012: (router) => router.push('/sign-out'),
};
