'use server';

import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import ReviewService from '@repo/usecase/src/reviewService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function deleteReviewPost(reviewId: string) {
  try {
    await reviewService.delete({
      id: reviewId,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete review post:', error);
    return { success: false, error };
  }
}
