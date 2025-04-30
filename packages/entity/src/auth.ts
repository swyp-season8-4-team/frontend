import type { BaseRequestData } from './appMetadata';
import type { Gender } from './user';

// FIXME: sign-in entity로 이동
export enum OAuthSocialProvider {
  KAKAO = 'kakao',
  GOOGLE = 'google',
  APPLE = 'apple',
}

// FIXME: sign-in entity로 이동
export function isOAuthSocialProvider(
  provider: string,
): provider is OAuthSocialProvider {
  return !!Object.values(OAuthSocialProvider).find(
    (socialProvider) => provider === socialProvider,
  );
}

export type SignInCodeError =
  | 'INVALID_EMAIL'
  | 'INVALID_PASSWORD'
  | 'INVALID_ALL'
  | 'EMPTY';

export interface JWTPayload {
  iss: string;
  iat: number;
  exp: number;
  jti: string;
  type: string;
  sub?: string;
  roles?: string[];
  sg?: number;
  verificationId?: number;
}

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTRefreshTokens extends Omit<JWTTokens, 'refreshToken'> {
  tokenType: string;
  expiresIn: number;
}

export interface TokenInfo {
  token: string | null;
  isExpired?: boolean;
  exp?: number;
}

export interface RawSignInResponse extends JWTTokens {
  userUuid: string;
  email: string;
  nickname: string;
  preferenceSet: boolean;
  tokenType: string;
  expiresIn: number;
  profileImageUrl: string;
  deviceId: string;
}

export interface SignInResponse
  extends Omit<RawSignInResponse, 'userUuid' | 'preferenceSet'> {
  userId: string;
  isPreferenceSet: boolean;
}

export interface SignOutData {
  authorization: string;
}

export interface SignInData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

export interface SignUpData extends Omit<SignInData, 'keepLoggedIn'> {
  confirmPassword: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  address?: string;
  gender: Gender;
  preferenceIds?: number[];
  role: 'ROLE_USER' | 'ROLE_OWNER';
  profileImage?: File;
}

export type OAuthSignInData = KakaoOAuthSignInData | AppleOAuthSignInData;

export interface KakaoOAuthSignInData {
  provider: string;
  code: string;
}

export interface AppleOAuthSignInData {
  // provider: OAuthSocialProvider.APPLE;
  code: string;
  id_token: string;
  state: string;
  user?: { name: { firstName: string; lastName: string }; email: string };
}
// {
//   "code": "abc123",
//   "id_token": "eyJhbGciOi...",
//   "state": "xyz789",
//   "user": {
//     "email": "user@example.com",
//     "name": {
//       "firstName": "이름",
//       "lastName": "이름"
//     }
//   }
// }

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

export interface ResetPasswordData {
  email: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface AuthRepository {
  socialSignInWithKakao(
    data: BaseRequestData<OAuthSignInData>,
  ): Promise<SignInResponse>; // 카카오 소셜 로그인
  socialSignInWithApple(
    data: BaseRequestData<OAuthSignInData>,
  ): Promise<SignInResponse>;
  signIn(data: BaseRequestData<SignInData>): Promise<SignInResponse>; // 일반 로그인
  signUp(data: BaseRequestData<unknown>): Promise<unknown>; // 회원가입
  signUpWithProfileImage(data: BaseRequestData<unknown>): Promise<unknown>; // 회원가입
  signOut(data: BaseRequestData<SignOutData>): Promise<void>;
  resetPassword(
    data: BaseRequestData<ResetPasswordData>,
  ): Promise<ResetPasswordResponse>;
  findPassword(data: BaseRequestData<{ email: string }>): Promise<unknown>;
  validateResetPasswordToken(
    data: BaseRequestData<{ email: string; token: string }>,
  ): Promise<unknown>;
  verifyEmailRequest(
    data: BaseRequestData<VerifyEmailRequestData>,
  ): Promise<VerifyEmailRequestResponse>; // 이메일 검증 요청
  verifyEmail(
    data: BaseRequestData<VerifyEmailData>,
  ): Promise<VerifyEmailResponse>; // 이메일 검증
  getAuthorization(accessToken?: string): Promise<string | null>;
  refreshAccessToken(
    refreshToken: string,
    deviceId?: string,
  ): Promise<JWTRefreshTokens>;
}
