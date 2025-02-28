import type {
  CreateOnelineReviewRequestFormData,
  CreateOnelineReviewResponse,
  ReviewRepository,
  StoreOnelineReivewData,
  StoreOnelineReivewRequest,
} from '@repo/entity/src/review';

export default class ReviewService {
  private readonly reviewRepository: ReviewRepository | null;

  constructor({ reviewRepository }: { reviewRepository: ReviewRepository }) {
    this.reviewRepository = reviewRepository ?? null;
  }

  async getStoreOnlineReviews(
    params: StoreOnelineReivewRequest,
  ): Promise<StoreOnelineReivewData[]> {
    if (!this.reviewRepository) {
      throw new Error('reviewRepository is not set');
    }

    try {
      const result = await this.reviewRepository.getStoreOnelineReviews({
        data: params,
      });
      console.log(`가게 한줄 리뷰 조회 완료 `);

      return result;
    } catch (error) {
      console.error(`가게 한줄 리뷰 조회 오류 발생 `, error);
      throw error;
    }
  }

  async createStoreOnlineReviews(
    params: CreateOnelineReviewRequestFormData,
  ): Promise<CreateOnelineReviewResponse[]> {
    if (!this.reviewRepository) {
      throw new Error('reviewRepository is not set');
    }

    try {
      const result = await this.reviewRepository.createOnelineReview({
        data: params,
      });
      console.log(`가게 한줄 리뷰 생성 완료 `);

      return result;
    } catch (error) {
      console.error(`가게 한줄 리뷰 생성 오류 발생 `, error);
      throw error;
    }
  }
}
