import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  GetMateReplyListRequest,
  GetMateReplyListResponse,
  Mate,
  MateAcceptRequest,
  MateAllListResponse,
  MateApplyRequest,
  MateCreateRequest,
  MateEditRequest,
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
  SavedMateListResponse,
} from '@repo/entity/src/mate';
import fetch from '@repo/api/src/fetch';
import APIRepository from './apiRepository';
import MateConverter from '../mappers/mateConverter';

export default class MateAPIRepository
  extends APIRepository
  implements MateRepository
{
  private readonly mateConverter: MateConverter = new MateConverter();

  async applyMate({
    data,
    authorization,
  }: BaseRequestData<MateApplyRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { mateId, userId } = data;

    const response = await fetch<RawMateApplyRequest, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid: userId,
      },
      method: 'POST',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async cancelApplyMate({
    data,
    authorization,
  }: BaseRequestData<MateApplyRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { mateId, userId } = data;

    const response = await fetch<RawMateApplyRequest, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async leave({
    data,
    authorization,
  }: BaseRequestData<MateLeaveRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { userUuid } = data;

    const response = await fetch<MateLeaveRequest, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/leave`,
    });

    return response;
  }

  async getMyTeamMembers({
    data,
    authorization,
  }: BaseRequestData<MateRequest>): Promise<Mate[]> {
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
      url: `${this.endpoint}/mates/${id}/members`,
    });

    return response.map((mate) => this.mateConverter.convertRawToMate(mate));
  }

  async getWaitList({
    data,
    authorization,
  }: BaseRequestData<MateRequest>): Promise<Mate[]> {
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

  async acceptMyTeamMember({
    data,
    authorization,
  }: BaseRequestData<MateAcceptRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { creatorUserId, userId, mateId } = data;

    const response = await fetch<RawMateAcceptRequest, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        creatorUserUuid: creatorUserId,
        acceptUserUuid: userId,
      },
      method: 'PATCH',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async rejectMyTeamMember({
    data,
    authorization,
  }: BaseRequestData<MateRejectRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { creatorUserId, userId, mateId } = data;

    const response = await fetch<RawMateRejectRequest, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        creatorUuid: creatorUserId,
        targetUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/${mateId}/apply`,
    });

    return response;
  }

  async fireMyTeamMember({
    data,
    authorization,
  }: BaseRequestData<MateFireRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { creatorId, userId, mateId } = data;

    const response = await fetch<
      { creatorUuid: string; targetUuid: string },
      unknown
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        creatorUuid: creatorId,
        targetUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/${mateId}/members`,
    });

    return response;
  }

  async getMateList({
    data,
    authorization,
  }: BaseRequestData<MateListRequest>): Promise<MateAllListResponse> {
    if (!data) {
      throw new Error('data is required');
    }

    const { from, to, mateCategoryId, keyword } = data;

    const response = await fetch<MateListRequest, MateRawAllListResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/mates`,
      query: {
        ...(typeof from === 'number' && { from: from.toString() }),
        ...(typeof to === 'number' && { to: to.toString() }),
        ...(mateCategoryId && {
          mateCategoryId: this.mateConverter
            .convertMateCategoryToId(mateCategoryId)
            .toString(),
        }),
        ...(keyword && { keyword: encodeURIComponent(keyword) }),
      },
    });

    return {
      mates: response.mates.map((mate) =>
        this.mateConverter.convertRawToMate(mate),
      ),
      isLast: response.last,
    };
  }

  async getDetails({
    data,
    authorization,
  }: BaseRequestData<MateRequest>): Promise<Mate> {
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

  async create({
    data,
    authorization,
  }: BaseRequestData<MateCreateRequest>): Promise<Mate> {
    if (!data) {
      throw new Error('data is required');
    }

    console.log('data', data);

    const response = await fetch<MateCreateRequest, RawMate>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'POST',
      url: `${this.endpoint}/mates`,
    });

    return this.mateConverter.convertRawToMate(response);
  }

  async delete({
    data,
    authorization,
  }: BaseRequestData<MateRequest>): Promise<void> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id } = data;

    const response = await fetch<MateRequest, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'DELETE',
      url: `${this.endpoint}/mates/${id}`,
    });

    return response;
  }

  async update({
    data,
    authorization,
  }: BaseRequestData<MateUpdateRequest>): Promise<void> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, ...rest } = data;

    const response = await fetch<Omit<MateUpdateRequest, 'id'>, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: rest,
      method: 'PATCH',
      url: `${this.endpoint}/mates/${id}`,
    });

    return response;
  }

  async save({
    data,
    authorization,
  }: BaseRequestData<MateSaveRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, userId } = data;

    const response = await fetch<{ userUuid: string }, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid: userId,
      },
      method: 'POST',
      url: `${this.endpoint}/mates/saved/${id}`,
    });

    return response;
  }

  async cancelSave({
    data,
    authorization,
  }: BaseRequestData<MateSaveRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, userId } = data;

    const response = await fetch<{ userUuid: string }, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/saved/${id}`,
    });

    return response;
  }

  async createReply({
    data,
    authorization,
  }: BaseRequestData<MateReplyRequest>): Promise<MateReply> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, userId, content } = data;

    const response = await fetch<RawMateReplyRequest, RawMateReply>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid: userId,
        content,
      },
      method: 'POST',
      url: `${this.endpoint}/mates/${id}/reply`,
    });

    return this.mateConverter.convertRawToMateReply(response);
  }

  async deleteReply({
    data,
    authorization,
  }: BaseRequestData<
    Omit<MateReplyUpdateRequest, 'content'>
  >): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, userId, replyId } = data;

    const response = await fetch<{ userUuid: string }, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid: userId,
      },
      method: 'DELETE',
      url: `${this.endpoint}/mates/${id}/reply/${replyId}`,
    });

    return response;
  }

  async editReply({
    data,
    authorization,
  }: BaseRequestData<MateReplyUpdateRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, userId, content, replyId } = data;

    const response = await fetch<RawMateReplyRequest, unknown>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: {
        userUuid: userId,
        content,
      },
      method: 'PATCH',
      url: `${this.endpoint}/mates/${id}/reply/${replyId}`,
    });

    return response;
  }

  async getReply({
    data,
    authorization,
  }: BaseRequestData<MateReplyUpdateRequest>): Promise<MateReply> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, replyId } = data;

    const response = await fetch<RawMateReplyRequest, RawMateReply>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/mates/${id}/reply/${replyId}`,
    });

    return this.mateConverter.convertRawToMateReply(response);
  }

  async getReplyList({
    data,
    authorization,
  }: BaseRequestData<GetMateReplyListRequest>): Promise<GetMateReplyListResponse> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, from, to } = data;

    const response = await fetch<
      GetMateReplyListRequest,
      RawGetMateReplyListResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/mates/${id}/reply`,
      query: {
        ...(from && { from: from.toString() }),
        ...(to && { to: to.toString() }),
      },
    });
    return {
      replyList: response.mateReplies.map((reply) =>
        this.mateConverter.convertRawToMateReply(reply),
      ),
      isLast: response.last,
    };
  }

  async getSavedMateList({
    data,
    authorization,
  }: BaseRequestData<MateListRequest>): Promise<SavedMateListResponse> {
    if (!data) {
      throw new Error('data is required');
    }

    const { from, to } = data;

    const response = await fetch<MateListRequest, SavedMateListResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/mates/saved`,
      query: {
        ...(from && { from: from.toString() }),
        ...(to && { to: to.toString() }),
      },
    });

    return response;
  }

  async write({
    data,
    authorization,
  }: BaseRequestData<MateWriteRequest>): Promise<Mate> {
    if (!data) {
      throw new Error('data is required');
    }

    const { mateImage, ...rest } = data;

    const formData = new FormData();

    // request 필드에 JSON 데이터 추가
    const requestData = {
      userUuid: rest.userUuid,
      title: rest.title,
      content: rest.content,
      recruitYn: rest.recruitYn,
      mateCategoryId: rest.mateCategoryId,
      capacity: rest.capacity,
      ...(rest.storeId && { storeId: rest.storeId }),
      ...(rest.place && { place: rest.place }),
    };

    // JSON 데이터를 문자열로 변환하여 FormData에 추가
    formData.append(
      'request',
      new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
    );

    if (!!mateImage) {
      formData.append('mateImage', mateImage);
    }

    const response = await fetch<RawMateWriteReuqest, RawMate>({
      method: 'POST',
      url: `${this.endpoint}/mates`,
      headers: {
        ...(authorization && { Authorization: authorization }),
        'Content-Type': 'multipart/form-data',
      },
      formData,
    });

    return this.mateConverter.convertRawToMate(response);
  }

  async edit({
    data,
    authorization,
  }: BaseRequestData<MateEditRequest>): Promise<Mate> {
    if (!data) {
      throw new Error('data is required');
    }

    const { id, ...rest } = data;

    const {
      title,
      content,
      recruitYn,
      mateCategoryId,
      capacity,
      storeId,
      mateImage,
    } = rest;

    const formData = new FormData();

    const requestData = {
      title,
      content,
      recruitYn,
      mateCategoryId,
      capacity,
      storeId,
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
    );

    if (!!mateImage) {
      formData.append('mateImage', mateImage);
    }

    const response = await fetch<RawMateWriteReuqest, RawMate>({
      method: 'PATCH',
      url: `${this.endpoint}/mates/${id}`,
      headers: {
        ...(authorization && { Authorization: authorization }),
        'Content-Type': 'multipart/form-data',
      },
      formData,
    });

    return this.mateConverter.convertRawToMate(response);
  }
}
