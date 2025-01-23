import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SupportISO639Language } from '@repo/entity/src/i18n';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): SupportISO639Language {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = Object.values(SupportISO639Language);
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const defaultLocale = SupportISO639Language.ko; // 기본 언어를 ko로 설정
  return match(languages, locales, defaultLocale) as SupportISO639Language;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = Object.values(SupportISO639Language).some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
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
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
};
