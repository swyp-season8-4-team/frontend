'use client';
import Script from 'next/script';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import { getState } from './action';
import { useEffect, useState } from 'react';
import { OAuthSocialProvider } from '@repo/entity/src/auth';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

export default function AppleSignInButton() {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    const initState = async () => {
      const stateValue = await getState();
      setState(stateValue);
    };
    initState();
  }, []);

  useEffect(() => {
    if (!state) return;

    if (typeof window !== 'undefined' && window.AppleID?.auth?.init) {
      window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_SERVICE_ID!,
        scope: 'name email',
        redirectURI: authService.getOAuthRedirectUri(
          OAuthSocialProvider.APPLE,
        )!,
        state,
        usePopup: false,
      });
    }
  }, [state]);

  // response_type=form_post (강제)
  return (
    <>
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js"
        strategy="afterInteractive"
      />
      <div
        id="appleid-signin"
        data-color="black" // 버튼 색상: black or white
        data-border="false" // border 없애기
        data-border-radius="6" // 공식 권장: 6px
        data-type="sign-in" // 버튼 텍스트: "Sign in with Apple"
        data-height="60" // 공식 권장: 60px
        data-logo-size="medium" // 로고 크기 (small, medium, large)
        data-mode="center-align" // 텍스트, 로고 중앙 정렬
      ></div>
    </>
  );
}
