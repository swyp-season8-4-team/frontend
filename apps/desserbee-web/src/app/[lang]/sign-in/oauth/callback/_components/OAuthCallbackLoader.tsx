'use client';

import redirectAction from "@/actions/redirectAction";
import type { OAuthSocialProvider } from "@repo/entity/src/auth";
import { NavigationPathname } from "@repo/entity/src/navigation";
import AuthAPIRespository from "@repo/infrastructures/src/repositories/authAPIRespository";
import AuthService from "@repo/usecase/src/authService";
import { useEffect } from "react";

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
});

interface Props {
  code: string;
  provider: OAuthSocialProvider;
  next?: string;
}

export default function OAuthCallbackLoader({ code, next, provider }: Props) {

  useEffect(() => {
    (async () => {
      try {
        // const response = await authService.socialLogin({ code, provider });
        // TODO: accessToken, refreshToken 저장
        // await redirectAction(next ?? NavigationPathname.Map);
      } catch (error) {
        // 401인 경우 따로 처리하나?
        console.error(error);
      }
      
    })();
  }, []);

  return null;
}