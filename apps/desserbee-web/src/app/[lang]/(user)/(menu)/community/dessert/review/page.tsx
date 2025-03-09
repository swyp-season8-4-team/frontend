import { NavigationPathname } from "@repo/entity/src/navigation";
import Link from "next/link";
import DessertCategoryFilter from "../_components/DessertCategoryFilter";
import { CommunityDessertCategorySearchProvider } from "../_contexts/CommunityDessertCategorySearchContext";
import CommunityReviewListSection from "./_components/CommunityReviewListSection";
import { REVIEW_CATEGORIES } from "./_constant";

export default function CommunityDessertReviewPage() {

  return (
    <main className="relative max-w-screen-md mx-auto px-4 py-6 h-[calc(100dvh-65px)] overflow-hidden flex flex-col bg-[#f6f6f6]">
      {/* 타이틀 영역 */}
      <CommunityDessertCategorySearchProvider>
        <div className="flex flex-col gap-4">
          <h2 className="text-[#6F6F6F] text-[14px] font-semibold">우리 동네의 디저트 맛집 리뷰를 확인해보세요!</h2>
          <DessertCategoryFilter categories={REVIEW_CATEGORIES} />
        </div>
        <CommunityReviewListSection />
      </CommunityDessertCategorySearchProvider>
      <Link
        className="flex gap-[4px] absolute bottom-[144px] right-[29px] bg-[#DE8332] hover:bg-[#DE8332]/90 text-[#393939] h-[43px] rounded-[100px] mx-auto text-[16px] text-white font-semibold leading-normal tracking-[-0.3px] px-4 py-2"
        href={NavigationPathname.CommunityReviewWrite}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M20.891 2.93011C19.3459 6.77011 15.4731 11.9901 12.2324 14.5801L10.2558 16.1601C10.005 16.3401 9.75418 16.5001 9.47325 16.6101C9.47325 16.4301 9.46322 16.2301 9.43312 16.0401C9.32275 15.2001 8.94149 14.4201 8.26926 13.7501C7.58701 13.0701 6.75425 12.6701 5.90143 12.5601C5.70077 12.5501 5.5001 12.5301 5.29944 12.5501C5.4098 12.2401 5.58037 11.9501 5.79107 11.7101L7.35624 9.74011C9.94481 6.51011 15.2022 2.63011 19.0449 1.10011C19.6369 0.880112 20.2088 1.04011 20.57 1.41011C20.9512 1.78011 21.1318 2.35011 20.891 2.93011Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.47296 16.611C9.47296 17.711 9.05156 18.761 8.25894 19.561C7.64692 20.171 6.81416 20.591 5.82087 20.721L3.35271 20.991C2.00826 21.141 0.85444 20.001 1.01497 18.641L1.28587 16.181C1.52666 13.991 3.36274 12.591 5.30918 12.551C5.50984 12.541 5.72054 12.551 5.91117 12.561C6.76399 12.671 7.59675 13.061 8.27901 13.751C8.95123 14.421 9.33249 15.201 9.44286 16.041C9.45289 16.231 9.47296 16.421 9.47296 16.611Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.2961 13.4605C13.2961 10.8505 11.1691 8.73047 8.55042 8.73047" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        글쓰기
      </Link>
    </main>
  );
}
