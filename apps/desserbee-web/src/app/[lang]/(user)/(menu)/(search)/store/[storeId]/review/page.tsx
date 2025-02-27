import { OneLineReviewHeader } from '../_components/(tabs)/OnelineReviewTab/header';
import { cookies } from 'next/headers';
import { DetailPageHeader } from '../_components/Header';
import { OneLineReviewWrite } from '../_components/(tabs)/OnelineReviewTab/write';
import { OneLineReviewItem } from '../_components/(tabs)/OnelineReviewTab/item';
import type { OneLineReview } from '@repo/entity/src/review';

export default async function OneLineReviewPage() {
  const cookieStore = await cookies();
  const reviewPageDataStr = cookieStore.get('reviewPageData')?.value;
  const reviewPageData = reviewPageDataStr
    ? JSON.parse(reviewPageDataStr)
    : null;

  if (!reviewPageData) {
    return <div>리뷰 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-w-[100vw] md:min-w-[768px]">
      <DetailPageHeader />
      <div className="px-base">
        <OneLineReviewHeader
          averageRating={reviewPageData.averageRating}
          totalReviewCount={reviewPageData.totalReviewCount}
        />
        <OneLineReviewWrite />
        <div className="flex flex-col gap-1 md:gap-3">
          {reviewPageData.storeReviews.map((storeReview: OneLineReview) => (
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
