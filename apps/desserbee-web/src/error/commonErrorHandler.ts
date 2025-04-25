import { HTTPError } from '@repo/api/src/error';
import { clientErrorActions } from './clientErrorActions';
import { serverErrorActions } from './serverErrorActions';
import type { useRouter } from 'next/navigation';

type HandlerOptions = {
  router?: ReturnType<typeof useRouter>; // 클라이언트에서만 필요
};

export async function commonErrorHandler<T>(
  promise: Promise<T>,
  options?: HandlerOptions,
): Promise<T> {
  try {
    return await promise;
  } catch (e) {
    if (!(e instanceof HTTPError)) {
      console.log('[Error 발생]', e);
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

    console.error('[HTTPError]', e.data);
    throw e;
  }
}
