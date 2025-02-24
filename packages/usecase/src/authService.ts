import {
  OAuthSocialProvider,
  type AuthRepository,
  type JWTTokens,
  type OAuthSignInData,
  type ResetPasswordData,
  type ResetPasswordResponse,
  type SignInData,
  type SignInResponse,
  type SignUpData,
  type VerifyEmailData,
  type VerifyEmailRequestData,
  type VerifyEmailRequestResponse,
  type VerifyEmailResponse,
} from '@repo/entity/src/auth';
import { NavigationLanguageGroup, NavigationPathGroup } from '@repo/entity/src/navigation';
import { type StorageRepository } from '@repo/entity/src/storage';

export enum VerifyEmailPurpose {
  SIGNUP = 'SIGNUP',
  RESET_PASSWORD = 'PASSWORD_RESET',
}

export enum SignUpStep {
  EMAIL = 'email',
  EMAIL_CODE = 'email-code',
  PASSWORD = 'password',
  GENDER = 'gender',
  NICKNAME = 'nickname',
  AGREE = 'agree',
  TERMS_OF_SERVICE = 'terms-of-service',
}

export enum EmailAuthSessionKey {
  SIGNUP = 'authService-emailAuth-signup',
  RESET_PASSWORD = 'authService-emailAuth-resetPassword',
}

export interface EmailAuthSession {
  email: string;
  expirationTimes: number;
}

export default class AuthService {
  private readonly authRepository: AuthRepository | null = null;
  private readonly storageRepository: StorageRepository | null = null;  

  constructor({
    authRepository,
    storageRepository,
  }: {
    authRepository?: AuthRepository;
    storageRepository?: StorageRepository;
  }) {
    this.authRepository = authRepository ?? null;
    this.storageRepository = storageRepository ?? null;
  }

  private get signUpStepKey() {
    return 'authService-signUpStep';
  }

  private getRedirectUri(provider: OAuthSocialProvider) {
    return `${process.env.NEXT_PUBLIC_APP_HOST}${NavigationLanguageGroup.ko}${NavigationPathGroup.OAuthCallback}${provider.toLowerCase()}`;
  }

  getServerSideUrl(provider: OAuthSocialProvider, state?: string) {
    switch (provider) {
      case OAuthSocialProvider.KAKAO:
        // return `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${this.getRedirectUri(provider)}&state=${state}&response_type=code`;
        return `${process.env.NEXT_PUBLIC_SERVICE_API_URL}/api/oauth2/authorization?provider=${provider}`;
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

  async signIn(data: SignInData): Promise<SignInResponse> {
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

  async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.resetPassword({ data });

    return response;
  }

  getEmailAuthSession(key: EmailAuthSessionKey): EmailAuthSession | null {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    return this.storageRepository.get<EmailAuthSession>(key);
  }

  saveEmailAuthSession(key: EmailAuthSessionKey, value: EmailAuthSession) {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.set<EmailAuthSession>(key, value);
  }

  clearEmailAuthSession(key: EmailAuthSessionKey) {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.delete(key);
  }

  getSignUpStep() {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    return this.storageRepository.get<SignUpStep>(this.signUpStepKey);
  }

  setSignUpStep(value: SignUpStep) {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.set<SignUpStep>(this.signUpStepKey, value);
  }
}
