import {
  type AuthRepository,
  type JWTRefreshTokens,
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

import { OAuthSocialProvider } from '@repo/entity/src/signIn';

import {
  NavigationLanguageGroup,
  NavigationPathGroup,
} from '@repo/entity/src/navigation';
import { type StorageRepository } from '@repo/entity/src/storage';

export enum VerifyEmailPurpose {
  SIGNUP = 'SIGNUP',
  RESET_PASSWORD = 'PASSWORD_RESET',
}

export enum SignUpStep {
  // EMAIL = 'email',
  // EMAIL_CODE = 'email-code',
  // PASSWORD = 'password',
  // GENDER = 'gender',
  // NICKNAME = 'nickname',
  // AGREE = 'agree',
  // TERMS_OF_SERVICE = 'terms-of-service',
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
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

  // ... existing code ...
  private getRedirectUri(provider: OAuthSocialProvider) {
    switch (provider) {
      case OAuthSocialProvider.KAKAO:
        return `${process.env.NEXT_PUBLIC_SOCIAL_REDIRECT_HOST}${NavigationLanguageGroup.ko}${NavigationPathGroup.OAuthCallback}${provider.toLowerCase()}`;

      case OAuthSocialProvider.APPLE:
        return `${process.env.NEXT_PUBLIC_SOCIAL_REDIRECT_HOST}${NavigationLanguageGroup.ko}${NavigationPathGroup.AppleOAuthCallback}`;

      default:
        throw new Error('Invalid provider');
    }
  }

  public getOAuthRedirectUri(provider: OAuthSocialProvider) {
    return this.getRedirectUri(provider);
  }

  getServerSideUrl(provider: OAuthSocialProvider, state?: string) {
    switch (provider) {
      case OAuthSocialProvider.KAKAO:
        // 카카오는 이 링크에서 로그인 후 성공하면 이동할 redirectUri까지 전달함, response_type=code
        return `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_SOCIAL_LOGIN_REST_API_KEY}&redirect_uri=${this.getRedirectUri(provider)}&state=${state}&response_type=code`;
      // return `${process.env.NEXT_PUBLIC_SERVICE_API_URL}/api/oauth2/authorization?provider=${provider}`;
      case OAuthSocialProvider.APPLE:
        // 애플은 SDK에서 버튼 클릭 처리하고, redirectUri도 거기에 입력
        throw new Error('Apple login uses JS SDK, not URL redirect.');

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

  async refreshAccessToken(
    refreshToken: string,
    deviceId?: string,
  ): Promise<JWTRefreshTokens> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.refreshAccessToken(
      refreshToken,
      deviceId,
    );

    return response;
  }

  async socialSignIn(data: OAuthSignInData): Promise<SignInResponse> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    switch (data.provider) {
      case OAuthSocialProvider.KAKAO:
        return this.authRepository.socialSignInWithKakao({ data });
      case OAuthSocialProvider.APPLE:
        return this.authRepository.socialSignInWithApple({ data });
      default:
        throw new Error(`Unsupported social login provider: ${data.provider}`);
    }
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

    if ('profileImage' in data && data.profileImage) {
      const response = await this.authRepository.signUpWithProfileImage({
        data,
        authorization: verificationToken,
      });
      return response;
    } else {
      const response = await this.authRepository.signUp({
        data,
        authorization: verificationToken,
      });
      return response;
    }
  }

  async signOut(authorization: string): Promise<void> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.signOut({
      data: { authorization },
    });

    return response;
  }

  async verifyEmail(data: VerifyEmailData): Promise<VerifyEmailResponse> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const response = await this.authRepository.verifyEmail({ data });

    return response;
  }

  async verifyEmailRequest(
    data: VerifyEmailRequestData,
  ): Promise<VerifyEmailRequestResponse> {
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
