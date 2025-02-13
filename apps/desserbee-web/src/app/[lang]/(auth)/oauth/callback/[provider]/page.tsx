import type { WithParams, WithSearchParams } from "@/app";
import { decrypt } from "@/utils/crypto";
import { isOAuthSocialProvider } from "@repo/entity/src/auth";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import OAuthLoading from "../_components/OAuthLoading";

const OAuthCallbackLoader = dynamic(() => import('../_components/OAuthCallbackLoader'));

interface Props extends WithParams, WithSearchParams {}

export default async function OAuthCallbackProviderPage({ params, searchParams }: Props) {
  const { provider } = await params;

  if (!provider || !isOAuthSocialProvider(provider)) {
    notFound();
  }

  const { code, state, error } = await searchParams;

  if (typeof code !== 'string') {
    throw new Error('Invalid authorization code');
  }

  if (typeof state !== 'string') {
    throw new Error('Invalid state');
  }

  const [next, ...rest] = decrypt(state).split(':');

  if (!rest) {
    throw new Error('state value decrypt error');
  }

  return (
    <OAuthLoading>
      {!error && <OAuthCallbackLoader next={next} code={code} provider={provider} />}
    </OAuthLoading>
  );
}