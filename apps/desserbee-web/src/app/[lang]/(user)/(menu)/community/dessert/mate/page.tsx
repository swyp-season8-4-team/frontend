import type { WithSearchParams } from "@/app";
import type { MateCommunityCategory } from "@repo/entity/src/mate";
import { NavigationPathname } from "@repo/entity/src/navigation";
import Link from "next/link";
import CategoryFilter from "./_components/CategoryFilter";
import CommunityMateFixedTopArea from "./_components/CommunityMateFixedTopArea";
import CommunityMateSection from "./_components/CommunityMateSection";
import CommunityMateTitle from "./_components/CommunityMateTitle";
import { CommunityMateCategorySearchProvider } from "./_contexts/CommunityMateCategorySearchContext";

export const dynamic = 'force-dynamic';

export default async function CommunityMatePage({ searchParams }: WithSearchParams) {

  const { q } = await searchParams; 
  
  const categories: MateCommunityCategory[] = ['친목도모', '사진맛집', '카공모임', '건강맛집', '빵지순례', '카페투어'];

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6 h-[calc(100dvh-65px)] overflow-hidden flex flex-col">
      {/* 타이틀 영역 */}
      <CommunityMateCategorySearchProvider>
        <CommunityMateFixedTopArea>
          <div className="flex justify-between relative mb-6">
            <CommunityMateTitle />
          <div className="flex gap-2">
            <Link 
              className="px-3 py-1.5 rounded-[53.204px] bg-[#898989] whitespace-nowrap flex justify-center items-center w-[60px] h-[26px] flex-shrink-0 text-[12px] text-white font-semibold leading-[130%] tracking-[-0.287px]" 
              href={NavigationPathname.MateWrite}
            >
              글쓰기
            </Link>
            {/* <SeeMoreIconButton /> */}
          </div>
        </div>

        {/* 카테고리 필터 - 클라이언트 컴포넌트 */}
          <CategoryFilter categories={categories} />
        </CommunityMateFixedTopArea>
      {/* 게시글 목록 - 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <CommunityMateSection q={q ?? null} />
        
        {/* 그라데이션 효과를 스크롤 영역 내부로 이동 */}
        <div className="sticky left-0 bottom-0 w-full h-[100px] bg-gradient-to-b from-[#F9FAFC]/0 to-[#F9FAFC] to-[84.75%]" />
      </div>
      </CommunityMateCategorySearchProvider>
    </main>
  );
}