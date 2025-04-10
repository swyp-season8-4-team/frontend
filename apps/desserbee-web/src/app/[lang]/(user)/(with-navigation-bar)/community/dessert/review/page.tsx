import { NavigationPathname } from '@repo/entity/src/navigation';
import Link from 'next/link';
import DessertCategoryFilter from '../_components/DessertCategoryFilter';
import { CommunityDessertCategorySearchProvider } from '../_contexts/CommunityDessertCategorySearchContext';
import CommunityReviewListSection from './_components/CommunityReviewListSection';
import { REVIEW_CATEGORIES } from './_constant';
import IconPencil from '@repo/design-system/components/icons/IconPencil';
import CommunityReviewFixedTopArea from './_components/CommunityReviewFixedTopArea';

export default function CommunityDessertReviewPage() {
  return (
    <main className="relative max-w-screen-md mx-auto px-4 py-6 h-[calc(100dvh-65px)] overflow-hidden flex flex-col bg-[#f6f6f6]">
      {/* 타이틀 영역 */}
      <CommunityDessertCategorySearchProvider>
        <div className="flex flex-col gap-3">
          <CommunityReviewFixedTopArea>
            <h2 className="text-[#6F6F6F] text-[16px] font-semibold">
              우리 동네의 디저트 맛집 리뷰를 확인해보세요!
            </h2>
          </CommunityReviewFixedTopArea>

          <DessertCategoryFilter categories={REVIEW_CATEGORIES} />
        </div>
        <CommunityReviewListSection />
      </CommunityDessertCategorySearchProvider>
      <Link
        className="flex gap-[4px] absolute bottom-[132px] right-[29px] bg-[#DE8332] hover:bg-[#DE8332]/90 text-[#393939] h-[43px] rounded-[100px] mx-auto text-[16px] text-white font-semibold leading-normal tracking-[-0.3px] px-4 py-2"
        href={NavigationPathname.CommunityReviewWrite}
      >
        <IconPencil className="text-white" size={22} />
        글쓰기
      </Link>
    </main>
  );
}
