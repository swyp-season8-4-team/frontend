import {
  OAuthSocialProvider,
  type AuthRepository,
  type JWTTokens,
  type OAuthSignInData,
  type SignInData,
  type SignUpData,
  type VerifyEmailData,
  type VerifyEmailRequestData,
  type VerifyEmailRequestResponse,
  type VerifyEmailResponse,
} from '@repo/entity/src/auth';
import { NavigationLanguageGroup, NavigationPathGroup } from '@repo/entity/src/navigation';

export enum VerifyEmailPurpose {
  SIGNUP = 'SIGNUP',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

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
    return `${process.env.NEXT_PUBLIC_APP_HOST}${NavigationLanguageGroup.ko}${NavigationPathGroup.OAuthCallback}${provider.toLowerCase()}`;
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

  async socialSignIn(data: OAuthSignInData): Promise<unknown> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.socialSignIn({ data });

    return response;
  }

  async signIn(data: SignInData): Promise<JWTTokens> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.signIn({ data });

    return response;
  }

  async signUp(data: SignUpData, verificationToken?: string): Promise<unknown> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    console.log('verificationToken', verificationToken);

    const response = await this.authRepository.signUp({ data, authorization: verificationToken });

    return response;
  }

  async verifyEmail(data: VerifyEmailData): Promise<VerifyEmailResponse> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.verifyEmail({ data });

    return response;
  }

  async verifyEmailRequest(data: VerifyEmailRequestData): Promise<VerifyEmailRequestResponse> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.verifyEmailRequest({ data });

    return response;
  }
}
