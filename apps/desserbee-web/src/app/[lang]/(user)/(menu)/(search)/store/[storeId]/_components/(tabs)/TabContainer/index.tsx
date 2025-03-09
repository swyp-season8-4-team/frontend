import { useState } from 'react';
import { CommunityReviewTab } from '../CommunityReviewTab';
import { DessertMateTab } from '../DessertMateTab';
import { MenuTab } from '../MenuTab';
import { OnelineReviewTab } from '../OnelineReviewTab';
import type { StoreDetailInfoData } from '@repo/entity/src/store';

interface TabContainerProps {
  onelineReviews: Pick<
    StoreDetailInfoData,
    'storeReviews' | 'totalReviewCount' | 'averageRating'
  >;
  menus: StoreDetailInfoData['menus'];
  mate: StoreDetailInfoData['mate'];
  communityReviews: StoreDetailInfoData['communityReviews'];
}

const DETAIL_TABS = [
  { id: 'menu', title: '메뉴' },
  { id: 'oneline', title: '한 줄 리뷰' },
  { id: 'community', title: '커뮤니티 리뷰' },
  { id: 'mate', title: '디저트 메이트' },
] as const;

type TabId = (typeof DETAIL_TABS)[number]['id'];

export function TabContainer({
  onelineReviews,
  menus,
  mate,
  communityReviews,
}: TabContainerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('menu');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuTab menus={menus} />;
      case 'oneline':
        return <OnelineReviewTab onelineReviews={onelineReviews} />;
      case 'community':
        return <CommunityReviewTab communityReviews={communityReviews} />;
      case 'mate':
        return <DessertMateTab mate={mate} />;
    }
  };

  return (
    <div>
      <nav className="grid grid-cols-4 pt-4 border-[#6F6F6F] border-b w-full font-semibold">
        {DETAIL_TABS.map(({ id, title }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
            }}
            className={`text-[10px] md:text-lg leading-3  ${
              activeTab === id
                ? 'border-b-[3.56px] md:border-b-[4.56px] border-[#FFB700] '
                : 'text-[#9F9F9F]'
            }`}
          >
            {title}
          </button>
        ))}
      </nav>
      <div className="mt-4 min-h-[173.5px] md:min-h-[422px]">
        {renderTabContent()}
      </div>
    </div>
  );
}
