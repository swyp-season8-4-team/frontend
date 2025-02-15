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

export interface SignInResponse extends JWTTokens {
  userUuid: string;
  email: string;
  nickname: string;
}

export interface SignInData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

export interface SignUpData extends Omit<SignInData, 'keepLoggedIn'> {
  confirmPassword: string;
  nickname?: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  gender: string;
  preferenceIds?: number[];
}

export interface OAuthSignInData {
  provider: string;
  // code: string;
}

export interface VerifyEmailRequestData {
  email: string;
  purpose: string;
}

export interface VerifyEmailData extends VerifyEmailRequestData {
  code: string;
}

export interface VerifyEmailRequestResponse {
  message: string;
  expirationMinutes: number;
}

export interface VerifyEmailResponse {
  verified: boolean;
  verificationToken: string;
}


export interface AuthRepository {
  socialSignIn(data: BaseRequestData<OAuthSignInData>): Promise<unknown>; // 소셜 로그인
  signIn(data: BaseRequestData<SignInData>): Promise<SignInResponse>; // 일반 로그인
  signUp(data: BaseRequestData<unknown>): Promise<unknown>; // 회원가입
  signOut(): Promise<void>;
  resetPassword(data: BaseRequestData<{ email: string }>): Promise<unknown>;
  findPassword(data: BaseRequestData<{ email: string }>): Promise<unknown>;  
  validateResetPasswordToken(data: BaseRequestData<{ email: string, token: string }>): Promise<unknown>;
  verifyEmailRequest(data: BaseRequestData<VerifyEmailRequestData>): Promise<VerifyEmailRequestResponse>; // 이메일 검증 요청
  verifyEmail(data: BaseRequestData<VerifyEmailData>): Promise<VerifyEmailResponse>; // 이메일 검증
  getAuthorization(accessToken?: string): Promise<string | null>;
  refreshAccessToken(refreshToken: string): Promise<JWTTokens>;
}
