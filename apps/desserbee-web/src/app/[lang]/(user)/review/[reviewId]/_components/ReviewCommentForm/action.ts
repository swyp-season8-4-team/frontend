'use server';

import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import ReviewService from '@repo/usecase/src/reviewService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { revalidatePathAction } from '@/actions/revalidatePathAction';
import { RouteGroup } from '@repo/entity/src/navigation';

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function createReviewComment(params: {
  reviewId: string;
  userId: string;
  content: string;
}) {
  try {
    await reviewService.createReply({
      id: params.reviewId,
      userId: params.userId,
      content: params.content,
    });

    await revalidatePathAction(RouteGroup.ReviewDetail, 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to create comment:', error);
    return { success: false, error };
  }
}
