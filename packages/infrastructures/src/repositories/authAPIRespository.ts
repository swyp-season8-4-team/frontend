import { isServer } from '@repo/api';
import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository, JWTTokens } from '@repo/entity/src/auth';
import APIRepository from './apiRepository';

export default class AuthAPIRespository extends APIRepository implements AuthRepository {
  async resetPassword(data: BaseRequestData<{ email: string; }>): Promise<unknown> {
    const response = await fetch<void, void>({
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

  async signIn(data: BaseRequestData<unknown>): Promise<JWTTokens> {
    const response = await fetch<void, JWTTokens>({
      method: 'POST',
      url: `${this.endpoint}/auth/login`,
    });

    return response;
  }

  async signUp(data: BaseRequestData<unknown>): Promise<void> {
    const response = await fetch<void, void>({
      method: 'POST',
      url: `${this.endpoint}/auth/sign-up`,
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
      url: ``, // TODO:
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
