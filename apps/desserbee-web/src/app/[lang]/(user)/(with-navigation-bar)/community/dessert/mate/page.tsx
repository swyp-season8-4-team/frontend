import type { WithSearchParams } from '@/app';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Link from 'next/link';
import DessertCategoryFilter from '../_components/DessertCategoryFilter';
import { CommunityDessertCategorySearchProvider } from '../_contexts/CommunityDessertCategorySearchContext';
import CommunityMateFixedTopArea from './_components/CommunityMateFixedTopArea';
import CommunityMateSection from './_components/CommunityMateSection';
import CommunityMateTitle from './_components/CommunityMateTitle';
import { COMMUNITY_MATE_CATEGORIES } from './_constant';
import IconWriting from '@repo/design-system/components/icons/IconWriting2';

export const dynamic = 'force-dynamic';

export default async function CommunityMatePage({
  searchParams,
}: WithSearchParams) {
  const { q } = await searchParams;

  return (
    <main className="relative mx-auto flex h-[calc(100dvh-65px)] flex-col overflow-hidden bg-[#f6f6f6] px-4">
      <Link
        href={NavigationPathname.MateWrite}
        className="z-modal absolute bottom-24 right-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#3F3C39]"
      >
        <IconWriting className="text-[#FFC858]" />
      </Link>
      <CommunityDessertCategorySearchProvider>
        <CommunityMateFixedTopArea>
          <CommunityMateTitle />
        </CommunityMateFixedTopArea>
        <DessertCategoryFilter categories={COMMUNITY_MATE_CATEGORIES} />
        <CommunityMateSection q={q ?? null} />
      </CommunityDessertCategorySearchProvider>
    </main>
  );
}
