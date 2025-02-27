'use server';

import { isProd } from '@/utils/env';
import type { OAuthSocialProvider } from '@repo/entity/src/auth';
import { NavigationPathname } from '@repo/entity/src/navigation';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

interface ActionData {
  code: string;
  provider: OAuthSocialProvider;
  next?: string;
}

export default async function socialLoginAction({ code, provider, next }: ActionData) {
  const { accessToken } = await authService.socialSignIn({ code, provider });

  const cookieList = await cookies();

  cookieList.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
  });

  redirect(next ?? NavigationPathname.Map);
}
