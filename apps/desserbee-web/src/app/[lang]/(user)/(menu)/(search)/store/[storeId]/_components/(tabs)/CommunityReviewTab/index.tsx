import { NavigationPathname } from '@repo/entity/src/navigation';
import { useRouter } from 'next/navigation';

export function CommunityReviewTab() {
  const router = useRouter();

  const handleGoCommunityReviewBtnClick = () => {
    router.push(`${NavigationPathname.CommunityDessertReview}`);
  };
  return (
    <div className="w-full">
      <div className="w-full text-[10px] md:text-base text-center">
        <div>해당 가게에 작성된 커뮤니티 리뷰가 없어요.</div>
      </div>
      <div className="flex w-full justify-end">
        <button onClick={handleGoCommunityReviewBtnClick}>
          커뮤니티 리뷰 보러가기
        </button>
      </div>
    </div>
  );
}
