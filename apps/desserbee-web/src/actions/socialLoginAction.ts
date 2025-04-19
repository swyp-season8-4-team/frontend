'use server';

import { isProd } from '@/utils/env';
import type { OAuthSocialProvider } from '@repo/entity/src/signIn';
import {
  NavigationPathGroup,
  NavigationLanguageGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJWT } from '@repo/utility/src/jwt';
import { calculateTokenMaxAge } from '@/utils/token';
import { HTTPError } from '@repo/api/src/error';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

interface ActionData {
  code: string;
  provider: OAuthSocialProvider;
  next?: string;
}

export default async function socialLoginAction({
  code,
  provider,
  // next,
}: ActionData) {
  try {
    const response = await authService.socialSignIn({ code, provider });

    const { accessToken, refreshToken, userId, isPreferenceSet, deviceId } =
      response;

    const cookieList = await cookies();
    const domain =
      process.env.NEXT_PUBLIC_APP_ENV !== 'local'
        ? process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN
        : '';

    // 토큰 저장
    const decodedAccessToken = decodeJWT(accessToken);
    const decodedRefreshToken = decodeJWT(refreshToken);

    let accessTokenMaxAge = 3600; // 기본값 1시간
    let refreshTokenMaxAge = 10 * 24 * 60 * 60;

    cookieList.set('deviceId', deviceId, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      domain,
      maxAge:
        calculateTokenMaxAge(decodedRefreshToken?.exp) || refreshTokenMaxAge,
    });

    cookieList.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      domain,
      maxAge:
        calculateTokenMaxAge(decodedAccessToken?.exp) || accessTokenMaxAge,
    });

    cookieList.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      domain,
      maxAge:
        calculateTokenMaxAge(decodedRefreshToken?.exp) || refreshTokenMaxAge,
    });

    if (!isPreferenceSet) {
      redirect(
        `${NavigationLanguageGroup.ko}${NavigationPathGroup.Preference}${userId}`,
      );
    }

    redirect(NavigationPathname.Map);
  } catch (error) {
    if (error instanceof HTTPError) {
      console.log(error.data);
      throw error;
    }

    throw error;
  }
}
