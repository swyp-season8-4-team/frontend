// app/auth/apple/redirect/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NavigationPathname } from '@repo/entity/src/navigation';
import socialLoginAction from '@/actions/socialLoginAction';
import { commonErrorHandler } from '@/error/commonErrorHandler';
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
    return new NextResponse('Invalid form data', { status: 400 });
  }

  try {
    await socialLoginAction({
      code,
      id_token,
      state,
      user: user || null,
      provider: OAuthSocialProvider.APPLE,
    });

    return NextResponse.redirect(NavigationPathname.Map);
  } catch (error) {
    console.error('[Apple Login Error]', error);

    if (error instanceof HTTPError) {
      return new NextResponse(
        `Apple login failed:\n${JSON.stringify(
          {
            error: error.data,
            params: {
              code,
              id_token,
              state,
              user: user || null,
              provider: OAuthSocialProvider.APPLE,
            },
          },
          null,
          2,
        )}`,
        { status: 500 },
      );
    }

    return new NextResponse('Apple login failed', { status: 500 });
  }
}
