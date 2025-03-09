import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import bee from '@/app/[lang]/(user)/(menu)/(search)/map/_assets/svg/logo-bee.svg';
import type { StoreDetailInfoData } from '@repo/entity/src/store';
import { formatDate } from '../../../../_utils/date';

interface CommunityReviewTabProps {
  communityReviews: StoreDetailInfoData['communityReviews'];
}
export function CommunityReviewTab({
  communityReviews,
}: CommunityReviewTabProps) {
  const router = useRouter();
  const handleGoCommunityReviewBtnClick = () => {
    router.push(`${NavigationPathname.CommunityDessertReview}`);
  };
  return (
    <div className="w-full">
      <div className="text-xs font-semibold md:text-lg">커뮤니티 리뷰</div>
      {communityReviews.length > 0 ? (
        communityReviews.map((review) => (
          <div
            key={review.reviewUuid}
            className="flex justify-start items-center bg-[#F6F6F6] p-[8px] md:px-[14px] md:py-3 w-full"
          >
            <div className="bg-[#D2D2D2] flex-shrink-0 rounded-[1px] md:rounded-[3px] w-[21px] md:w-[147px] h-full aspect-square md:aspect-[147/94] overflow-hidden">
              <Image
                src={review.thumbnail}
                className="object-cover w-full h-full"
                alt="커뮤니티 리뷰 썸네일"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-start pl-[3px] md:pl-[11px] leading-[50%] md:leading-[130%]">
                <div className="flex flex-col gap-[1px]">
                  <div className="flex items-center gap-x-[1px] gap-y-1 md:gap-x-[5px] md:gap-y-[7px]">
                    <div className="rounded-full bg-[#dadada] w-[8px] md:w-5 aspect-square overflow-hidden">
                      <Image
                        src={review.profileImage}
                        className="object-cover w-full h-full"
                        alt="프로필사진"
                      />
                    </div>
                    <div className="text-[8px] md:text-base">
                      {review.nickname}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="overflow-hidden ">
                      <div className="text-[9px] md:text-lg font-semibold line-clamp-1">
                        {review.title}
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] md:text-base line-clamp-1 md:line-clamp-2">
                    {review.content}
                  </div>
                  <div className="flex w-full justify-end">
                    <div className="text-[8px] md:text-base">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-[10px] md:text-base text-center">
          <div>해당 가게에 작성된 커뮤니티 리뷰가 없어요.</div>
        </div>
      )}

      <div className="flex w-full justify-end">
        <button
          className="text-[10px] md:text-base"
          onClick={handleGoCommunityReviewBtnClick}
        >
          커뮤니티 리뷰 보러가기
        </button>
      </div>
    </div>
  );
}
