// app/auth/apple/redirect/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  NavigationLanguageGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';
import socialLoginAction from '@/actions/socialLoginAction';
import { OAuthSocialProvider } from '@repo/entity/src/auth';
import { HTTPError } from '@repo/api/src/error';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const code = formData.get('code');
  const id_token = formData.get('id_token');
  const userRaw = formData.get('user');
  const user = typeof userRaw === 'string' ? JSON.parse(userRaw) : undefined;
  const state = formData.get('state');

  if (
    typeof code !== 'string' ||
    typeof id_token !== 'string' ||
    typeof state !== 'string'
  ) {
    return NextResponse.redirect(NavigationPathname.SignIn);
  }

  try {
    const result = await socialLoginAction({
      code,
      id_token,
      state,
      user: user || null,
      provider: OAuthSocialProvider.APPLE,
    });

    if (result && result.redirectUrl) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_HOST;

      return NextResponse.redirect(
        `${baseUrl}${NavigationLanguageGroup.ko}${NavigationPathname.OAuthLoading}?next=${encodeURIComponent(result.redirectUrl)}`,
        303,
      );
    }

    return NextResponse.redirect(NavigationPathname.Map);
  } catch (error) {
    if (error instanceof HTTPError) {
      return new NextResponse(
        `Apple login failed:\n${JSON.stringify(
          {
            error: error.data,
          },
          null,
          2,
        )}`,
        { status: 500 },
      );
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'digest' in error &&
      String(error.digest).startsWith('NEXT_REDIRECT')
    ) {
      // throw error; // 기존 코드 주석 처리
      return new NextResponse(
        `Apple login failed (NEXT_REDIRECT):\n${JSON.stringify(
          { error },
          null,
          2,
        )}`,
        { status: 500 },
      );
    }

    return new NextResponse(
      `Apple login failed:\n${JSON.stringify(
        {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
        null,
        2,
      )}`,
      { status: 500 },
    );
  }
}
