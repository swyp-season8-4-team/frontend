import type {
  AuthRepository,
  JWTTokens,
  SignInData,
} from '@repo/entity/src/auth';

export default class AuthService {
  private readonly authRepository: AuthRepository | null = null;

  constructor({
    authRepository,
  }: {
    authRepository?: AuthRepository;
  }) {
    this.authRepository = authRepository ?? null;
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
