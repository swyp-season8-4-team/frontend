'use server';

import { cookies } from 'next/headers';
import AuthService from '@repo/usecase/src/authService';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import { HTTPError } from '@repo/api/src/error';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

export async function resetPasswordAction({
  email,
  newPassword,
  confirmNewPassword,
}: {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}) {
  try {
    const cookieStore = await cookies();
    const verificationToken = cookieStore.get('verificationToken')?.value;

    if (!verificationToken) {
      throw new Error('verificationToken is not exist in cookies');
    }

    const response = await authService.resetPassword({
      email,
      newPassword,
      confirmNewPassword,
      verificationToken,
    });

    return { success: true, message: response.message };
  } catch (error) {
    if (error instanceof HTTPError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: '비밀번호 변경 중 오류가 발생했습니다.' };
  }
}
