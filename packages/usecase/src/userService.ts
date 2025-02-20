import type { AuthRepository } from '@repo/entity/src/auth';
import type { NicknameValidationRequestData, NicknameValidationResponse, TargetUser, User, UserRepository } from '@repo/entity/src/user';
import { decodeJWT } from '@repo/utility/src/jwt';

export default class UserService {
  private readonly authRepository: AuthRepository | null;
  private readonly userRepository: UserRepository | null;

  constructor({
    authRepository,
    userRepository,
  }: {
    authRepository?: AuthRepository;
    userRepository?: UserRepository;
  }) {
    this.authRepository = authRepository ?? null;
    this.userRepository = userRepository ?? null;
  }

  async getMe(): Promise<User> {
    if (!this.userRepository) {
      throw new Error('userRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const user = await this.userRepository.getMe({ authorization });

    return user;
  }

  async getTargetUser(id: string): Promise<TargetUser> {
    if (!this.userRepository) {
      throw new Error('userRepository is not set');
    }

    const response = await this.userRepository.getTarget({ data: { id } });

    return response;
  }

  async getUserID(): Promise<string> {
    if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authToken = await this.authRepository.getAuthorization();

    if (!authToken) {
      throw new Error('Authorization header is not found');
    }

    const { sub } = decodeJWT(authToken);

    return sub;
  }

  async validateNickname({ nickname, purpose }: NicknameValidationRequestData): Promise<NicknameValidationResponse> {
    if (!this.userRepository) {
      throw new Error('userRepository is not set');
    }

    const response = await this.userRepository.validateNickname({ data: { nickname, purpose } });

    return response;
  }
}
