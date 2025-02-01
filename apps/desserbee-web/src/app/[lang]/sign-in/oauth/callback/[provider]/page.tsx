import type { WithParams, WithSearchParams } from "@/app";
import { decrypt } from "@/utils/crypto";
import { isOAuthSocialProvider } from "@repo/entity/src/auth";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import OAuthCallbackLoader from "../_components/OAuthCallbackLoader";

interface Props extends WithParams, WithSearchParams {}

export default async function OAuthCallbackProviderPage({ params, searchParams }: Props) {
  const { provider } = await params;

  if (!provider || !isOAuthSocialProvider(provider)) {
    notFound();
  }

  // TODO: CSRF 방지 state값 해싱 필요, 로그인 취소 처리 필요
  const { code, state, error } = await searchParams;

  if (typeof code !== 'string') {
    throw new Error('Invalid authorization code');
  }



  if (typeof state !== 'string') {
    throw new Error('Invalid state');
  }

  const [next] = decrypt(state).split(':');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!error && <OAuthCallbackLoader next={next} code={code} provider={provider} />}
    </Suspense>
  );
}
