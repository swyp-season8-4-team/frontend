import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository, JWTTokens, ResetPasswordData, ResetPasswordResponse, SignInData, SignInResponse, VerifyEmailData, VerifyEmailRequestData, VerifyEmailRequestResponse, VerifyEmailResponse } from '@repo/entity/src/auth';
import { headers } from 'next/headers';

export default class AuthNextAppRouteRepository implements AuthRepository {
  async getAuthorization(): Promise<string | null> {
    return (await headers()).get('authorization');
  }
  
  refreshAccessToken(): Promise<JWTTokens> {
    throw new Error('Method not implemented.');
  }
  socialSignIn(): Promise<JWTTokens> {
    throw new Error('Method not implemented.');
  }
  signIn(data: BaseRequestData<SignInData>): Promise<SignInResponse> {
    throw new Error('Method not implemented.');
  }
  signUp(data: BaseRequestData<unknown>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  resetPassword(data: BaseRequestData<ResetPasswordData>): Promise<ResetPasswordResponse> {
    throw new Error('Method not implemented.');
  }
  findPassword(data: BaseRequestData<{ email: string; }>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  validateResetPasswordToken(data: BaseRequestData<{ email: string; token: string; }>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  verifyEmailRequest(data: BaseRequestData<VerifyEmailRequestData>): Promise<VerifyEmailRequestResponse> {
    throw new Error('Method not implemented.');
  }
  verifyEmail(data: BaseRequestData<VerifyEmailData>): Promise<VerifyEmailResponse> {
    throw new Error('Method not implemented.');
  }
}
