'use client';

import { BottomSheet } from '@repo/design-system/components/BottomSheet';
import HexagonGrid from '@repo/design-system/components/HexagonGrid';

import { StoreSummary } from '../StoreSummary';
import { StorePreviewPicList } from '../StorePreviewPicList';
import { useStoreSummary } from '../../../_hooks/useStoreSummary';

interface BottomSheetProps {
  storeId: number;
  isBottomSheetOpen: boolean;
  toggleBottomSheet: () => void;
}

export function BottomSheetContainer({
  storeId,
  isBottomSheetOpen,
  toggleBottomSheet,
}: BottomSheetProps) {
  const { storeSummary } = useStoreSummary(storeId);

  const bottomSheetProps = {
    isBottomSheetOpen,
    toggleBottomSheet,
  };

  if (!storeSummary) return null;

  const storeSummaryProps = {
    name: storeSummary.name,
    animalYn: storeSummary.animalYn,
    tumblerYn: storeSummary.tumblerYn,
    parkingYn: storeSummary.parkingYn,
    tags: storeSummary.tags,
    address: storeSummary.address,
    operatingHours: storeSummary.operatingHours,
    closingDays: storeSummary.closingDays,
    phone: storeSummary.phone,
    storeLink: storeSummary.storeLink,
  };

  const storePreviewPicListProps = {
    storeImages: storeSummary.storeImages,
  };

  return (
    <BottomSheet {...bottomSheetProps}>
      <div className="flex mb-[37px]">
        <HexagonGrid />
        <StoreSummary {...storeSummaryProps} />
      </div>
      <StorePreviewPicList {...storePreviewPicListProps} />
    </BottomSheet>
  );
}
