'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import OAuthLoading from '../../../_components/OAuthLoading';

export default function OAuthCallbackLoadingPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  useEffect(() => {
    // 쿠키가 브라우저에 반영된 후, 최종 목적지로 이동
    window.location.replace(next);
  }, [next]);

  return <OAuthLoading />;
}
