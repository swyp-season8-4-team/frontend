'use server';

import { isProd } from '@/utils/env';
import { HTTPError, type ErrorResponseData } from '@repo/api/src/error';
import type { SignInResponse } from '@repo/entity/src/auth';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import AuthDevAPIRepository from '@repo/infrastructures/src/repositories/authDevAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import { cookies } from 'next/headers';
import { decodeJWT } from '@repo/utility/src/jwt';

const authService = new AuthService({
  authRepository:
    process.env.NEXT_PUBLIC_APP_ENV === 'dev_local' // test용
      ? new AuthDevAPIRepository()
      : new AuthAPIRepository(),
});

export async function loginAction(
  formData: FormData,
): Promise<SignInResponse | ErrorResponseData | null> {
  const email = formData.get('email');
  const password = formData.get('password');
  const keepLoggedIn = formData.get('containLogin');

  // TODO: 유효성 검사 리턴 타입
  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return null;
  }

  try {
    const response = await authService.signIn({
      email,
      password,
      keepLoggedIn: keepLoggedIn === 'on',
    });

    const { accessToken, refreshToken, expiresIn } = response;

    const cookieList = await cookies();

    const domain =
      process.env.NEXT_PUBLIC_APP_ENV !== 'local'
        ? process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN
        : '';

    // 토큰 저장
    const decodedAccessToken = decodeJWT(accessToken);
    let accessTokenMaxAge = expiresIn; // 기본값으로 백엔드에서 받은 값 사용

    if (decodedAccessToken && decodedAccessToken.exp) {
      const now = Math.floor(Date.now() / 1000);
      accessTokenMaxAge = Math.max(0, decodedAccessToken.exp - now);
    }

    cookieList.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      domain,
      maxAge: accessTokenMaxAge, // JWT의 실제 만료 시간 사용
    });

    // 리프레시 토큰의 만료 시간 계산
    const decodedRefreshToken = decodeJWT(refreshToken);
    // 기본값으로 10일 설정 (디코딩 실패 시 백업)
    let refreshTokenMaxAge = 10 * 24 * 60 * 60;

    if (decodedRefreshToken && decodedRefreshToken.exp) {
      const now = Math.floor(Date.now() / 1000);
      refreshTokenMaxAge = Math.max(0, decodedRefreshToken.exp - now);
    }

    cookieList.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      domain,
      maxAge: refreshTokenMaxAge,
    });

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      return error.data;
    }

    return null;
  }
}
