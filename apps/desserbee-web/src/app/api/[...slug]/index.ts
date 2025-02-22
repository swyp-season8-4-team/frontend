import { NextResponse } from 'next/server';

export async function httpHandler(request: Request): Promise<Response> {
  // if (process.env.NEXT_PUBLIC_APP_ENV !== 'local') {
  //   return new Response(null, { status: 404, statusText: 'Not Found' });
  // }

  const origin =
    process.env.NEXT_PUBLIC_APP_ENV !== 'prod'
      ? 'http://localhost:3000'
      : 'https://www.desserbee.com';

  const endpoint = request.url.replace(
    origin,
    process.env.NEXT_PUBLIC_SERVICE_API_URL ?? '',
  );

  const requestInit: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(request.headers.get('x-email-verification-token') && {
        'X-Email-Verification-Token': request.headers.get(
          'x-email-verification-token',
        ) as string,
      }),
      ...(request.headers.has('cookie')
        ? { cookie: request.headers.get('cookie') as string }
        : {}),
    },
    method: request.method,
  };

  if (request.method === 'POST' || request.method === 'PATCH') {
    requestInit.body = await request.text();
  }

  console.info(
    `Proxy request information url: ${endpoint}, requestInfo: ${JSON.stringify(
      requestInit,
    )}\n`,
  );

  const response = await fetch(endpoint, requestInit);
  const responseText = await response.text();

  console.info(
    `Proxy response status: ${response.status}, data: ${responseText}\n`,
  );

  if (responseText === '') {
    return NextResponse.json({}, { status: response.status });
  }

  const setCookies = response.headers.getSetCookie();
  const headers = new Headers(response.headers);
  headers.delete('set-cookie');
  setCookies.forEach((cookie) => {
    headers.append(
      'set-cookie',
      cookie.replace(`Domain=${process.env.APP_COOKIE_DOMAIN}; `, ''),
    );
  });
  // response 에 br 이 넘어오면 프록시에서 처리를 못하므로 삭제
  headers.delete('content-encoding');
  headers.delete('content-length');

  // Check if the response is JSON
  const jsonData = JSON.parse(responseText);
  return NextResponse.json(jsonData, {
    status: response.status,
    headers,
  });
}
