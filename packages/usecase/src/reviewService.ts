import type { ReviewRepository } from '@repo/entity/src/review';

export default class ReviewService {
  private readonly reviewRepository: ReviewRepository | null;

  constructor({ reviewRepository }: { reviewRepository: ReviewRepository }) {
    this.reviewRepository = reviewRepository ?? null;
  }
}
