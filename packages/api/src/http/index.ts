import http from 'http';

import { modifyDefaultHeaders, serializeQueries } from '..';
import type { RequestData } from '../type';

export const baseHTTP = async <Q, R>(
  requestData: RequestData<Q>
): Promise<R> => {
  const headers = modifyDefaultHeaders(requestData.headers, true);

  const { query, url } = requestData;
  delete requestData.url;

  if (!url) {
    // eslint-disable-next-line no-console
    console.warn(
      'Request url is set to "localhost:3000" since request data has no url'
    );
  }

  const apiURL = url ?? 'localhost:3000';
  const serializedQueries = serializeQueries(query);
  const urlWithQuery = `${apiURL}${
    serializedQueries ? `?${serializedQueries}` : ''
  }`;
  const body = requestData.data ? JSON.stringify(requestData.data) : undefined;

  const promise = new Promise<R>((resolve, reject) => {
    if (process.env.NEXT_PUBLIC_APP_ENV !== 'prod') {
      console.info(
        `Request information url: ${urlWithQuery}, body: ${JSON.stringify(
          body
        )}\n`
      );
    }

    const request = http.request(
      urlWithQuery,
      {
        method: requestData.method,
        headers: { ...headers },
      },
      (response) => {
        let responseStr = '';

        response.on('data', (chunk: string) => {
          responseStr += chunk;
        });

        response.on('end', () => {
          if ((response.statusCode ?? 0) >= 400) {
            reject(
              new Error(
                `API Request is not ok: ${urlWithQuery}, status: ${response.statusCode}, response: ${responseStr}`
              )
            );
          } else {
            const contents: R =
              response.headers['content-type']?.includes('application/json') &&
              response.headers['content-length'] !== '0'
                ? JSON.parse(responseStr)
                : responseStr;

            if (process.env.NEXT_PUBLIC_APP_ENV !== 'prod') {
              let logStr = `Response data(${urlWithQuery}):\nBody: ${JSON.stringify(
                contents
              )}\n`;

              Object.keys(response.headers).forEach((key) => {
                logStr += `${key}: ${response.headers[key]}\n`;
              });

              console.info(logStr);
            }

            resolve(contents);
          }
        });
      }
    );

    request.on('error', (err) => {
      reject(
        new Error(
          `API Request is not ok: ${urlWithQuery}, error message: ${err.message}`
        )
      );
    });

    if (body) {
      request.write(body);
    }

    request.end();
  });

  return promise;
};

export default baseHTTP;
