'use server';

import type { SignUpData } from '@repo/entity/src/auth';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import { cookies } from 'next/headers';

import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import UserService from '@repo/usecase/src/userService';
import { HTTPError } from '@repo/api/src/error';

const userService = new UserService({
  userRepository: new UserAPIRepository(),
});

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

export default async function signUpAction(data: SignUpData) {
  const cookieList = await cookies();
  const verificationToken = cookieList.get('verificationToken')?.value;

  try {
    const result = await authService.signUp(data, verificationToken);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof HTTPError) {
      console.log(error.data);
    }
    throw error;
  }
}
