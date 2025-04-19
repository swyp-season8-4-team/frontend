import { NextResponse, type NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { SupportISO639Language } from '@repo/entity/src/i18n';

import {
  NavigationLanguageGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';
import { isProd } from './utils/env';
import { getTokenInfo } from './utils/token';

// 미들웨어 메인 함수
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  // 로케일 체크 및 리다이렉트
  if (!hasLocale(pathname)) {
    return handleLocaleRedirect(request);
  }

  // 토큰 처리
  const tokenResponse = await handleTokens(request, requestHeaders);
  if (tokenResponse) {
    return tokenResponse;
  }

  // 인증 처리
  const authResponse = await handleAuthorization(request, requestHeaders);
  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// 로케일 존재 여부 확인
function hasLocale(pathname: string): boolean {
  return Object.values(SupportISO639Language).some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
}

// 로케일 리다이렉트 처리
function handleLocaleRedirect(request: NextRequest): NextResponse {
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// 토큰 처리 로직
async function handleTokens(
  request: NextRequest,
  requestHeaders: Headers,
): Promise<NextResponse | null> {
  const { cookies } = request;

  // 이메일 인증 토큰 처리
  const verificationToken = cookies.get('verificationToken')?.value;
  if (verificationToken) {
    requestHeaders.set('X-Email-Verification-Token', verificationToken);
  }

  const prevAccessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;
  const deviceId = cookies.get('deviceId')?.value;

  // refreshToken이 있다면 accessToken이 없어도 재발급 시도
  if (refreshToken) {
    const tokenInfo = await getTokenInfo(
      prevAccessToken,
      refreshToken,
      deviceId,
    );

    if (tokenInfo.token) {
      requestHeaders.set('authorization', `Bearer ${tokenInfo.token}`);

      // 새로운 토큰이 발급되었거나 기존 토큰이 만료된 경우
      if (
        !prevAccessToken ||
        tokenInfo.isExpired ||
        tokenInfo.token !== prevAccessToken
      ) {
        const response = NextResponse.next({
          request: { headers: requestHeaders },
        });

        const maxAgeInSeconds = Math.floor((tokenInfo.exp ?? 0) / 1000);
        const domain = process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN;

        response.cookies.set('accessToken', tokenInfo.token, {
          httpOnly: true,
          secure: isProd,
          sameSite: 'lax',
          maxAge: maxAgeInSeconds,
          domain,
        });

        return response;
      }
    }
  }

  return null;
}

// 인증 처리 로직
async function handleAuthorization(
  request: NextRequest,
  requestHeaders: Headers,
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const authorization = requestHeaders.get('authorization');
  const navigationService = new NavigationService({});

  const isSignInServicePath = navigationService.isSignInServicePath(pathname);
  if (!isSignInServicePath && !authorization) {
    return null;
  }

  if (!authorization) {
    return redirectToSignIn(request);
  }

  return null;
}

// 로그인 페이지 리다이렉트
function redirectToSignIn(request: NextRequest): NextResponse {
  const redirectURL = request.nextUrl.clone();
  const originalSearchParam = redirectURL.search;

  redirectURL.pathname = `${NavigationLanguageGroup.ko}${NavigationPathname.SignIn}`;
  redirectURL.search = '';
  redirectURL.searchParams.set(
    'next',
    `${request.nextUrl.pathname}${originalSearchParam}`,
  );

  return NextResponse.redirect(redirectURL);
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
