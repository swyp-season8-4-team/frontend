'use client';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import type { StoreDetailInfoData } from '@repo/entity/src/store';
import { OneLineReviewWrite } from './write';
import { OneLineReviewHeader } from './header';
import { OneLineReviewItem } from './item';
import { UserContext } from '@/contexts/UserContext';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { NeedLoginModal } from '../../../_modals/NeedLoginModal';
import { saveReviewPageData } from './action';

interface OnelineReviewTabProps {
  onelineReviews: Pick<
    StoreDetailInfoData,
    'storeReviews' | 'totalReviewCount' | 'averageRating'
  >;
}

export function OnelineReviewTab({ onelineReviews }: OnelineReviewTabProps) {
  const router = useRouter();

  const params = useParams();
  const storeId = params.storeId as string;

  const { user } = useContext(UserContext);
  const { push, pop } = useContext(PortalContext);

  // storeReviews가 undefined이거나 배열이 아닌 경우 빈 배열로 처리
  const safeStoreReviews = onelineReviews?.storeReviews && Array.isArray(onelineReviews.storeReviews)
    ? onelineReviews.storeReviews
    : [];
  const displayedReviews = safeStoreReviews.slice(0, 4);
  const [isReviewing, setIsReviewing] = useState(false);

  const closeModal = () => {
    pop('modal');
  };

  const handleWriteReviewBtnClick = () => {
    if (!user) {
      push('modal', {
        component: <NeedLoginModal onClose={closeModal} />,
      });
      return;
    } else {
      setIsReviewing(true);
    }
  };

  const handleBackToReviewBtnClick = () => {
    setIsReviewing(false);
  };

  const handleOnelineReviewItemClick = async () => {
    const reviewData = {
      storeUuid: storeId,
      totalReviewCount: onelineReviews?.totalReviewCount ?? 0,
      averageRating: onelineReviews?.averageRating ?? 0,
      storeReviews: safeStoreReviews,
    };

    await saveReviewPageData(reviewData);
    router.push(`/store/${storeId}/review`);
  };

  if (isReviewing) {
    return (
      <OneLineReviewWrite
        handleBackToReviewBtnClick={handleBackToReviewBtnClick}
        storeUuid={storeId}
      />
    );
  }
  return (
    <div className="pb-[15.73px] md:pb-[27px]">
      <OneLineReviewHeader
        averageRating={onelineReviews?.averageRating ?? 0}
        handleWriteReviewBtnClick={handleWriteReviewBtnClick}
        totalReviewCount={onelineReviews?.totalReviewCount ?? 0}
      />
      <div className="flex flex-col gap-1 md:gap-3">
        {safeStoreReviews.length !== 0 ? (
          <div className="flex flex-col gap-1 md:gap-3">
            {displayedReviews.map((review) => (
              <OneLineReviewItem
                storeUuid={storeId}
                reviewUuid={review.reviewUuid}
                userUuid={review.userUuid}
                content={review.content}
                createdAt={review.createdAt}
                images={review.images}
                nickname={review.nickname}
                profileImage={review.profileImage}
                rating={review.rating}
                key={review.reviewUuid}
              />
            ))}
            <div
              onClick={handleOnelineReviewItemClick}
              className="w-full flex justify-end text-[8px] md:text-base"
            >
              {safeStoreReviews.length > 4 && (
                <div className="text-[10px] md:text-base">리뷰 더보기</div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full text-[10px] md:text-base text-center">
            아직 작성된 리뷰가 없어요.
          </div>
        )}
      </div>
    </div>
  );
}
