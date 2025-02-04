import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { User, UserRepository } from '@repo/entity/src/user';
import type { RawUser } from '@repo/api/src/desserbee-web/user';
import fetch from '@repo/api/src/fetch';
import APIRepository from './apiRepository';

export default class UserAPIRepository extends APIRepository implements UserRepository {
  async addInfo({ authorization, data }: BaseRequestData<User>): Promise<User> {
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

    return response;
  }

  async get({ authorization }: BaseRequestData<void>): Promise<User> {
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

    return response;
  }

  async update({ authorization, data }: BaseRequestData<User>): Promise<void> {
    const url = `${this.endpoint}/users/me`;

    const response = await fetch<RawUser, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'PATCH',
      url,
    });

    return response;
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
}
