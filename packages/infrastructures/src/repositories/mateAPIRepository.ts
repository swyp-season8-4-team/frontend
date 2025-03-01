import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  GetMateReplyListRequest,
  GetMateReplyListResponse,
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
  MateReply,
  MateReplyRequest,
  MateReplyUpdateRequest,
  MateRepository,
  MateRequest,
  MateSaveRequest,
  MateUpdateRequest,
  MateWriteRequest,
  RawGetMateReplyListResponse,
  RawMate,
  RawMateAcceptRequest,
  RawMateApplyRequest,
  RawMateRejectRequest,
  RawMateReply,
  RawMateReplyRequest,
  RawMateWriteReuqest,
} from '@repo/entity/src/mate';
import fetch from '@repo/api/src/fetch';
import APIRepository from './apiRepository';
import MateConverter from '../mappers/mateConverter';

export default class MateAPIRepository
  extends APIRepository
  implements MateRepository
{
  private readonly mateConverter: MateConverter = new MateConverter();

  async applyMate({ data }: BaseRequestData<MateApplyRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { mateId, userId } = data;

    const response = await fetch<RawMateApplyRequest, unknown>({
      data: {
        userUuid: userId,
      },
      method: 'POST',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async cancelApplyMate({ data }: BaseRequestData<MateApplyRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }
    
    const { mateId, userId } = data;

    const response = await fetch<RawMateApplyRequest, unknown>({
      data: {
        userUuid: userId,
      },
      method: 'DELETE',
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

  async getWaitList({ data, authorization }: BaseRequestData<MateRequest>): Promise<Mate[]> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id } = data;

    const response = await fetch<void, RawMate[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/mates/${id}/pending`,
    });

    return response.map((mate) => this.mateConverter.convertRawToMate(mate));
  }

  async acceptMyTeamMember({ data }: BaseRequestData<MateAcceptRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { creatorUserId, userId, mateId } = data;

    const response = await fetch<RawMateAcceptRequest, unknown>({
      data: {
        creatorUuid: creatorUserId,
        targetUuid: userId,
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

    const { creatorUserId, userId, mateId } = data;

    const response = await fetch<RawMateRejectRequest, unknown>({
      data: {
        creatorUuid: creatorUserId,
        targetUuid: userId,
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

    return {
      mates: response.mates.map((mate) => this.mateConverter.convertRawToMate(mate)),
      isLast: response.last,
    };
  }

  async getDetails({ data, authorization }: BaseRequestData<MateRequest>): Promise<Mate> {
    if (!data) {
      throw new Error('data is required');
    }

    const response = await fetch<MateRequest, RawMate>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
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

  async save({ data }: BaseRequestData<MateSaveRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }
    
    const { id, userId } = data;

    const response = await fetch<{ userUuid: string }, unknown>({
      data: {
        userUuid: userId,
      },
      method: 'PATCH',
      url: `${this.endpoint}/saved/${id}`,
    });

    return response;
  }

  async createReply({ data }: BaseRequestData<MateReplyRequest>): Promise<MateReply> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, userId, content } = data;

    const response = await fetch<RawMateReplyRequest, RawMateReply>({
      data: {
        userUuid: userId,
        content,
      },
      method: 'POST',
      url: `${this.endpoint}/mates/${id}/reply`,
    });

    return this.mateConverter.convertRawToMateReply(response);
  }

  async deleteReply({ data }: BaseRequestData<Omit<MateReplyUpdateRequest, 'content'>>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }
    
    const { id, userId, replyId } = data;

    const response = await fetch<{ userUuid: string }, unknown>({
      data: {
        userUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/${id}/reply/${replyId}`,
    });

    return response;
  }

  async editReply({ data }: BaseRequestData<MateReplyUpdateRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }
    
    const { id, userId, content, replyId } = data;

    const response = await fetch<RawMateReplyRequest, unknown>({
      data: {
        userUuid: userId,
        content,
      },
      method: 'PATCH',
      url: `${this.endpoint}/mates/${id}/reply/${replyId}`,
    });

    return response;
  }

  async getReply({ data }: BaseRequestData<MateReplyUpdateRequest>): Promise<MateReply> {
    if (!data) {
      throw new Error('data is required');
    }
    
    const { id, replyId } = data;

    const response = await fetch<RawMateReplyRequest, RawMateReply>({
      method: 'GET',
      url: `${this.endpoint}/mates/${id}/reply/${replyId}`,
    });

    return this.mateConverter.convertRawToMateReply(response);
  }

  async getReplyList({ data }: BaseRequestData<GetMateReplyListRequest>): Promise<GetMateReplyListResponse> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, from, to } = data;

    const response = await fetch<GetMateReplyListRequest, RawGetMateReplyListResponse>({
      method: 'GET',
      url: `${this.endpoint}/mates/${id}/reply`,
      query: {
        from: from.toString(),
        to: to.toString(),
      },
    });

    return {
      replyList: response.mates.map((reply) => this.mateConverter.convertRawToMateReply(reply)),
      isLast: response.isLast,
    }
  }

  async getSavedMateList({ data }: BaseRequestData<MateListRequest>): Promise<Mate[]> {
    if (!data) {
      throw new Error('data is required');
    }
    
    const { from, to } = data;

    const response = await fetch<MateListRequest, RawMate[]>({
      method: 'GET',
      url: `${this.endpoint}/mates/saved`,
      query: {
        from: from.toString(),
        to: to.toString(),
      }
    });
    
    return response.map((mate) => this.mateConverter.convertRawToMate(mate));
  }

  async write({ data, method }: BaseRequestData<MateWriteRequest>): Promise<Mate> {
    if (!data) {
      throw new Error('data is required');
    }

    if (!method) {
      throw new Error('method is required');
    }

    const { imageFile, ...rest } = data;

    const formData = new FormData();

    // request 필드에 JSON 데이터 추가
    const requestData = {
      userUuid: rest.userId,
      title: rest.title,
      content: rest.content,
      recruitYn: rest.recruit,
      mateCategoryId: rest.mateCategoryId,
      place: rest.place
    };
    
    // JSON 데이터를 문자열로 변환하여 FormData에 추가
    formData.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

    if (!!imageFile) { 
      formData.append('mateImage', imageFile);
    }

    const response = await fetch<RawMateWriteReuqest, RawMate>({
      method,
      url: `${this.endpoint}/mates`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      formData
    });

    return this.mateConverter.convertRawToMate(response);
  }
}
