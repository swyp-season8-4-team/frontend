
import type { AuthRepository, JWTTokens, OAuthSignInData, ResetPasswordData, ResetPasswordResponse, SignInData, SignInResponse, SignOutData, VerifyEmailData, VerifyEmailRequestData, VerifyEmailRequestResponse, VerifyEmailResponse } from "@repo/entity/src/auth";
import APIRepository from "./apiRepository";
import type { BaseRequestData } from "@repo/entity/src/appMetadata";

export default class AuthMockRepository extends APIRepository implements AuthRepository {
  refreshAccessToken(refreshToken: string): Promise<JWTTokens> {
    throw new Error("Method not implemented.");
  }
  
  socialSignIn(data: BaseRequestData<OAuthSignInData>): Promise<SignInResponse> {
    throw new Error("Method not implemented.");
  }
  signIn(data: BaseRequestData<SignInData>): Promise<SignInResponse> {
    throw new Error("Method not implemented.");
  }
  signUp(data: BaseRequestData<unknown>): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  signOut(data: BaseRequestData<SignOutData>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  resetPassword(data: BaseRequestData<ResetPasswordData>): Promise<ResetPasswordResponse> {
    throw new Error("Method not implemented.");
  }
  findPassword(data: BaseRequestData<{ email: string; }>): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  validateResetPasswordToken(data: BaseRequestData<{ email: string; token: string; }>): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  verifyEmailRequest(data: BaseRequestData<VerifyEmailRequestData>): Promise<VerifyEmailRequestResponse> {
    throw new Error("Method not implemented.");
  }
  verifyEmail(data: BaseRequestData<VerifyEmailData>): Promise<VerifyEmailResponse> {
    throw new Error("Method not implemented.");
  }
  getAuthorization(accessToken?: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
}