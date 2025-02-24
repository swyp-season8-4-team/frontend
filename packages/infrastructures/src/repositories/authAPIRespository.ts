import { isServer } from '@repo/api';
import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository, JWTTokens, OAuthSignInData, ResetPasswordData, ResetPasswordResponse, SignInData, SignInResponse, SignUpData, VerifyEmailData, VerifyEmailRequestData, VerifyEmailRequestResponse, VerifyEmailResponse } from '@repo/entity/src/auth';
import APIRepository from './apiRepository';

export default class AuthAPIRespository extends APIRepository implements AuthRepository {
  async socialSignIn({ data }: BaseRequestData<OAuthSignInData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { provider } = data;

    const response = await fetch<OAuthSignInData, unknown>({
      method: 'GET',
      url: `${this.endpoint}/oauth2/authorization?provider=${provider}`,
    });

    return response;
  }

  async resetPassword({ data }: BaseRequestData<ResetPasswordData>): Promise<ResetPasswordResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const response = await fetch<ResetPasswordData, ResetPasswordResponse>({
      data,
      method: 'POST',
      url: `${this.endpoint}/auth/password/reset`,
    });

    return response;
  }

  async findPassword(data: BaseRequestData<{ email: string; }>): Promise<unknown> {
    const response = await fetch<void, void>({
      method: 'POST',
      url: `${this.endpoint}/auth/password/reset/request`,
    });

    return response;
  }

  async validateResetPasswordToken(data: BaseRequestData<{ email: string; token: string; }>): Promise<unknown> {
    const response = await fetch<void, JWTTokens>({
      method: 'POST',
      url: `${this.endpoint}/auth/password/reset/validate`,
    });

    return response;
  }

  async signIn({ data }: BaseRequestData<SignInData>): Promise<SignInResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { email, password, keepLoggedIn } = data;

    const response = await fetch<SignInData, any>({
      data: {
        email,
        password,
        keepLoggedIn
      },
      method: 'POST',
      url: `${this.endpoint}/auth/login`,
    });

    console.log(response);

    return response;
  }

  async signUp({ data, authorization }: BaseRequestData<SignUpData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not exist');
    }

    if (!authorization) {
      throw new Error('authorization is not exist');
    }

    const { email, password, confirmPassword, nickname, gender } = data;

    const response = await fetch<SignUpData, unknown>({
      headers: {
        'X-Email-Verification-Token': authorization as string,
      },
      data: {
        email,
        password,
        confirmPassword,
        nickname,
        gender,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/signup`,
    });

    return response;
  }

  async signOut(): Promise<void> {
    const response = await fetch<void, void>({
      method: 'POST',
      url: `${this.endpoint}/auth/logout`,
    });

    return response;
  }

  async verifyEmail({ data }: BaseRequestData<VerifyEmailData>): Promise<VerifyEmailResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { email, code, purpose } = data;

    const response = await fetch<VerifyEmailData, VerifyEmailResponse>({
      data: {
        email,
        code,
        purpose,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/email/verify`,
    });

    return response;
  }


  async verifyEmailRequest({ data }: BaseRequestData<VerifyEmailRequestData>): Promise<VerifyEmailRequestResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { email, purpose } = data;

    const response = await fetch<VerifyEmailRequestData, VerifyEmailRequestResponse>({
      data: {
        email,
        purpose,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/email/verification-request`,
    });

    return response;
  }

  async refreshAccessToken(refreshToken: string): Promise<JWTTokens> {
    if (!isServer) {
      // 서버 사이드에서만 refreshToken 접근 가능
      throw new Error('This method is only available on the server side.');
    }

    const response = await fetch<{ refreshToken: string }, JWTTokens>({
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/token/refresh`,
    });

    return response;
  }

  async getAuthorization(accessToken?: string): Promise<string> {
    if (!accessToken) {
      throw new Error('accessToken is not exist');
    }

    if (!isServer) {
      // 서버 사이드에서만 인증 접근 가능
      throw new Error('This method is only available on the server side.');
    }

    const response = await fetch<void, string>({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
      url: ``, // TODO:
    });

    return response;
  }
}
