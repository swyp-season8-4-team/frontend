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
    <main className="mx-auto flex h-[calc(100dvh-65px)] max-w-screen-md flex-col overflow-hidden bg-[#f6f6f6] px-4 py-6">
      {/* 타이틀 영역 */}
      <CommunityDessertCategorySearchProvider>
        <div className="flex flex-col gap-2">
          <CommunityMateFixedTopArea>
            <div className="relative mb-6 flex justify-between">
              <CommunityMateTitle />
              <div className="flex gap-2">
                <Link
                  className="flex h-[26px] w-[60px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded-[53.204px] bg-[#898989] px-3 py-1.5 text-[12px] font-semibold leading-[130%] tracking-[-0.287px] text-white"
                  href={NavigationPathname.MateWrite}
                >
                  글쓰기
                </Link>
              </div>
            </div>
          </CommunityMateFixedTopArea>
          <DessertCategoryFilter categories={COMMUNITY_MATE_CATEGORIES} />
        </div>
        <CommunityMateSection q={q ?? null} />
      </CommunityDessertCategorySearchProvider>
    </main>
  );
}
