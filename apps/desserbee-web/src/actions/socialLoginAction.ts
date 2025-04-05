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
  next,
}: ActionData) {
  const response = await authService.socialSignIn({ code, provider });

  const { accessToken, refreshToken, userId, isPreferenceSet } = response;

  const cookieList = await cookies();
  const domain =
    process.env.NEXT_PUBLIC_APP_ENV !== 'local'
      ? process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN
      : '';

  // 토큰 저장
  const decodedAccessToken = decodeJWT(accessToken);
  let accessTokenMaxAge = 3600; // 기본값 1시간

  cookieList.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    domain,
    maxAge: calculateTokenMaxAge(decodedAccessToken?.exp) || accessTokenMaxAge,
  });

  // 리프레시 토큰의 만료 시간 계산
  const decodedRefreshToken = decodeJWT(refreshToken);
  // 기본값으로 10일 설정 (디코딩 실패 시 백업)
  let refreshTokenMaxAge = 10 * 24 * 60 * 60;

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
}
