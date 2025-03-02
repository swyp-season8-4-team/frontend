import { useContext, useState } from 'react';
import { CommunityReviewTab } from '../CommunityReviewTab';
import { DessertMateTab } from '../DessertMateTab';
import { MenuTab } from '../MenuTab';
import { OnelineReviewTab } from '../OnelineReviewTab';
import type { StoreDetailInfoData } from '@repo/entity/src/store';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { CommunityIsNotReadyModal } from '../../../../../map/_modals/CommunityIsNotReadyModal';
import { useParams } from 'next/navigation';

interface TabContainerProps {
  onelineReviews: Pick<
    StoreDetailInfoData,
    'storeReviews' | 'totalReviewCount' | 'averageRating'
  >;
  menus: StoreDetailInfoData['menus'];
  mate: StoreDetailInfoData['mate'];
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
}: TabContainerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('menu');

  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleCommunityReviewTabClick = (id: string) => {
    if (id !== 'community') return;
    push('modal', {
      component: <CommunityIsNotReadyModal onClose={closeModal} />,
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuTab menus={menus} />;
      case 'oneline':
        return <OnelineReviewTab onelineReviews={onelineReviews} />;
      case 'community':
        return <CommunityReviewTab />;
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
              handleCommunityReviewTabClick(id);
            }}
            className={`text-[8px] md:text-lg leading-3  ${
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
