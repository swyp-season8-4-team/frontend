import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository, JWTTokens, SignInData } from '@repo/entity/src/auth';

export default class AuthNextMiddlewareRepository implements AuthRepository {
  constructor(private readonly headers: Headers) {}
  
  async getAuthorization(): Promise<string | null> {
    return this.headers.get('authorization') ?? null;
  }

  refreshAccessToken(): Promise<JWTTokens> {
    throw new Error('Method not implemented.');
  }

  signIn(data: BaseRequestData<SignInData>): Promise<JWTTokens> {
    throw new Error('Method not implemented.');
  }
  signUp(data: BaseRequestData<unknown>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  resetPassword(data: BaseRequestData<{ email: string; }>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  findPassword(data: BaseRequestData<{ email: string; }>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  validateResetPasswordToken(data: BaseRequestData<{ email: string; token: string; }>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}
