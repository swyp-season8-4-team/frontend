import DessertCategoryFilter from "../_components/DessertCategoryFilter";
import ScrollGradient from "../_components/ScrollGradient";
import { CommunityDessertCategorySearchProvider } from "../_contexts/CommunityDessertCategorySearchContext";
import CommunityReviewListSection from "./_components/CommunityReviewListSection";
import { REVIEW_CATEGORIES } from "./_constant";

export default function CommunityDessertReviewPage() {

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6 h-[calc(100dvh-65px)] overflow-hidden flex flex-col">
      {/* 타이틀 영역 */}
      <CommunityDessertCategorySearchProvider>
        <div className="flex flex-col gap-4">
          <h2 className="text-[#6F6F6F] text-[14px] font-semibold">우리 동네의 디저트 맛집 리뷰를 확인해보세요!</h2>
          <DessertCategoryFilter categories={REVIEW_CATEGORIES} />
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <CommunityReviewListSection />
          {/* 그라데이션 효과를 스크롤 영역 내부로 이동 */}
          <ScrollGradient />
      </div>
      </CommunityDessertCategorySearchProvider>
    </main>
  );
}
