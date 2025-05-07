'use client';

import { BottomSheet } from '@repo/design-system/components/BottomSheet';
import { HexagonGrid } from '@repo/design-system/components/HexagonGrid';
import { SummaryInfoContainer } from '../SummaryInfoContainer';
import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import { StorePreviewPicList } from '../StorePreviewPicList';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface BottomSheetContainerProps {
  showBottomSheet: boolean;
  storeSummary: StoreSummaryInfoData | null;
}

export function BottomSheetContainer({
  showBottomSheet,
  storeSummary,
}: BottomSheetContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(showBottomSheet);

  useEffect(() => {
    // URL 파라미터 변경을 감지하여 바텀시트 상태 업데이트
    const hasBottomsheet = searchParams.get('bottomsheet') === 'true';
    const storeId = searchParams.get('storeId');
    const shouldOpen = hasBottomsheet && storeId !== null;

    setIsBottomSheetOpen(shouldOpen);
  }, [searchParams]);

  const handleBottomSheetClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('bottomsheet');
    params.delete('storeId');

    router.replace(`?${params}`, {
      scroll: false,
    });
  };

  if (!isBottomSheetOpen || !storeSummary) return null;

  const storeSummaryProps = {
    storeUuid: storeSummary.storeUuid,
    name: storeSummary.name,
    animalYn: storeSummary.animalYn,
    tumblerYn: storeSummary.tumblerYn,
    parkingYn: storeSummary.parkingYn,
    averageRating: storeSummary.averageRating,
    tags: storeSummary.tags,
    address: storeSummary.address,
    operatingHours: storeSummary.operatingHours,
    phone: storeSummary.phone,
    storeLinks: storeSummary.storeLinks,
    description: storeSummary.description,
    holidays: storeSummary.holidays,
    topPreferences: storeSummary.topPreferences,
  };

  const hexaGridProps = {
    contents: storeSummary.topPreferences
      .sort((a, b) => a.rank - b.rank)
      .map((pref) => pref.name),
    storeImages: storeSummary?.storeImages,
  };
  const storePreviewPicListProps = {
    ownerPickImages: storeSummary?.ownerPickImages,
  };

  return (
    <BottomSheet isOpen={isBottomSheetOpen} onClose={handleBottomSheetClose}>
      <div className="mb-2 grid grid-cols-[0.5fr_2fr] md:mb-[37px] md:grid-cols-[0.3fr_2fr]">
        <HexagonGrid {...hexaGridProps} />
        <SummaryInfoContainer {...storeSummaryProps} />
      </div>
      {(storeSummary?.storeImages ?? []).length > 0 && (
        <StorePreviewPicList {...storePreviewPicListProps} />
      )}
    </BottomSheet>
  );
}
