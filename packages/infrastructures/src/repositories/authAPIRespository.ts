import { isServer } from '@repo/api';
import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository, JWTTokens } from '@repo/entity/src/auth';

export default class AuthAPIRespository implements AuthRepository {
  async refreshAccessToken(refreshToken: string): Promise<JWTTokens> {
    if (!isServer) {
      // 서버 사이드에서만 refreshToken 접근 가능
      throw new Error('This method is only available on the server side.');
    }

    const response = await fetch<{ refreshToken: string }, JWTTokens>({
      data: { refreshToken },
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

  signIn(data: BaseRequestData<unknown>): Promise<JWTTokens> {
    throw new Error('Method not implemented.');
  }
  signUp(data: BaseRequestData<unknown>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
