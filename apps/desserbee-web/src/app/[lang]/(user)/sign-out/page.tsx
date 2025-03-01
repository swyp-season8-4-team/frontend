'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import signOutAction from '@/actions/signOutAction';
import { NavigationPathname } from '@repo/entity/src/navigation';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {

    signOutAction().then(() => {
      router.replace(NavigationPathname.SignIn);
    });
  }, [router]);

  return null;
}
