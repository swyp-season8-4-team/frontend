'use server';

import { isProd } from '@/utils/env';
import type { SignInResponse } from '@repo/entity/src/auth';
import AuthAPIRespository from '@repo/infrastructures/src/repositories/authAPIRespository';
import AuthService from '@repo/usecase/src/authService';
import { cookies } from 'next/headers';

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
});

export async function loginAction(formData: FormData): Promise<SignInResponse | null | void> {
  const email = formData.get('email');
  const password = formData.get('password');
  
  // TODO: 유효성 검사 리턴 타입
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return null;
  }

  try {
    const response = await authService.signIn({
      email,
      password,
      keepLoggedIn: false,
    });

    const cookieList = await cookies();
    
    // 토큰 저장
    cookieList.set('accessToken', response.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error(error);
    // TODO: error handling
  }
}