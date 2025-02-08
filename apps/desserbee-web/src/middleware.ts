import { NextResponse, type NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { SupportISO639Language } from '@repo/entity/src/i18n';
import { decodeJWT, isExpiredJWT } from '@repo/utility/src/jwt';
import AuthService from '@repo/usecase/src/authService';
import AuthAPIRespository from '@repo/infrastructures/src/repositories/authAPIRespository';

const savedTokens: { [key: string]: string } = {};

export async function middleware(request: NextRequest) {
  const { headers } = request;
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(headers);
  const token = await getToken(request);
  if (token) {
    requestHeaders.set('authorization', `Bearer ${token}`);
  }

  const next = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const authorization = requestHeaders.get('authorization');

  // TODO: 로그인 여부에 따른 페이지 접근 권한 체크
  // const authService = new AuthService({});

  // const isSignInServicePath = await authService.isSignInServicePath(pathname);
  // if (!isSignInServicePath && !authorization) {
  //   return next;
  // }

  const pathnameHasLocale = Object.values(SupportISO639Language).some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // if (!authorization) {
  //   // Redirect to sign-in page if there is no authorization
  //   const redirectURL = request.nextUrl.clone();

  //   const originalSearchParam = redirectURL.search;
  //   redirectURL.pathname = `${getLocale(request)}/${NavigationPathname.signIn}`;
  //   redirectURL.search = '';
  //   redirectURL.searchParams.set('next', `${pathname}${originalSearchParam}`);

  //   return NextResponse.redirect(redirectURL);
  // }

  return next;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (control crawler traffic)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|mockServiceWorker.js).*)',
  ],
};

/**
 * 요청 헤더에서 언어를 추출하여 반환합니다.
 * @param request 요청 객체
 * @returns 언어
 */
function getLocale(request: NextRequest): SupportISO639Language {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = Object.values(SupportISO639Language);
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const defaultLocale = SupportISO639Language.ko; // 기본 언어를 ko로 설정
  return match(languages, locales, defaultLocale) as SupportISO639Language;
}

/**
 * accessToken과 refreshToken을 바탕으로 적절한 토큰을 반환합니다.
 * @param request 요청 객체
 * @returns 토큰
 */
async function getToken(request: NextRequest): Promise<string | void> {
  const { cookies } = request;

  // FIXME: cookie key값 미확정
  const accessToken = cookies.get('access_token')?.value;
  const refreshToken = cookies.get('refresh_token')?.value;

  // 둘다 없으면 로그인을 다시 해야하는것
  if (!accessToken || !refreshToken) {
    return;
  }

  // 저장된 토큰이 있고 만료되지 않았다면 반환
  const decodedAccessToken = decodeJWT(accessToken);
  const savedToken = savedTokens[decodedAccessToken.sub];
  if (savedToken && !isExpiredJWT(savedToken)) {
    return savedToken;
  }

  const isAccessTokenExpired = isExpiredJWT(accessToken);
  const isRefreshTokenExpired = isExpiredJWT(refreshToken);

  let newAccessToken: string | null = null;

  const authService = new AuthService({
    authRepository: new AuthAPIRespository(),
  });

  if (isAccessTokenExpired) {
    if (isRefreshTokenExpired) {
      return;
    }

    // 리프레시 토큰을 가지고 다시 accessToken 발급
    const { accessToken }: { accessToken: string } =
      await authService.refreshAccessToken(refreshToken);
    newAccessToken = accessToken;
  }

  const response = await authService.getAuthorization(
    newAccessToken ?? accessToken,
  );

  if (!response) {
    return;
  }

  const matches = response.match(/authorization: Bearer [^\s]*/i);

  if (!matches) {
    throw new Error('Bearer field is not found');
  }

  const token = matches
    .at(0)
    ?.replace(/authorization: Bearer /i, '')
    .trim();

  if (!token) {
    throw new Error('Bearer token is not found');
  }

  savedTokens[decodedAccessToken.sub] = token;

  return token;
}
