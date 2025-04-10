import { NavigationPathname } from '@repo/entity/src/navigation';
import CommunityDessertMateSVG from './_assets/svgs/icon-dessert-mate.svg';
import CommunityDessertReviewSVG from './_assets/svgs/icon-dessert-review.svg';
import CommunityNickName from './_components/CommunityNickName';
import CommunityIntroCard from './_components/CommunityIntroCard';
import { HeaderContainer } from '../../_components/HeaderContainer';

const COMMUNITY_NAVIGATION = [
  {
    path: NavigationPathname.CommunityDessertMate,
    title: '디저트 메이트',
    description: `나에게 딱 맞는\n디저트 친구 찾기`,
    imgSrc: CommunityDessertMateSVG,
    imgAlt: 'community-dessert-mate',
  },
  {
    path: NavigationPathname.CommunityDessertReview,
    title: '디저트 리뷰',
    description: ` 다양한 디저트 가게\n리뷰를 알아보기`,
    imgSrc: CommunityDessertReviewSVG,
    imgAlt: 'community-dessert-review',
  },
];
export default async function CommunityIntroPage() {
  return (
    <main className="flex h-full min-h-[100dvh] flex-col bg-[#F2F1ED]">
      <HeaderContainer />
      <div className="px-base pt-[100px]">
        <h1 className="my-8 text-center text-[22px]">
          <CommunityNickName />
          님,
          <br />
          커뮤니티를 탐색해보세요!
        </h1>
        <div className="grid grid-cols-2 gap-4 md:">
          {COMMUNITY_NAVIGATION.map(
            ({ path, title, description, imgSrc, imgAlt }) => (
              <div key={path}>
                <CommunityIntroCard
                  path={path}
                  imgSrc={imgSrc}
                  imgAlt={imgAlt}
                  title={title}
                  description={description}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
