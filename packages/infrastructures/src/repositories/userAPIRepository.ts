import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { NicknameValidationRequestData, NicknameValidationResponse, PreferencesRequestData, TargetUser, User, UserRepository } from '@repo/entity/src/user';
import type { RawUser } from '@repo/api/src/desserbee-web/user';
import fetch from '@repo/api/src/fetch';
import APIRepository from './apiRepository';
import UserConverter from '../mappers/userConverter';

export default class UserAPIRepository extends APIRepository implements UserRepository {
  private readonly userConverter: UserConverter = new UserConverter();
  
  async addInfo({ authorization, data }: BaseRequestData<User>): Promise<User> {
    if (!data) {
      throw new Error('data is required');
    }

    const url = `${this.endpoint}/users/add-info`;

    const response = await fetch<void, RawUser>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'POST',
      url,
    });

    return this.userConverter.convertRawToUser(response);
  }

  async getMe({ authorization }: BaseRequestData<void>): Promise<User> {
    const url = `${this.endpoint}/users/me`;

    const response = await fetch<void, RawUser>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url,
    });

    return this.userConverter.convertRawToUser(response);
  }

  async updateMe({ authorization, data }: BaseRequestData<User>): Promise<User> {
    if (!data) {
      throw new Error('data is required');
    }

    const response = await fetch<RawUser, RawUser>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: this.userConverter.convertUserToRaw(data),
      method: 'PATCH',
      url: `${this.endpoint}/users/me`,
    });

    return this.userConverter.convertRawToUser(response);
  }

  async getTarget({ authorization, data }: BaseRequestData<{ id: string; }>): Promise<TargetUser> {
    if (!data) {
      throw new Error('data is required');
    }
    const url = `${this.endpoint}/users/${data.id}`;

    const response = await fetch<void, TargetUser>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url,
    });

    return response;
  }

  uploadProfileImage(data: BaseRequestData<{ image: File; }>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete({ authorization, data }: BaseRequestData<void>): Promise<void> {
    const url = `${this.endpoint}/users/me`;

    const response = await fetch<void, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'DELETE',
      url,
    });
  }

  async validateNickname({ data }: BaseRequestData<NicknameValidationRequestData>): Promise<NicknameValidationResponse> {
    if (!data) {
      throw new Error('data is required');
    }

    const url = `${this.endpoint}/users/validate/nickname`;

    const response = await fetch<NicknameValidationRequestData, NicknameValidationResponse>({
      data,
      method: 'POST',
      url,
    });

    return response;
  }
}
