import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  Mate,
  MateAcceptRequest,
  MateAllListResponse,
  MateApplyRequest,
  MateCreateRequest,
  MateFireRequest,
  MateLeaveRequest,
  MateListRequest,
  MateRawAllListResponse,
  MateRejectRequest,
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

  async apply({ data }: BaseRequestData<MateApplyRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { mateId, userId } = data;

    const response = await fetch<MateApplyRequest, unknown>({
      data: {
        mateId,
        userId,
      },
      method: 'POST',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async leave({ data }: BaseRequestData<MateLeaveRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { userUuid } = data;

    const response = await fetch<MateLeaveRequest, unknown>({
      data: {
        userUuid,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/leave`,
    });

    return response;
  }

  async getMyTeamMembers({ data }: BaseRequestData<MateRequest>): Promise<Mate[]> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id } = data;
    
    const response = await fetch<void, RawMate[]>({
      method: 'GET',
      url: `${this.endpoint}/mates/${id}/members`,
    });

    return response.map((mate) => this.mateConverter.convertRawToMate(mate));
  }

  async getWaitList({ data }: BaseRequestData<MateRequest>): Promise<Mate[]> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id } = data;

    const response = await fetch<void, RawMate[]>({
      method: 'GET',
      url: `${this.endpoint}/mates/${id}/apply`,
    });

    return response.map((mate) => this.mateConverter.convertRawToMate(mate));
  }

  async acceptMyTeamMember({ data }: BaseRequestData<MateAcceptRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { userId, mateId } = data;

    const response = await fetch<{ userUuid: string }, unknown>({
      data: {
        userUuid: userId,
      },
      method: 'PATCH',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async rejectMyTeamMember({ data }: BaseRequestData<MateRejectRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { userId, mateId } = data;

    const response = await fetch<{ userUuid: string }, unknown>({
      data: {
        userUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async fireMyTeamMember({ data }: BaseRequestData<MateFireRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { creatorId, userId, mateId } = data;

    const response = await fetch<{ creatorUuid: string; targetUuid: string }, unknown>({
      data: {
        creatorUuid: creatorId,
        targetUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/${mateId}/members`,
    });

    return response;
  }

  async getMateList({ data }: BaseRequestData<MateListRequest>): Promise<MateAllListResponse> {
    if (!data) {
      throw new Error('data is required');
    }
    
    const { from, to } = data;

    const response = await fetch<MateListRequest, MateRawAllListResponse>({
      method: 'GET',
      url: `${this.endpoint}/mates`,
      query: {
        from: from.toString(),
        to: to.toString(),
      },
    });

    console.log(response);

    return {
      mates: response.mates.map((mate) => this.mateConverter.convertRawToMate(mate)),
      isLast: response.last,
    };
  }

  async getDetails({ data }: BaseRequestData<MateRequest>): Promise<Mate> {
    if (!data) {
      throw new Error('data is required');
    }

    const response = await fetch<MateRequest, RawMate>({
      method: 'GET',
      url: `${this.endpoint}/mates/${data.id}`,
    });

    return this.mateConverter.convertRawToMate(response);
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
