import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  AuthRepository,
  JWTRefreshTokens,
  OAuthSignInData,
  RawSignInResponse,
  ResetPasswordData,
  ResetPasswordResponse,
  SignInData,
  SignInResponse,
  SignOutData,
  VerifyEmailData,
  VerifyEmailRequestData,
  VerifyEmailRequestResponse,
  VerifyEmailResponse,
  SignUpData,
} from '@repo/entity/src/auth';
import AuthConverter from '../mappers/authConverter';
import APIRepository from './apiRepository';

export default class AuthDevAPIRepository
  extends APIRepository
  implements AuthRepository
{
  private readonly authConverter = new AuthConverter();

  async signIn({ data }: BaseRequestData<SignInData>): Promise<SignInResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { email, password, keepLoggedIn } = data;

    const response = await fetch<SignInData, RawSignInResponse>({
      data: {
        email,
        password,
        keepLoggedIn,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/dev/login`,
    });

    return this.authConverter.convertRawSignInResponse(response);
  }

  refreshAccessToken(refreshToken: string): Promise<JWTRefreshTokens> {
    throw new Error('Method not implemented.');
  }
  socialSignIn(
    data: BaseRequestData<OAuthSignInData>,
  ): Promise<SignInResponse> {
    throw new Error('Method not implemented.');
  }

  async signUp(data: BaseRequestData<unknown>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  signOut(data: BaseRequestData<SignOutData>): Promise<void> {
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
  getAuthorization(accessToken?: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }

  async signUpWithProfileImage({
    data,
    authorization,
  }: BaseRequestData<SignUpData>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}
