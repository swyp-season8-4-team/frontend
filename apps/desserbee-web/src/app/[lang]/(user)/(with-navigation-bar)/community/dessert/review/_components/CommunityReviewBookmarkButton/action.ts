'use server';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import ReviewService from '@repo/usecase/src/reviewService';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function saveReview({ reviewUuid }: { reviewUuid: string }) {
  return reviewService.save({ reviewUuid });
}

export async function cancelSave({ reviewUuid }: { reviewUuid: string }) {
  return reviewService.cancelSave({ reviewUuid });
}
