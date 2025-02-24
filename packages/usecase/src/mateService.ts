import type { MateAllListResponse, MateCreateRequest, MateListRequest, MateRepository, MateRequest, MateUpdateRequest } from "@repo/entity/src/mate";

export default class MateService {
  private readonly mateRepository: MateRepository | null;
  
  constructor({ mateRepository }: { mateRepository: MateRepository }) {
    this.mateRepository = mateRepository ?? null;
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

    const response = await this.mateRepository.getDetails({ data});

    return response;
  }

  async getMyTeamMembers(data: MateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.getMyTeamMembers({ data });

    return response;
  }

  async getWaitList(data: MateRequest) {
    if (!this.mateRepository) {
      throw new Error('mateRepository is not set');
    }

    const response = await this.mateRepository.getWaitList({ data });

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
}
