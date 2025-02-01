import type { BaseRequestData } from "./appMetadata";

export enum OAuthSocialProvider {
  KAKAO = "kakao",
}

export function isOAuthSocialProvider(provider: string): provider is OAuthSocialProvider {
  return !!Object.values(OAuthSocialProvider).find((socialProvider) =>
    provider === socialProvider
  );
}

export interface JWTPayload {
  exp: number;
  sub: string;
  sg?: number;
}

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface OAuthSignInData {
  provider: string;
  code: string;
}

export interface AuthRepository {
  signIn(data: BaseRequestData<SignInData>): Promise<JWTTokens>; // 일반 로그인
  signUp(data: BaseRequestData<unknown>): Promise<void>; // 회원가입
  signOut(): Promise<void>;
  resetPassword(data: BaseRequestData<{ email: string }>): Promise<unknown>;
  findPassword(data: BaseRequestData<{ email: string }>): Promise<unknown>;  
  validateResetPasswordToken(data: BaseRequestData<{ email: string, token: string }>): Promise<unknown>;
  getAuthorization(accessToken?: string): Promise<string | null>;
  refreshAccessToken(refreshToken: string): Promise<JWTTokens>;
}
