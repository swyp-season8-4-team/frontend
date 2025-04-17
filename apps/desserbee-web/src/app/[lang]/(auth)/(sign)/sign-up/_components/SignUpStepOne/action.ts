'use server';

import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import SessionStorageRepository from '@repo/infrastructures/src/repositories/sessionStorageRepository';
import { isProd } from '@/utils/env';

import { cookies, headers } from 'next/headers';

import AuthService, {
  EmailAuthSessionKey,
  SignUpStep,
  VerifyEmailPurpose,
} from '@repo/usecase/src/authService';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
  storageRepository: new SessionStorageRepository(),
});

export const sendVerifyEmailRequest = async ({ email }: { email: string }) => {
  const { expirationMinutes } = await authService.verifyEmailRequest({
    email,
    purpose: VerifyEmailPurpose.SIGNUP,
  });

  authService.saveEmailAuthSession(EmailAuthSessionKey.SIGNUP, {
    email,
    expirationTimes: expirationMinutes * 60,
  });

  return { expirationMinutes };
};

export const verifyEmail = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const { verificationToken } = await authService.verifyEmail({
    email,
    code,
    purpose: VerifyEmailPurpose.SIGNUP,
  });

  return { verificationToken };
};

interface ActionData {
  token: string;
}

export async function verifyTokenAction(data: ActionData) {
  const { token } = data;

  const cookieList = await cookies();
  // const headerList = await headers();

  cookieList.set('verificationToken', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 60 * 30,
  });

  // headerList.set('X-Email-Verification-Token', token);
}

export const clearEmailAuthSession = async () => {
  authService.clearEmailAuthSession(EmailAuthSessionKey.SIGNUP);
};
