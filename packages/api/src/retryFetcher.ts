import { delay } from '@repo/utility/src/delay';

import { fetch } from './index';
import { AbortControllerReason, type RequestData } from './types';

function isResponse(object: unknown): object is Response {
  const response = object as Response;

  return (
    response.status !== undefined &&
    response.ok !== undefined &&
    response.statusText !== undefined
  );
}

async function* delayFetches<Q, R>(
  requestData: RequestData<Q>
): AsyncGenerator<R> {
  const startTime = Date.now();
  const maxRetryCount = 6;
  let currentRetryCount = 0;
  let error: Error | null = null;

  for (let i = 0; i < maxRetryCount; i++) {
    try {
      if (currentRetryCount !== 0) {
        await delay(Math.pow(2, currentRetryCount - 1) * 1000);
      }
      const response = await fetch<Q, R>(requestData);

      // if (process.env.NEXT_PUBLIC_APP_ENV !== 'prod') {
      //   console.info(
      //     `Retry count: ${currentRetryCount}, Network time: ${
      //       Date.now() - startTime
      //     }\n`
      //   );
      // }

      yield response;

      return;
    } catch (e) {
      error = e as Error;

      if (
        isResponse(error) &&
        error.status < 500 &&
        error.status > 399 &&
        error.status !== 429 &&
        requestData.retry !== true
      ) {
        throw error;
      }
    } finally {
      currentRetryCount++;
    }

    if (
      requestData.abortController?.signal.reason ===
        AbortControllerReason.userCancel &&
      error
    ) {
      throw error;
    }
  }

  console.error(
    `Error occurs. Retry count: ${currentRetryCount}, Network time: ${
      Date.now() - startTime
    }\n`
  );

  if (isResponse(error)) {
    try {
      console.error(await error.json());
    } catch (e) {}
  }

  throw error;
}

export async function retryFetcher<Q, R>(
  requestData: RequestData<Q>
): Promise<R> {
  const retry = requestData.retry;
  delete requestData.retry;

  if (
    // process.env.NEXT_PUBLIC_USE_API_MOCKING !== 'true' &&
    (retry === undefined || retry === true)
  ) {
    for await (const response of delayFetches<Q, R>(requestData)) {
      return response;
    }
  } else {
    const response = await fetch<Q, R>(requestData);

    return response;
  }

  throw new Error('retryFetcher is not working');
}
