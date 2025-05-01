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
      <div style={{ position: 'relative', width: '100%', height: '60px' }}>
        {/* 항상 보이는 기본 버튼 디자인 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '60px',
            background: 'black',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            fontSize: '18px',
            zIndex: 1,
          }}
        ></div>
        {/* 실제 Apple 버튼이 올라올 자리 */}
        <div
          id="appleid-signin"
          data-color="black"
          data-border="false"
          data-border-radius="6"
          data-type="sign-in"
          data-height="60"
          data-logo-size="medium"
          data-mode="center-align"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '60px',
            zIndex: 2,
          }}
        ></div>
      </div>
    </>
  );
}
