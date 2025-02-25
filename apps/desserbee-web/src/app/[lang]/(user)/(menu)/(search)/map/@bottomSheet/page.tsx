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
    storeId: 1234,
    storeUuid: 'a7e9b5c3-8d21-4f67-90e5-12ab3456789c',
    name: '카페 아로마',
    address: '서울특별시 강남구 테헤란로 123, 1층',
    phone: '02-1234-5678',
    storeLink: 'https://cafe-aroma.com',
    animalYn: true,
    tumblerYn: true,
    parkingYn: false,
    averageRating: 4.7,
    description:
      '조용한 분위기에서 최고급 원두로 내린 커피를 즐길 수 있는 프리미엄 카페입니다. 다양한 디저트와 함께 여유로운 시간을 보내세요.',
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: '08:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: '10:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: '10:00',
        closingTime: '21:00',
        lastOrderTime: '20:30',
        isClosed: false,
      },
    ],
    tags: ['핸드드립', '디저트', '아늑한', '데이트', '스터디'],
    holidays: [
      { date: '2025-01-01', reason: '신정' },
      { date: '2025-02-09', reason: '설날' },
      { date: '2025-05-05', reason: '어린이날' },
    ],
    storeImages: [
      'https://picsum.photos/id/48/800/600',
      'https://picsum.photos/id/49/800/600',
      'https://picsum.photos/id/50/800/600',
      'https://picsum.photos/id/51/800/600',
    ],
    ownerPickImages: [
      'https://picsum.photos/id/52/800/600',
      'https://picsum.photos/id/53/800/600',
    ],
    topPreferences: ['에스프레소', '아메리카노', '카페라떼'],
  };

  return (
    <BottomSheetContainer
      showBottomSheet={bottomsheet}
      storeSummary={storeSummary}
    />
  );
}
