import { isServer, modifyDefaultHeaders, serializeQueries } from '..';
import { HTTPError } from '../error';
import type { RequestData } from '../types';

const TIMEOUT = 30 * 1000;

const baseFetch = async <Q, R>(
  originalRequestData: RequestData<Q>,
): Promise<R> => {
  const requestData = { ...originalRequestData };
  const headers = modifyDefaultHeaders(requestData.headers, isServer);

  const { query, url } = requestData;
  delete requestData.url;

  if (!url) {
    console.warn(
      'Request url is set to "localhost:3000" since request data has no url',
    );
  }

  const controller =
    typeof AbortController !== `undefined` ? requestData.abortController : null;
  const apiURL = url ?? 'localhost:3000';
  const serializedQueries = serializeQueries(query);
  const urlWithQuery = `${apiURL}${
    serializedQueries ? `?${serializedQueries}` : ''
  }`;
  const body = requestData.data ? JSON.stringify(requestData.data) : undefined;
  const requestInfo: RequestInit = {
    body,
    credentials: 'include',
    method: requestData.method,
    headers,
    signal: controller?.signal,
  };

  // if (process.env.NEXT_PUBLIC_USE_API_LOG !== 'false') {
  //   console.info(
  //     `Request information url: ${urlWithQuery}, requestInfo: ${JSON.stringify(
  //       requestInfo,
  //     )}\n`,
  //   );
  // }

  const timeoutID = setTimeout(() => controller?.abort(), TIMEOUT);

  try {
    const startTime = Date.now();
    const response = await fetch(urlWithQuery, requestInfo);
    if (!response.ok) {
      console.error(
        `API Request is not ok: ${urlWithQuery}, status: ${
          response.status
        }, duration = ${Date.now() - startTime}`,
      );

      throw new HTTPError(response.status, response.statusText);
    }

    const contents: R =
      response.headers.get('Content-Type')?.includes('application/json') &&
      response.headers.get('Content-Length') !== '0'
        ? await response.json()
        : await response.text();

    // if (process.env.NEXT_PUBLIC_USE_API_LOG !== 'false') {
    //   let logStr = `Response data(${urlWithQuery}):\nBody: ${
    //     response.headers.get('Content-Type') !== 'text/html'
    //       ? JSON.stringify(contents)
    //       : 'Html Text'
    //   }\n`;

    //   const keys = response.headers.keys();
    //   let key = keys.next();
    //   while (!key.done) {
    //     logStr += `${key.value}: ${response.headers.get(key.value)}\n`;
    //     key = keys.next();
    //   }

    //   console.info(logStr);
    // }

    return contents;
  } catch (error) {
    throw error;
  } finally {
    clearTimeout(timeoutID);
  }
};

export default baseFetch;
