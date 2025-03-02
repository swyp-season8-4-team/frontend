import { OneLineReviewHeader } from '../_components/(tabs)/OnelineReviewTab/header';
import { cookies } from 'next/headers';
import { DetailPageHeader } from '../_components/Header';
import { OneLineReviewWrite } from '../_components/(tabs)/OnelineReviewTab/write';
import { OneLineReviewItem } from '../_components/(tabs)/OnelineReviewTab/item';
import type { OneLineReview } from '@repo/entity/src/review';
import ReviewService from '@repo/usecase/src/reviewService';
import ReviewAPIReopository from '@repo/infrastructures/src/repositories/reviewAPIRepository';

interface OneLineReviewPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function OneLineReviewPage({
  params,
}: OneLineReviewPageProps) {
  const { storeId } = await params;

  const reviewService = new ReviewService({
    reviewRepository: new ReviewAPIReopository(),
  });

  const cookieStore = await cookies();
  const reviewPageDataStr = cookieStore.get('reviewPageData')?.value;
  const reviewActionData = reviewPageDataStr
    ? JSON.parse(reviewPageDataStr)
    : null;

  let reviewPageData;
  try {
    reviewPageData = await reviewService.getStoreOnlineReviews({
      storeUuid: reviewActionData.storeUuid,
    });
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="min-w-[100vw] md:min-w-[768px] pb-10">
      <DetailPageHeader />
      <div className="px-base">
        <OneLineReviewHeader
          averageRating={reviewActionData.averageRating}
          totalReviewCount={reviewActionData.totalReviewCount}
        />
        <OneLineReviewWrite storeUuid={storeId} />
        <div className="flex flex-col gap-1 md:gap-3">
          {reviewPageData &&
            reviewPageData.map((storeReview: OneLineReview) => (
              <OneLineReviewItem
                images={storeReview.images}
                content={storeReview.content}
                createdAt={storeReview.createdAt}
                nickname={storeReview.nickname}
                profileImage={storeReview.profileImage}
                rating={storeReview.rating}
                key={storeReview.reviewUuid}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
