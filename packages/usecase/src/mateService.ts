import type { AuthRepository } from '@repo/entity/src/auth';
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
  MateListRequest,
  MateRejectRequest,
  MateReplyRequest,
  MateRepository,
  MateRequest,
  MateSaveRequest,
  MateUpdateRequest,
  MateWriteRequest,
  SavedMateListResponse,
  MateLeaveRequest,
} from '@repo/entity/src/mate';

export default class MateService {
  private readonly authRepository: AuthRepository | null;
  private readonly mateRepository: MateRepository | null;

  constructor({
    authRepository,
    mateRepository,
  }: {
    authRepository?: AuthRepository;
    mateRepository?: MateRepository;
  }) {
    this.authRepository = authRepository ?? null;
    this.mateRepository = mateRepository ?? null;
  }

  async applyMate(data: MateApplyRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.applyMate({
      data,
      authorization,
    });

    return response;
  }

  async cancelApplyMate(data: MateApplyRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.cancelApplyMate({
      data,
      authorization,
    });

    return response;
  }

  async leave(data: MateLeaveRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.leave({ data, authorization });

    return response;
  }

  async fireMyTeamMember(data: MateFireRequest): Promise<unknown> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.fireMyTeamMember({
      data,
      authorization,
    });

    return response;
  }

  async getMateList(data: MateListRequest): Promise<MateAllListResponse> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.getMateList({
      data,
      authorization,
    });

    return response;
  }

  async getDetails(data: MateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.getDetails({
      authorization,
      data,
    });

    return response;
  }

  async getMyTeamMembers(data: MateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.getMyTeamMembers({
      data,
      authorization,
    });

    return response;
  }

  async getWaitList(data: MateRequest): Promise<Mate[]> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.getWaitList({
      data,
      authorization,
    });

    return response;
  }

  async create(data: MateCreateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.create({ data, authorization });

    return response;
  }

  async update(data: MateUpdateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.update({ data, authorization });

    return response;
  }

  async delete(data: MateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.delete({ data, authorization });

    return response;
  }

  async save(data: MateSaveRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.save({ data, authorization });

    return response;
  }

  async cancelSave(data: MateSaveRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.cancelSave({
      data,
      authorization,
    });

    return response;
  }

  async acceptMyTeamMember(data: MateAcceptRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.acceptMyTeamMember({
      data,
      authorization,
    });

    return response;
  }

  async rejectMyTeamMember(data: MateRejectRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.rejectMyTeamMember({
      data,
      authorization,
    });

    return response;
  }

  async write(data: MateWriteRequest): Promise<Mate> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.write({ data, authorization });

    return response;
  }

  async edit(data: MateEditRequest): Promise<Mate> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.edit({ data, authorization });

    return response as Mate;
  }

  async createReply(data: MateReplyRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.createReply({
      data,
      authorization,
    });

    return response;
  }

  async getReplyList(
    data: GetMateReplyListRequest,
  ): Promise<GetMateReplyListResponse> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.getReplyList({
      data,
      authorization,
    });

    return response;
  }

  async getSavedMateList(
    data: MateListRequest,
  ): Promise<SavedMateListResponse> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('mateRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.mateRepository.getSavedMateList({
      data,
      authorization,
    });

    return response;
  }
}
