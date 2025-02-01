import {
  OAuthSocialProvider,
  type AuthRepository,
  type JWTTokens,
  type SignInData,
} from '@repo/entity/src/auth';
import { NavigationPathGroup } from '@repo/entity/src/navigation';
export default class AuthService {
  private readonly authRepository: AuthRepository | null = null;

  constructor({
    authRepository,
  }: {
    authRepository?: AuthRepository;
  }) {
    this.authRepository = authRepository ?? null;
  }

  private getRedirectUri(provider: OAuthSocialProvider) {
    return `${process.env.NEXT_PUBLIC_APP_HOST}${NavigationPathGroup.OAuthCallback}${provider.toLowerCase()}`;
  }

  getServerSideUrl(provider: OAuthSocialProvider, state?: string) {
    switch (provider) {
      case OAuthSocialProvider.KAKAO:
        return `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${this.getRedirectUri(provider)}&state=${state}&response_type=code`;
      default:
        throw new Error('Invalid provider');
    }
  }

  async getAuthorization(accessToken?: string): Promise<string | null> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.getAuthorization(accessToken);

    return response;
  }

  async refreshAccessToken(refreshToken: string): Promise<JWTTokens> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.refreshAccessToken(refreshToken);

    return response;
  }

  async signIn({ email, password }: SignInData): Promise<JWTTokens> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.signIn({});

    return response;
  }

  async signUp(): Promise<void> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.signUp({});

    return response;
  }
}
