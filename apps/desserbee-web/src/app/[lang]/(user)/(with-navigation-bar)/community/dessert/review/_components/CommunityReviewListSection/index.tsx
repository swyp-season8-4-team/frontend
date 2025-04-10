import ReviewService from "@repo/usecase/src/reviewService";
import ReviewAPIRepository from "@repo/infrastructures/src/repositories/reviewAPIRepository";
import { CommunityReviewListProvider } from "../../_contexts/CommunityReviewListContext";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import CommunityReviewList from "../CommunityReviewList";
import ScrollGradient from "../../../_components/ScrollGradient";

const reviewService = new ReviewService({
  authRepository: new AuthNextAppRouteRepository(),
  reviewRepository: new ReviewAPIRepository(),
})

export default async function CommunityReviewListSection() {
  
  const { reviews, isLast } = await reviewService.getAll({ from: 0, to: 9 });

  return (
    <section className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] space-y-4">
      <CommunityReviewListProvider initialReviews={reviews} initialIsLast={isLast}>
        <CommunityReviewList />
      </CommunityReviewListProvider>
      {reviews.length > 0 && <ScrollGradient />}
    </section>
  )
}
