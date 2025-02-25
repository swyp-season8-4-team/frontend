import type { OneLineReview } from '@repo/entity/src/review';

interface OnelineReviewTabProps {
  onelineReviews: OneLineReview[];
}
export function OnelineReviewTab({ onelineReviews }: OnelineReviewTabProps) {
  return (
    <div>
      <div>
        <div>
          <div>
            <div className="text-[8px]">한 줄 리뷰</div>
            <div></div>
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
