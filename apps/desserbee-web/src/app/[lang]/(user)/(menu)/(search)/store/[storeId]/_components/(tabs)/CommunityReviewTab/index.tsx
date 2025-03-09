import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatDate } from '../../../../_utils/date';
import bee from '@/app/[lang]/(user)/(menu)/(search)/map/_assets/svg/logo-bee.svg';
import type { StoreDetailInfoData } from '@repo/entity/src/store';
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
      <div className="text-[10px] font-semibold md:text-lg">커뮤니티 리뷰</div>
      {communityReviews.length > 0 ? (
        communityReviews.map((review) => (
          <div
            key={review.reviewUuid}
            className="flex items-center bg-[#F6F6F6] p-[8px] md:px-[14px] md:py-3 w-full"
          >
            <div className="bg-[#D2D2D2] flex-shrink-0 rounded-[1px] md:rounded-[3px] w-[21px] md:w-[147px] aspect-square md:h-auto md:aspect-[147/94] overflow-hidden self-stretch">
              <Image
                // src={bee}
                src={review.thumbnail}
                className="object-contain w-full h-full"
                alt="커뮤니티 리뷰 사진"
              />
            </div>
            <div className="flex flex-col justify-center h-full items-start pl-[3px] md:pl-[11px] leading-[50%] md:leading-[130%]">
              <div className="flex flex-col justify-center gap-[1px]">
                <div className="flex items-center w-full justify-between">
                  <div className="flex  flex-shrink-0 items-center gap-x-[1px] gap-y-1 md:gap-x-[5px] md:gap-y-[7px]">
                    <div className="rounded-full bg-[#dadada] w-[8px] md:w-5 aspect-square overflow-hidden">
                      <Image
                        // src={bee}
                        src={review.profileImage}
                        className="object-cover w-full h-full"
                        alt="프로필사진"
                      />
                    </div>
                    <div className="text-[8px] md:text-base">
                      {/* 닉네임 */}
                      {review.nickname}
                    </div>
                  </div>
                  <div className="flex w-full justify-end">
                    <div className="text-[8px] md:text-base">
                      {/* 25.01.23 */}
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between">
                  <div className="overflow-hidden ">
                    <div className="text-[9px] md:text-lg font-semibold line-clamp-1">
                      {/* 이 카페 푸딩이 정말 맛있어요! 커피랑 같이 먹으니까 더
                      맛있네요. */}
                      {review.title}
                    </div>
                  </div>
                </div>
                <div className="text-[8px] md:text-base line-clamp-1 md:line-clamp-2">
                  {/* 이 카페 푸딩이 정말 맛있어요! 커피랑 같이 먹으니까 더
                  맛있네요. 친구들이랑 오기 좋은 곳 같아요. 분위기도 좋고
                  디저트도 맛있어서 자주 방문할 것 같습니다. */}
                  {review.content}
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
