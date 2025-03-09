
import type { WithParams } from "@/app";
import ReviewWriteForm from "../_components/ReviewWriteForm";
import { notFound } from "next/navigation";
import ReviewService from "@repo/usecase/src/reviewService";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import ReviewAPIRepository from "@repo/infrastructures/src/repositories/reviewAPIRepository";

const reviewService = new ReviewService({
  authRepository: new AuthNextAppRouteRepository(),
  reviewRepository: new ReviewAPIRepository(),
});

export default async function ReviewWriteUpdatePage({ params }: WithParams) {
  const { reviewId } = await params;
  if (!reviewId) {
    notFound();
  }

  const review = await reviewService.getDetail({
    id: reviewId,
  });

  if (!review) {
    notFound();
  }
  
  return (
    <main className="px-5 py-4 h-[calc(100dvh - 63px)]">
      <ReviewWriteForm initialReview={review} />
    </main>
  );
}