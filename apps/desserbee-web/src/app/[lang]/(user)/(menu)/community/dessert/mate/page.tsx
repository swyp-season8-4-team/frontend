import type { WithSearchParams } from '@/app';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Link from 'next/link';
import DessertCategoryFilter from '../_components/DessertCategoryFilter';
import { CommunityDessertCategorySearchProvider } from '../_contexts/CommunityDessertCategorySearchContext';
import CommunityMateFixedTopArea from './_components/CommunityMateFixedTopArea';
import CommunityMateSection from './_components/CommunityMateSection';
import CommunityMateTitle from './_components/CommunityMateTitle';
import { COMMUNITY_MATE_CATEGORIES } from './_constant';

export const dynamic = 'force-dynamic';

export default async function CommunityMatePage({
  searchParams,
}: WithSearchParams) {
  const { q } = await searchParams;

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6 h-[calc(100dvh-65px)] overflow-hidden flex flex-col bg-[#f6f6f6]">
      {/* 타이틀 영역 */}
      <CommunityDessertCategorySearchProvider>
        <div className="flex flex-col gap-2">
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
          </CommunityMateFixedTopArea>
          {/* 카테고리 필터 - 클라이언트 컴포넌트 */}
          <DessertCategoryFilter categories={COMMUNITY_MATE_CATEGORIES} />
        </div>
        {/* 게시글 목록 - 스크롤 영역 */}
        {/* <div className="flex-1 overflow-y-auto overflow-x-hidden relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <CommunityMateSection q={q ?? null} />
      </div> */}
        <CommunityMateSection q={q ?? null} />
      </CommunityDessertCategorySearchProvider>
    </main>
  );
}
