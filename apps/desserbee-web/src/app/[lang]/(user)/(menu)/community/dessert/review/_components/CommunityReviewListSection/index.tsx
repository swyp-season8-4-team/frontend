import ReviewService from "@repo/usecase/src/reviewService";
import ReviewAPIRepository from "@repo/infrastructures/src/repositories/reviewAPIRepository";
import { CommunityReviewListProvider } from "../../_contexts/CommunityReviewListContext";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import CommunityReviewList from "../CommunityReviewList";

const reviewService = new ReviewService({
  authRepository: new AuthNextAppRouteRepository(),
  reviewRepository: new ReviewAPIRepository(),
})

export default async function CommunityReviewListSection() {
  
  const { reviews, isLast } = await reviewService.getAll({ from: 0, to: 9 });

  // console.log(reviews, isLast);

  return (
    <CommunityReviewListProvider initialReviews={reviews} initialIsLast={isLast}>
      <CommunityReviewList />
    </CommunityReviewListProvider>
  )
}
