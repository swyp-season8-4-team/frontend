'use server';

import { cookies } from 'next/headers';
import { decodeJWT } from '@repo/utility/src/jwt';
import AuthService from '@repo/usecase/src/authService';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import { HTTPError } from '@repo/api/src/error';
import { isProd } from '@/utils/env';

// 토큰 정보를 확인하는 액션
export async function checkTokenAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
  };
}

// 토큰을 수동으로 갱신하는 액션
export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return {
      success: false,
      error: '리프레시 토큰이 없습니다',
    };
  }

  try {
    const authService = new AuthService({
      authRepository: new AuthAPIRepository(),
    });

    const { accessToken, expiresIn } =
      await authService.refreshAccessToken(refreshToken);

    // 새 액세스 토큰을 쿠키에 저장
    const domain =
      process.env.NEXT_PUBLIC_APP_ENV !== 'local'
        ? process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN
        : '';

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      domain,
      maxAge: expiresIn,
    });

    return {
      success: true,
      accessToken,
    };
  } catch (error) {
    let errorMessage = '토큰 갱신 중 오류가 발생했습니다';

    if (error instanceof HTTPError) {
      errorMessage = `API 오류 (${error.data.status}): ${error.data.message || '알 수 없는 오류'}`;

      // 인증 관련 오류인 경우
      if (error.data.status === 401) {
        errorMessage = '리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.';
        // 쿠키 삭제 로직 추가 가능
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
