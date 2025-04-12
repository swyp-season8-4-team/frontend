import { NavigationPathname } from '@repo/entity/src/navigation';
import Link from 'next/link';
import DessertCategoryFilter from '../_components/DessertCategoryFilter';
import { CommunityDessertCategorySearchProvider } from '../_contexts/CommunityDessertCategorySearchContext';
import CommunityReviewListSection from './_components/CommunityReviewListSection';
import { REVIEW_CATEGORIES } from './_constant';
import IconPencil from '@repo/design-system/components/icons/IconPencil';
import CommunityReviewFixedTopArea from './_components/CommunityReviewFixedTopArea';
import IconWriting from '@repo/design-system/components/icons/IconWriting2';

export default function CommunityDessertReviewPage() {
  return (
    <main className="relative mx-auto flex h-[calc(100dvh-65px)] max-w-screen-md flex-col overflow-hidden bg-[#f6f6f6] px-4">
      {/* 타이틀 영역 */}
      <CommunityDessertCategorySearchProvider>
        <div className="flex flex-col gap-3">
          <CommunityReviewFixedTopArea>
            <h2 className="pt-4 text-[12px] font-semibold text-[#6F6F6F]">
              우리 동네의 디저트 맛집 리뷰를 확인해보세요!
            </h2>
          </CommunityReviewFixedTopArea>

          <DessertCategoryFilter categories={REVIEW_CATEGORIES} />
        </div>
        <CommunityReviewListSection />
      </CommunityDessertCategorySearchProvider>
      <Link
        href={NavigationPathname.CommunityReviewWrite}
        className="z-modal fixed bottom-24 right-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#3F3C39]"
      >
        <IconWriting className="text-[#FFC858]" />
      </Link>
    </main>
  );
}
