'use client';

import socialLoginAction from '@/actions/socialLoginAction';
import { HTTPError } from '@repo/api/src/error';
import type { OAuthSocialProvider } from '@repo/entity/src/signIn';
import { useEffect } from 'react';

interface Props {
  code: string;
  provider: OAuthSocialProvider;
  next?: string;
}

export default function OAuthCallbackLoader({ code, next, provider }: Props) {
  useEffect(() => {
    (async () => {
      try {
        await socialLoginAction({ code, provider, next });
      } catch (error) {
        if (error instanceof HTTPError) {
          console.error(error.data);
        }
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();
  }, [code, next, provider]);

  return null;
}
