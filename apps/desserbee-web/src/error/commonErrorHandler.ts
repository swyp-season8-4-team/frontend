import { redirect, useRouter } from 'next/navigation';
import { HTTPError } from '@repo/api/src/error';
import {
  isDeviceIdNotProvidedError,
  isLoggedOutDeviceError,
} from '@repo/api/src/error/detectors';

/**
 * 서버/클라이언트 공통 에러 핸들러
 */

type ClientOptions = {
  isClient: true;
  router: ReturnType<typeof useRouter>;
};

type ServerOptions = {
  isClient?: false;
};

type HandlerOptions = ClientOptions | ServerOptions;

export async function commonErrorHandler<T>(
  promise: Promise<T>,
  options?: HandlerOptions,
): Promise<T> {
  try {
    return await promise;
  } catch (e) {
    if (!(e instanceof HTTPError)) {
      console.log('----[Error 발생]----');
      console.log(e);
      console.log('----------------');
      throw e;
    }

    if (isLoggedOutDeviceError(e)) {
      if (options?.isClient) {
        alert('로그인이 만료되었습니다.');
        options.router.push('/sign-out');
      } else {
        redirect('/sign-out');
      }
    }

    console.error('----[HTTPError]----');
    console.error(e.data);
    console.log('----------------');
    throw e;
  }
}
