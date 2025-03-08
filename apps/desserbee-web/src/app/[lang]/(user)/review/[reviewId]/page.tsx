import type { WithParams } from "@/app";
import ReviewAPIRepository from "@repo/infrastructures/src/repositories/reviewAPIRepository";
import ReviewService from "@repo/usecase/src/reviewService";
import { notFound } from "next/navigation";
import ReviewPostSection from "./_components/ReviewPostSection";
import { ReviewDetailProvider } from "./_contexts/ReviewDetailContext";

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
})

export default async function ReviewDetailPage({ params }: WithParams) {
  const { reviewId } = await params;
  if (!reviewId) {
    notFound();
  }

  const review = await reviewService.getDetail({ id: reviewId });
  // if (!isReview(review)) {
  //   notFound();
  // }

  return (
    <main className="flex flex-col h-[calc(100dvh - 52px)] px-4 gap-4 bg-[#f6f6f6]">
      <ReviewDetailProvider review={review}>
        <ReviewPostSection review={review} />
      </ReviewDetailProvider>
    </main>
  );
}