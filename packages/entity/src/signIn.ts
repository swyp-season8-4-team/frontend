export enum OAuthSocialError {
  ACCESS_DENIED = 'access_denied',
}

export enum OAuthSocialErrorDescription {
  USER_ACCESS_DENIED = 'User denied access',
}

export interface OAuthSocialErrorData {
  error: OAuthSocialError;
  error_description: OAuthSocialErrorDescription;
}
