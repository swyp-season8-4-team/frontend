import type { WithParams, WithSearchParams } from '@/app';
import { decrypt } from '@/utils/crypto';
import { isOAuthSocialProvider } from '@repo/entity/src/signIn';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import OAuthLoginCancel from '../../_components/OAuthLoginCancel';
import LoadingUI from '@/app/[lang]/_components/LoadingUI';

const OAuthCallbackLoader = dynamic(
  () => import('../../_components/OAuthCallbackLoader'),
);

interface Props extends WithParams, WithSearchParams {}

export default async function OAuthCallbackProviderPage({
  params,
  searchParams,
}: Props) {
  const { provider } = await params;

  if (!provider || !isOAuthSocialProvider(provider)) {
    notFound();
  }

  const { code, state, error, error_description } = await searchParams;

  if (typeof error === 'string' && typeof error_description === 'string') {
    return (
      <OAuthLoginCancel
        provider={provider}
        error={error}
        error_description={error_description}
      />
    );
  }

  if (typeof code !== 'string') {
    throw new Error('Invalid authorization code');
  }

  // Kakao는 state 필수, Apple은 선택적
  if (provider === 'kakao' && typeof state !== 'string') {
    throw new Error('Invalid state parameter for Kakao');
  }

  // state가 없거나 decrypt 실패 시 방어 처리
  let next = '/';
  if (state && typeof state === 'string') {
    try {
      const decrypted = decrypt(state);
      if (decrypted) {
        const [decryptedNext] = decrypted.split(':');
        if (decryptedNext) {
          next = decryptedNext;
        }
      }
    } catch (error) {
      console.error('Failed to decrypt state:', error);
    }
  }

  const [, ...rest] = state ? decrypt(state)?.split(':') ?? [''] : [''];

  if (!rest) {
    throw new Error('state value decrypt error');
  }

  return (
    <LoadingUI description="열심히 로그인 중입니다!">
      {!error && (
        <OAuthCallbackLoader next={next} code={code} provider={provider} />
      )}
    </LoadingUI>
  );
}
