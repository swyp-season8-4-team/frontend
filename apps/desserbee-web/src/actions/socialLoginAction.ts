'use server';

import { isProd } from '@/utils/env';
import { OAuthSocialProvider } from '@repo/entity/src/signIn';
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
import type { OAuthSignInData } from '@repo/entity/src/auth';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

type ActionData = {
  code: string;
  provider: OAuthSocialProvider;
  id_token?: string;
  user?: { name: { firstName: string; lastName: string }; email: string };
  next?: string;
  state?: string;
};

export default async function socialLoginAction({
  code,
  provider,
  id_token, // 백엔드에서 안 받아도 된다고 하면 지우기
  user,
  state,
  // next,
}: ActionData) {
  try {
    let response;

    switch (provider) {
      case OAuthSocialProvider.KAKAO:
        response = await authService.socialSignIn({ code, provider });
        break;
      case OAuthSocialProvider.APPLE:
        if (!id_token || !state) {
          throw new Error('id_token and state are required for Apple login');
        }
        response = await authService.socialSignIn({
          code,
          id_token,
          state,
          user,
          provider,
        });
        break;
      default:
        throw new Error(`Unsupported social login provider: ${provider}`);
    }

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

    if (isPreferenceSet) {
      if (provider === OAuthSocialProvider.APPLE) {
        return {
          redirectUrl: `${NavigationLanguageGroup.ko}${NavigationPathGroup.Preference}${userId}`,
        };
      }
      redirect(
        `${NavigationLanguageGroup.ko}${NavigationPathGroup.Preference}${userId}`,
      );
    }

    if (provider === OAuthSocialProvider.APPLE) {
      return { redirectUrl: NavigationPathname.Map };
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
