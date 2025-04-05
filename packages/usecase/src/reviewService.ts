import type { AuthRepository } from '@repo/entity/src/auth';
import type { CommunityDessertReviewCategory } from '@repo/entity/src/community';
import type {
  CancelSaveRequest,
  GetReviewReplyListRequest,
  GetReviewReplyListResponse,
  Review,
  ReviewListRequestData,
  ReviewListResponse,
  ReviewReply,
  ReviewReplyRequest,
  ReviewRepository,
  ReviewUpdateData,
  ReviewWriteData,
  SavedReviewListRequest,
  SavedReviewListResponse,
  SaveReviewRequest,
  SaveReviewResponse,
} from '@repo/entity/src/review';

export default class ReviewService {
  private readonly authRepository: AuthRepository | null;
  private readonly reviewRepository: ReviewRepository | null;

  constructor({
    authRepository,
    reviewRepository,
  }: {
    authRepository?: AuthRepository;
    reviewRepository?: ReviewRepository;
  }) {
    this.authRepository = authRepository ?? null;
    this.reviewRepository = reviewRepository ?? null;
  }

  get categories(): CommunityDessertReviewCategory[] {
    return [
      '입터짐 조심',
      '신상템 추천',
      '세일 정보',
      '웰시 디저트',
      '내돈내산',
      '핫플레이스',
    ];
  }

  async getDetail(data: ReviewUpdateData): Promise<Review> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.getDetail({
      data,
      authorization,
    });

    return response;
  }

  async getMine(data: unknown): Promise<unknown> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const response = await this.reviewRepository.getMine({ data });

    return response;
  }

  async createReply(data: ReviewReplyRequest): Promise<ReviewReply> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.createReply({
      data,
      authorization,
    });

    return response;
  }

  async getReplyList(
    data: GetReviewReplyListRequest,
  ): Promise<GetReviewReplyListResponse> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const response = await this.reviewRepository.getReplyList({ data });

    return response;
  }

  async write(data: ReviewWriteData): Promise<Review> {
    if (!this.reviewRepository) {
      throw new Error('reviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.write({ data, authorization });

    return response;
  }

  async edit(data: ReviewUpdateData & ReviewWriteData): Promise<unknown> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.edit({ data, authorization });

    return response;
  }

  async delete(data: ReviewUpdateData): Promise<unknown> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.delete({
      data,
      authorization,
    });

    return response;
  }

  async getAll(data: ReviewListRequestData): Promise<ReviewListResponse> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.getAll({
      data,
      authorization,
    });

    return response;
  }

  async save(data: SaveReviewRequest): Promise<SaveReviewResponse> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.save({
      data,
      authorization,
    });

    return response;
  }

  async cancelSave(data: CancelSaveRequest): Promise<void> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.cancelSave({
      data,
      authorization,
    });

    return response;
  }

  async getSaved(
    data: SavedReviewListRequest,
  ): Promise<SavedReviewListResponse> {
    if (!this.reviewRepository) {
      throw new Error('ReviewRepository is not set');
    }

    const authorization = await this.authRepository?.getAuthorization();
    const response = await this.reviewRepository.getSaved({
      data,
      authorization,
    });

    return response;
  }
}
