import type { AuthRepository } from '@repo/entity/src/auth';
import type { Review, ReviewListRequestData, ReviewListResponse, ReviewRepository, ReviewUpdateData } from '@repo/entity/src/review';

export default class ReviewService {
  private readonly authRepository: AuthRepository | null;
  private readonly reviewRepository: ReviewRepository | null;

  constructor({ authRepository, reviewRepository }: { authRepository?: AuthRepository, reviewRepository?: ReviewRepository }) {
    this.authRepository = authRepository ?? null;
    this.reviewRepository = reviewRepository ?? null;
  }

  async getDetail(data: ReviewUpdateData): Promise<Review> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.getDetail({ data, authorization });

    return response;
  }

  async getMine(data: unknown): Promise<unknown> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const response = await this.reviewRepository.getMine({ data });
    
    return response;
  }

  async edit(data: ReviewUpdateData): Promise<unknown> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const response = await this.reviewRepository.edit({ data });

    return response;
  }

  async delete(data: ReviewUpdateData): Promise<unknown> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const response = await this.reviewRepository.delete({ data });

    return response;
  }

  async getAll(data: ReviewListRequestData): Promise<ReviewListResponse> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.getAll({ data, authorization });

    return response;
  }
}