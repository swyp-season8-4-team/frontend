import { NextResponse, type NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { SupportISO639Language } from '@repo/entity/src/i18n';
import { decodeJWT, isExpiredJWT } from '@repo/utility/src/jwt';
import AuthService from '@repo/usecase/src/authService';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import {
  NavigationLanguageGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';
import { HTTPError } from '@repo/api/src/error';
import { isProd } from './utils/env';

// 토큰 정보 인터페이스
interface TokenInfo {
  token: string | null;
  isExpired?: boolean;
  exp?: number;
}

// 토큰 캐시 저장소
const savedTokens: { [key: string]: TokenInfo } = {};

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

  // 액세스 토큰 처리
  const prevAccessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;

  const tokenInfo = await getTokenInfo(prevAccessToken, refreshToken);

  if (tokenInfo.token) {
    requestHeaders.set('authorization', `Bearer ${tokenInfo.token}`);

    // 토큰 갱신이 필요한 경우
    if (tokenInfo.isExpired && tokenInfo.token !== prevAccessToken) {
      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });

      response.cookies.set('accessToken', tokenInfo.token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: (tokenInfo.exp ?? 0) * 1000,
      });

      return response;
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

// 토큰 정보 조회
async function getTokenInfo(
  accessToken: string | undefined,
  refreshToken: string | undefined,
): Promise<TokenInfo> {
  if (!accessToken && !refreshToken) {
    return { token: null };
  }

  // 캐시된 유효한 토큰이 있는지 확인
  if (accessToken) {
    const decodedToken = decodeJWT(accessToken);
    if (decodedToken?.sub) {
      const subKey = JSON.stringify(decodedToken.sub);
      const savedToken = savedTokens[subKey]?.token;
      if (savedToken && !isExpiredJWT(savedToken)) {
        return { token: savedToken };
      }
    }
  }

  return await refreshTokenIfNeeded(accessToken ?? null, refreshToken ?? null);
}

// 토큰 갱신 처리
async function refreshTokenIfNeeded(
  accessToken: string | null,
  refreshToken: string | null,
): Promise<TokenInfo> {
  const isAccessTokenExpired = isExpiredJWT(accessToken);
  const isRefreshTokenExpired = refreshToken
    ? isExpiredJWT(refreshToken)
    : true;

  if (isAccessTokenExpired && isRefreshTokenExpired) {
    return { token: null };
  }

  if (isAccessTokenExpired && refreshToken) {
    try {
      const authService = new AuthService({
        authRepository: new AuthAPIRepository(),
      });
      const { accessToken: newToken, expiresIn } =
        await authService.refreshAccessToken(refreshToken);

      return {
        token: newToken,
        isExpired: true,
        exp: expiresIn,
      };
    } catch (error) {
      if (error instanceof HTTPError && error.data.status === 401) {
        return { token: null };
      }
      throw error;
    }
  }

  return { token: accessToken };
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
