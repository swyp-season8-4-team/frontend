import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  Mate,
  MateCreateRequest,
  MateRepository,
  MateRequest,
  MateUpdateRequest,
  RawMate,
} from '@repo/entity/src/mate';
import fetch from '@repo/api/src/fetch';
import APIRepository from './apiRepository';
import MateConverter from '../mappers/mateConverter';

export default class MateAPIRepository
  extends APIRepository
  implements MateRepository
{
  private readonly mateConverter: MateConverter = new MateConverter();

  async getDetails({ data }: BaseRequestData<MateRequest>): Promise<Mate[]> {
    if (!data) {
      throw new Error('data is required');
    }

    const response = await fetch<MateRequest, RawMate[]>({
      method: 'GET',
      url: `${this.endpoint}/mates/${data.id}`,
    });

    return response.map((mate) => this.mateConverter.convertRawToMate(mate));
  }

  async create({ data }: BaseRequestData<MateCreateRequest>): Promise<Mate> {
    if (!data) {
      throw new Error('data is required');
    }

    const response = await fetch<MateCreateRequest, RawMate>({
      data,
      method: 'POST',
      url: `${this.endpoint}/mates`,
    });

    return this.mateConverter.convertRawToMate(response);
  }

  async delete({ data }: BaseRequestData<MateRequest>): Promise<void> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id } = data;

    const response = await fetch<MateRequest, void>({
      method: 'DELETE',
      url: `${this.endpoint}/mates/${id}`,
    });

    return response;
  }

  async update({ data }: BaseRequestData<MateUpdateRequest>): Promise<void> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, ...rest } = data;

    const response = await fetch<Omit<MateUpdateRequest, 'id'>, void>({
      data: rest,
      method: 'PATCH',
      url: `${this.endpoint}/mates/${id}`,
    });

    return response;
  }
}
