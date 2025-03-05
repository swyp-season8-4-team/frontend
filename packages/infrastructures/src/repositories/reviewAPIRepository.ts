import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  ReviewRepository,
  ReviewUpdateData,
} from '@repo/entity/src/review';
import APIRepository from './apiRepository';

export default class ReviewAPIRepository
  extends APIRepository
  implements ReviewRepository
{
  async getMine(data: BaseRequestData<unknown>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const url = `${this.endpoint}/reviews/me`;

    const response = await fetch<unknown, unknown>({
      method: 'GET',
      url: url,
    });

    return response;
  }

  async edit({ data }: BaseRequestData<ReviewUpdateData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id } = data;

    const url = `${this.endpoint}/reviews/${id}`;

    const response = await fetch<unknown, unknown>({
      method: 'PATCH',
      url: url,
    });

    return response;
  }

  async delete({ data }: BaseRequestData<ReviewUpdateData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id } = data;

    const url = `${this.endpoint}/reviews/${id}`;

    const response = await fetch<unknown, unknown>({
      method: 'DELETE',
      url: url,
    });

    return response;
  }

  async getAll(data: BaseRequestData<unknown>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const url = `${this.endpoint}/reviews`;

    const response = await fetch<unknown, unknown>({
      method: 'GET',
      url: url,
    });

    return response;
  }
}
