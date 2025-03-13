export enum OAuthSocialError {
  ACCESS_DENIED = 'access_denied',
}

export enum OAuthSocialErrorDescription {
  USER_ACCESS_DENIED = 'User denied access',
}

export enum OAuthSocialProvider {
  KAKAO = 'kakao',
  GOOGLE = 'google',
}

export function isOAuthSocialProvider(
  provider: string,
): provider is OAuthSocialProvider {
  return !!Object.values(OAuthSocialProvider).find(
    (socialProvider) => provider === socialProvider,
  );
}

export interface OAuthSocialErrorData {
  error: OAuthSocialError;
  error_description: OAuthSocialErrorDescription;
}

export type SignInCodeError =
  | 'INVALID_EMAIL'
  | 'INVALID_PASSWORD'
  | 'INVALID_ALL'
  | 'EMPTY';
