import ReviewService from '@repo/usecase/src/reviewService';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import { CommunityReviewListProvider } from '../../_contexts/CommunityReviewListContext';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import CommunityReviewList from '../CommunityReviewList';
import ScrollGradient from '../../../_components/ScrollGradient';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const reviewService = new ReviewService({
  authRepository: new AuthNextAppRouteRepository(),
  reviewRepository: new ReviewAPIRepository(),
});

export default async function CommunityReviewListSection() {
  const { reviews, isLast } = await commonErrorHandler(
    reviewService.getAll({ from: 0, to: 9 }),
  );

  return (
    <section className="relative flex-1 space-y-4 overflow-y-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
      <CommunityReviewListProvider
        initialReviews={reviews}
        initialIsLast={isLast}
      >
        <CommunityReviewList />
      </CommunityReviewListProvider>
      {reviews.length > 0 && <ScrollGradient />}
    </section>
  );
}
