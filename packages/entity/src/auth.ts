import type { BaseRequestData } from "./appMetadata";

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

export interface AuthRepository {
  signIn(data: BaseRequestData<SignInData>): Promise<JWTTokens>; // 일반 로그인
  signUp(data: BaseRequestData<unknown>): Promise<void>; // 회원가입
  getAuthorization(accessToken?: string): Promise<string | null>;
  refreshAccessToken(refreshToken: string): Promise<JWTTokens>;
}
