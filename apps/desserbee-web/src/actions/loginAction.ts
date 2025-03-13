'use server';

import { isProd } from '@/utils/env';
import { HTTPError, type ErrorResponseData } from '@repo/api/src/error';
import type { SignInResponse } from '@repo/entity/src/auth';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import AuthDevAPIRepository from '@repo/infrastructures/src/repositories/authDevAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import { cookies } from 'next/headers';

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
    cookieList.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      domain,
      maxAge: expiresIn,
    });

    cookieList.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      domain,
    });

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      return error.data;
    }

    return null;
  }
}
