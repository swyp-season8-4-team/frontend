'use client';

import { useEffect, useRef, useState } from 'react';

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [isMocking, setIsMocking] = useState(false);
  const isWorkerStarted = useRef(false);

  useEffect(() => {
    async function enableApiMocking() {
      // 프로덕션 환경 체크
      const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'prod';

      if (isProd) {
        console.log('MSW is disabled in production');
        setIsMocking(true); // children을 렌더링하기 위해 true로 설정
        return;
      }

      if (typeof window !== 'undefined' && !isWorkerStarted.current) {
        try {
          isWorkerStarted.current = true;
          const { worker } = await import('../mocks/browser');

          await worker.start({
            onUnhandledRequest: 'bypass', // 모든 미처리 요청 무시
          });
          console.log('☄️ Browser mock initialized');
          setIsMocking(true);
        } catch (error) {
          console.error('❌ MSW Worker failed to start:', error);
          setIsMocking(true); // 에러 발생 시에도 children 렌더링
        }
      }
    }

    enableApiMocking();
  }, []);

  if (!isMocking) {
    return null; // Worker 활성화 전에는 컴포넌트를 렌더링하지 않음
  }

  return <>{children}</>; // Worker 활성화 후 컴포넌트 렌더링
}
