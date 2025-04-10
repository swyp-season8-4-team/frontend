import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CommunityDessertMateSVG from './_assets/svgs/icon-dessert-mate.svg';
import CommunityDessertReviewSVG from './_assets/svgs/icon-dessert-review.svg';
import CommunityNickName from './_components/CommunityNickName';
import CommunityMainCard from './_components/CommunityMainCard';

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
    <main className="flex h-[100dvh] flex-col justify-center bg-[#F6F6F6] px-5">
      <h1 className="mb-8 mt-8 text-center text-[22px]">
        <CommunityNickName />
        님,
        <br />
        커뮤니티를 탐색해보세요!
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {COMMUNITY_NAVIGATION.map(
          ({ path, title, description, imgSrc, imgAlt }) => (
            <div key={path}>
              <CommunityMainCard
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
    </main>
  );
}
