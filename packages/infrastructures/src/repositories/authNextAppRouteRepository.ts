import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository, JWTTokens, SignInData } from '@repo/entity/src/auth';
import { headers } from 'next/headers';

export default class AuthNextAppRouteRepository implements AuthRepository {
  async getAuthorization(): Promise<string | null> {
    return (await headers()).get('authorization');
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
}
