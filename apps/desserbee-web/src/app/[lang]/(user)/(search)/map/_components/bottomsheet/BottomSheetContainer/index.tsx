'use client';

import { BottomSheet } from '@repo/design-system/components/BottomSheet';
import { HexagonGrid } from '@repo/design-system/components/HexagonGrid';

import { SummaryInfoContainer } from '../SummaryInfoContainer';
import { StorePreviewPicList } from '../StorePreviewPicList';
import { useStoreSummary } from '../../../../_hooks/useStoreSummary';

interface BottomSheetProps {
  storeUuid: string;
  isBottomSheetOpen: boolean;
  handleBottomSheetClose: () => void;
}

export function BottomSheetContainer({
  storeUuid,
  isBottomSheetOpen,
  handleBottomSheetClose,
}: BottomSheetProps) {
  const { storeSummary } = useStoreSummary(storeUuid);

  const bottomSheetProps = {
    isBottomSheetOpen,
    handleBottomSheetClose,
  };

  if (!storeSummary) return null;

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
    storeLink: storeSummary.storeLink,
    description: storeSummary.description,
  };

  const hexaGridProps = {
    contents: ['비건', '로우슈거', '글루텐프리'],
    ownerPickImages: storeSummary.ownerPickImages,
  };
  const storePreviewPicListProps = {
    storeImages: storeSummary.storeImages,
  };

  return (
    <BottomSheet {...bottomSheetProps}>
      <div className="mb-[37px] grid grid-cols-[1fr_2fr] md:grid-cols-[0.3fr_2fr]">
        <HexagonGrid {...hexaGridProps} />
        <SummaryInfoContainer {...storeSummaryProps} />
      </div>
      <StorePreviewPicList {...storePreviewPicListProps} />
    </BottomSheet>
  );
}
