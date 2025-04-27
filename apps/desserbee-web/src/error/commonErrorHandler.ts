import { HTTPError } from '@repo/api/src/error';
import { clientErrorActions } from './clientErrorActions';
import { serverErrorActions } from './serverErrorActions';
import type { useRouter } from 'next/navigation';

type HandlerOptions = {
  router?: ReturnType<typeof useRouter>; // 클라이언트에서만 필요
};

// 개발 환경에서만 로그를 출력하는 함수
function logInDevelopment(message: string, data: unknown): void {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'prod') {
    // env.local, dev에 NEXT_PUBLIC_APP_ENV=prod라고 되어있는거 다른 걸로 바꾸셔야 로그 나올거에요.
    console.log(message, data);
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
      logInDevelopment('[Error 발생]', e);
      throw e;
    }

    const code = e.data.code;
    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      const action = clientErrorActions[code];
      if (action) {
        if (!options?.router) {
          throw new Error('[commonErrorHandler] router가 필요합니다.');
        }
        action(options.router);
      }
    } else {
      const action = serverErrorActions[code];
      if (action) {
        action();
      }
    }

    logInDevelopment('[HTTPError]', e.data);
    throw e;
  }
}
