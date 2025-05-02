'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import OAuthLoading from '../_components/OAuthLoading';

export default function OAuthCallbackLoadingPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  useEffect(() => {
    // 쿠키가 브라우저에 반영될 때까지 약간의 대기(예: 500ms)
    const timer = setTimeout(() => {
      window.location.replace(next);
    }, 500);

    return () => clearTimeout(timer);
  }, [next]);

  return <OAuthLoading />;
}
