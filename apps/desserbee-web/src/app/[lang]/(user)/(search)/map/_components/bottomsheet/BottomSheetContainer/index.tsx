'use client';

import { BottomSheet } from '@repo/design-system/components/BottomSheet';
import { HexagonGrid } from '@repo/design-system/components/HexagonGrid';

import { SummaryInfoContainer } from '../SummaryInfoContainer';
import { StorePreviewPicList } from '../StorePreviewPicList';
// import { useStoreSummary } from '../../../../_hooks/useStoreSummary';
import type { StoreSummaryInfoData } from '@repo/entity/src/store';

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
  // const { storeSummary } = useStoreSummary(storeUuid);
  console.log(storeUuid);
  const storeSummary: StoreSummaryInfoData = {
    storeUuid: 'store-uuid-123',
    name: '스타벅스 강남점',
    address: '서울 강남구 테헤란로 101',
    phone: '02-555-1234',
    storeLink: 'https://instagram.com/store1',
    description: '스타벅스 강남점입니다.',
    animalYn: true,
    tumblerYn: true,
    parkingYn: false,
    averageRating: 4.5,
    tags: ['케이크', '구움과자', '건강 디저트'],
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: {
          hour: 9,
          minute: 0,
          second: 0,
          nano: 0,
        },
        closingTime: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
          second: 0,
          nano: 0,
        },
        isClosed: true,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: {
          hour: 9,
          minute: 0,
          second: 0,
          nano: 0,
        },
        closingTime: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
          second: 0,
          nano: 0,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: {
          hour: 9,
          minute: 0,
          second: 0,
          nano: 0,
        },
        closingTime: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
          second: 0,
          nano: 0,
        },
        isClosed: true,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: {
          hour: 9,
          minute: 0,
          second: 0,
          nano: 0,
        },
        closingTime: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
          second: 0,
          nano: 0,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: {
          hour: 9,
          minute: 0,
          second: 0,
          nano: 0,
        },
        closingTime: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
          second: 0,
          nano: 0,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: {
          hour: 9,
          minute: 0,
          second: 0,
          nano: 0,
        },
        closingTime: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
          second: 0,
          nano: 0,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: {
          hour: 9,
          minute: 0,
          second: 0,
          nano: 0,
        },
        closingTime: {
          hour: 22,
          minute: 0,
          second: 0,
          nano: 0,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
          second: 0,
          nano: 0,
        },
        isClosed: false,
      },
    ],
    holidays: [
      {
        date: 'MONDAY',
        reason: '정기 휴무',
      },
      {
        date: 'WEDNESDAY',
        reason: '정기 휴무',
      },
    ],
    storeImages: [
      'https://picsum.photos/id/46/800/600',
      'https://picsum.photos/id/47/800/600',
      'https://picsum.photos/id/48/800/600',
      'https://picsum.photos/id/49/800/600',
    ],
    ownerPickImages: [
      'https://picsum.photos/id/50/800/600',
      'https://picsum.photos/id/51/800/600',
      'https://picsum.photos/id/52/800/600',
    ],
  };

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
    holidays: storeSummary.holidays,
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
      <div className="grid grid-cols-[1fr_2fr] md:grid-cols-[0.3fr_2fr] mb-[37px]">
        <HexagonGrid {...hexaGridProps} />
        <SummaryInfoContainer {...storeSummaryProps} />
      </div>
      <StorePreviewPicList {...storePreviewPicListProps} />
    </BottomSheet>
  );
}
