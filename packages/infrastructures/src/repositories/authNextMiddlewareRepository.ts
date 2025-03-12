import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  AuthRepository,
  OAuthSignInData,
  ResetPasswordData,
  ResetPasswordResponse,
  SignInData,
  SignInResponse,
  VerifyEmailData,
  VerifyEmailRequestData,
  VerifyEmailRequestResponse,
  VerifyEmailResponse,
  JWTRefreshTokens,
} from '@repo/entity/src/auth';

export default class AuthNextMiddlewareRepository implements AuthRepository {
  constructor(private readonly headers: Headers) {}
  socialSignIn(
    data: BaseRequestData<OAuthSignInData>,
  ): Promise<SignInResponse> {
    throw new Error('Method not implemented.');
  }

  async getAuthorization(): Promise<string | null> {
    return this.headers.get('authorization') ?? null;
  }

  verifyEmailRequest(
    data: BaseRequestData<VerifyEmailRequestData>,
  ): Promise<VerifyEmailRequestResponse> {
    throw new Error('Method not implemented.');
  }
  verifyEmail(
    data: BaseRequestData<VerifyEmailData>,
  ): Promise<VerifyEmailResponse> {
    throw new Error('Method not implemented.');
  }
  refreshAccessToken(refreshToken: string): Promise<JWTRefreshTokens> {
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
  resetPassword(
    data: BaseRequestData<ResetPasswordData>,
  ): Promise<ResetPasswordResponse> {
    throw new Error('Method not implemented.');
  }
  findPassword(data: BaseRequestData<{ email: string }>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  validateResetPasswordToken(
    data: BaseRequestData<{ email: string; token: string }>,
  ): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}
