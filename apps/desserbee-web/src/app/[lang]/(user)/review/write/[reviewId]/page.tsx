import type { WithParams } from '@/app';
import ReviewWriteForm from '../_components/ReviewWriteForm';
import { notFound } from 'next/navigation';
import ReviewService from '@repo/usecase/src/reviewService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const reviewService = new ReviewService({
  authRepository: new AuthNextAppRouteRepository(),
  reviewRepository: new ReviewAPIRepository(),
});

export default async function ReviewWriteUpdatePage({ params }: WithParams) {
  const { reviewId } = await params;
  if (!reviewId) {
    notFound();
  }

  const review = await commonErrorHandler(
    reviewService.getDetail({
      id: reviewId,
    }),
  );

  if (!review) {
    notFound();
  }

  return (
    <main className="h-[calc(100dvh - 63px)] px-5 py-4">
      <ReviewWriteForm initialReview={review} />
    </main>
  );
}
