import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import bee from '@/app/[lang]/(user)/(menu)/(search)/map/_assets/svg/logo-bee.svg';
export function CommunityReviewTab() {
  const router = useRouter();
  const handleGoCommunityReviewBtnClick = () => {
    router.push(`${NavigationPathname.CommunityDessertReview}`);
  };
  return (
    <div className="w-full">
      <div className="text-xs font-semibold md:text-lg">커뮤니티 리뷰</div>
      <div className="flex justify-start items-center bg-[#F6F6F6] p-[8px] md:px-[14px] md:py-3 w-full">
        <div className="bg-[#D2D2D2] flex-shrink-0 rounded-[1px] md:rounded-[3px] w-[21px] md:w-[147px] md:h-[94px] aspect-square md:aspect-[147/94] overflow-hidden">
          <Image
            src={bee}
            className="object-cover w-full h-full"
            alt="프로필사진"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start pl-[3px] md:pl-[11px] leading-[50%] md:leading-[130%]">
            <div className="flex items-center gap-x-[1px] gap-y-1 md:gap-x-[5px] md:gap-y-[7px]">
              <div className="rounded-full bg-[#dadada] w-[10px] md:w-[36px] aspect-square overflow-hidden">
                <Image
                  src={bee}
                  className="object-cover w-full h-full"
                  alt="프로필사진"
                />
              </div>
              <div className="text-[10px] md:text-base">닉네임</div>
            </div>
            <div className="text-[10px] md:text-base line-clamp-1 md:line-clamp-2">
              이 카페 푸딩이 정말 맛있어요! 커피랑 같이 먹으니까 더 맛있네요.
              친구들이랑 오기 좋은 곳 같아요. 분위기도 좋고 디저트도 맛있어서
              자주 방문할 것 같습니다.
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full text-[10px] md:text-base text-center">
        <div>해당 가게에 작성된 커뮤니티 리뷰가 없어요.</div>
      </div> */}
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
