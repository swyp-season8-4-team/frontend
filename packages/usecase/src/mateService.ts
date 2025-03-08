import type { AuthRepository } from '@repo/entity/src/auth';
import type {
  GetMateReplyListRequest,
  GetMateReplyListResponse,
  Mate,
  MateAcceptRequest,
  MateAllListResponse,
  MateApplyRequest,
  MateCreateRequest,
  MateFireRequest,
  MateListRequest,
  MateRejectRequest,
  MateReplyRequest,
  MateRepository,
  MateRequest,
  MateSaveRequest,
  MateUpdateRequest,
  MateWriteRequest,
  RawMate,
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

    const response = await this.mateRepository.applyMate({ data });

    return response;
  }

  async cancelApplyMate(data: MateApplyRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.cancelApplyMate({ data });

    return response;
  }

  async fireMyTeamMember(data: MateFireRequest): Promise<unknown> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.fireMyTeamMember({ data });

    return response;
  }

  async getMateList(data: MateListRequest): Promise<MateAllListResponse> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.getMateList({ data });

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

    const response = await this.mateRepository.getMyTeamMembers({ data });

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

    const response = await this.mateRepository.create({ data });

    return response;
  }

  async update(data: MateUpdateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.update({ data });

    return response;
  }

  async delete(data: MateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.delete({ data });

    return response;
  }

  async save(data: MateSaveRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.save({ data });

    return response;
  }

  async cancelSave(data: MateSaveRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.cancelSave({ data });

    return response;
  }

  async acceptMyTeamMember(data: MateAcceptRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.acceptMyTeamMember({ data });

    return response;
  }

  async rejectMyTeamMember(data: MateRejectRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.rejectMyTeamMember({ data });

    return response;
  }

  async write(data: MateWriteRequest, isNew: boolean): Promise<Mate> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.write({ data, method: isNew ? 'POST' : 'PATCH' });

    return response;
  }

  async createReply(data: MateReplyRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.createReply({ data });

    return response;
  }

  async getReplyList(
    data: GetMateReplyListRequest,
  ): Promise<GetMateReplyListResponse> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.getReplyList({ data });

    return response;
  }

  async getSavedMateList(data: MateListRequest): Promise<Mate[]> {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.getSavedMateList({ data });

    return response;
  }
}
