import type { WithParams } from '@/app';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import ReviewService from '@repo/usecase/src/reviewService';
import { notFound } from 'next/navigation';
import ReviewPostSection from './_components/ReviewPostSection';
import { ReviewDetailProvider } from './_contexts/ReviewDetailContext';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import ReviewCommentForm from './_components/ReviewCommentForm';
import ReviewCommentListSection from './_components/ReviewCommentListSection';

const reviewService = new ReviewService({
  authRepository: new AuthNextAppRouteRepository(),
  reviewRepository: new ReviewAPIRepository(),
});

export default async function ReviewDetailPage({ params }: WithParams) {
  const { reviewId } = await params;
  if (!reviewId) {
    notFound();
  }

  const [reviewResult, replyListResult] = await Promise.allSettled([
    reviewService.getDetail({ id: reviewId }),
    reviewService.getReplyList({ id: reviewId }),
  ]);

  const review =
    reviewResult.status === 'fulfilled' ? reviewResult.value : null;
  if (!review) {
    notFound();
  }

  const replyListResponse =
    replyListResult.status === 'fulfilled' ? replyListResult.value : null;

  return (
    <main className="flex flex-col h-[calc(100dvh - 52px)] px-4 py-4 gap-4 bg-[#f6f6f6] overflow-hidden">
      <ReviewDetailProvider review={review}>
        <div className="flex-1 overflow-y-auto">
          <ReviewPostSection review={review} />
        </div>
        {replyListResponse && replyListResponse.replyList.length > 0 && (
          <ReviewCommentListSection
            replyList={replyListResponse.replyList}
            isLast={replyListResponse.isLast}
          />
        )}
        <ReviewCommentForm />
      </ReviewDetailProvider>
    </main>
  );
}
