import ReviewService from '@repo/usecase/src/reviewService';
import { MyPageSubMenuPageHeader } from '../../_components/MyPageSubMenuPageHeader';
import { ReviewSavedListContainer } from './_components/ReviewSavedListContainer';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

export default async function SavedCommunityPage() {
  const reviewService = new ReviewService({
    authRepository: new AuthNextAppRouteRepository(),
    reviewRepository: new ReviewAPIRepository(),
  });
  const { reviews, last } = await commonErrorHandler(
    reviewService.getSaved({}),
  );

  return (
    <>
      <div className="bg-page flex min-h-screen flex-col">
        <MyPageSubMenuPageHeader title="저장한 리뷰" />
        <div className="px-base flex flex-1 flex-col justify-start pt-[10%]">
          {reviews.length !== 0 ? (
            <ReviewSavedListContainer reviews={reviews} isLast={last} />
          ) : (
            <div className="w-full text-center">
              아직 저장된 리뷰가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
