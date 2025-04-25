import { redirect, useRouter } from 'next/navigation';
import { HTTPError } from '@repo/api/src/error';

/**
 * 서버/클라이언트 공통 에러 핸들러
 */

type HandlerOptions = {
  router?: ReturnType<typeof useRouter>; // 클라이언트에서만 필요
};

// 에러 코드별 처리 액션 정의
const errorActions: Record<string, (options?: HandlerOptions) => void> = {
  A016: (options) => {
    navigateTo('/sign-out', options);
  },
  A006: (options) => {
    navigateTo('/sign-out', options);
  },
  A012: (options) => {
    navigateTo('/sign-out', options);
  },
  // 필요 시 다른 에러 코드 추가 가능
};

// 서버/클라이언트 구분해서 이동 처리
function navigateTo(path: string, options?: HandlerOptions) {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    if (!options?.router) {
      throw new Error(
        `[commonErrorHandler] 클라이언트 사이드에서는 router 옵션을 반드시 전달해야 합니다.`,
      );
    }
    options.router.push(path);
  } else {
    redirect(path);
  }
}

export async function commonErrorHandler<T>(
  promise: Promise<T>,
  options?: HandlerOptions,
): Promise<T> {
  try {
    return await promise;
  } catch (e) {
    if (!(e instanceof HTTPError)) {
      console.log(e);
      throw e;
    }

    const action = errorActions[e.data.code];
    if (action) {
      action(options);
    }

    console.error(e.data);
    throw e;
  }
}
