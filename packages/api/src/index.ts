// import type { ListRequest } from 'entity';

import webAPIFetch from './fetch';
import type { Headers, Queries, RequestData } from './types';

export const isServer = typeof window === 'undefined';

let http: (<Q, R>(requestData: RequestData<Q>) => Promise<R>) | null = null;

// if (isServer && process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true') {
//   import('./http').then((module) => (http = module.default));
// }

export async function fetch<Q, R>(requestData: RequestData<Q>): Promise<R> {
  let response: R | null;

  // if (
  //   isServer &&
  //   process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true' &&
  //   !!http
  // ) {
  //   response = await http<Q, R>(requestData);

  //   return response;
  // }

  response = await webAPIFetch<Q, R>(requestData);

  return response;
}

export function modifyDefaultHeaders(
  headers?: Headers,
  isServer?: boolean
): Headers {
  const newHeaders: Headers = {};
  newHeaders['Accept-Encoding'] = 'gzip, deflate';
  newHeaders['Content-Type'] = 'application/json';

  console.log('newHeaders', newHeaders);

  if (headers) {
    Object.keys(headers).forEach((key) => {
      if (
        headers[key] &&
        (key !== 'authorization' || isServer)
      ) {
        newHeaders[key] = headers[key];
      }
    });
  }

  console.log('newHeaders', newHeaders);

  return newHeaders;
}

export function serializeQueries(queries?: Queries): string {
  if (!queries || Object.keys(queries).length === 0) {
    return '';
  }

  const encodedQueryString = Object.keys(queries).reduce((prev, curr) => {
    if (Array.isArray(queries[curr])) {
      return `${prev}${!!prev ? '&' : ''}${curr}=${encodeURIComponent(
        (queries[curr] as Array<string>).join(',')
      )}`;
    }

    if (!queries[curr]) {
      return prev;
    }

    return `${prev}${!!prev ? '&' : ''}${curr}=${encodeURIComponent(
      queries[curr] as string
    )}`;
  }, '');

  return encodedQueryString;
}
