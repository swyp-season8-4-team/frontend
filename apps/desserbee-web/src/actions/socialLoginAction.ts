'use server';

import { isProd } from '@/utils/env';
import type { OAuthSocialProvider } from '@repo/entity/src/auth';
import { NavigationPathGroup, NavigationLanguageGroup, NavigationPathname } from '@repo/entity/src/navigation';
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
  const response = await authService.socialSignIn({ code, provider });

  const { accessToken, refreshToken, userId, isPreferenceSet, expiresIn } = response;

  const cookieList = await cookies();

  const domain =
  process.env.NEXT_PUBLIC_APP_ENV !== 'local'
    ? process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN
    : '';

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

  if (!isPreferenceSet) {
    redirect(`${NavigationLanguageGroup.ko}${NavigationPathGroup.Preference}${userId}`);
  }

  redirect(NavigationPathname.Map);
}
