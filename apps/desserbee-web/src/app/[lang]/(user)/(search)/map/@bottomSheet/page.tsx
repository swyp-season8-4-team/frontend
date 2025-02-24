import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import { BottomSheetContainer } from './_components/BottomSheetContainer';

interface BottomSheetPageProps {
  searchParams: Promise<{
    bottomsheet: boolean;
    storeId: string;
  }>;
}

export default async function BottomSheetPage({
  searchParams,
}: BottomSheetPageProps) {
  const { storeId, bottomsheet } = await searchParams;
  console.log(storeId);
  //TODO: api 불러오기

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

  return (
    <BottomSheetContainer
      showBottomSheet={bottomsheet}
      storeSummary={storeSummary}
    />
  );
}
