import { DetailContainer } from './_components/DetailContainer';

// import StoreService from '@repo/usecase/src/storeService';
// import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import type { StoreDetailInfoData } from '@repo/entity/src/store';

interface StoreDetailPageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function StoreDetailPage({
  params,
}: StoreDetailPageProps) {
  const { storeId } = await params;

  console.log('상세페이지: ' + storeId);

  // const storeService = new StoreService({
  //   storeRepository: new StoreAPIReopository(),
  // });

  // const storeDetail = await storeService.getStoreDetail(storeId);

  const storeDetail: StoreDetailInfoData = {
    storeId: 1234,
    storeUuid: 'b8f7c5e9-3d21-4f67-90e5-12ab3456789d',
    name: '스타벅스 강남점',
    address: '서울 강남구 테헤란로 101',
    phone: '02-555-1234',
    storeLink: 'https://instagram.com/store1',
    description: '스타벅스 강남점입니다.',
    animalYn: true,
    tumblerYn: true,
    parkingYn: false,
    averageRating: 4.5,
    latitude: 37.4989,
    longitude: 127.0287,
    tags: ['케이크', '구움과자', '건강 디저트'],
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: '09:10',
        closingTime: '22:10',
        lastOrderTime: '21:30',
        isClosed: true,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: '09:10',
        closingTime: '22:10',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: '09:10',
        closingTime: '22:10',
        lastOrderTime: '21:30',
        isClosed: true,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: '09:10',
        closingTime: '22:10',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: '09:10',
        closingTime: '22:10',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: '09:10',
        closingTime: '22:10',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: '09:10',
        closingTime: '22:10',
        lastOrderTime: '21:30',
        isClosed: false,
      },
    ],
    holidays: [
      {
        date: '2025-02-24',
        reason: '정기 휴무',
      },
      {
        date: '2025-02-26',
        reason: '정기 휴무',
      },
    ],
    notice: [
      'No sugar, Low carb, Gluten free _ 초콜릿과 팥앙금 등 부재료 또한 하나부터 열까지 설탕 없이 직접 만듭니다.',
      '인스타그램 @ketobbang 에서 소식을 확인해주세요.',
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
    topPreferences: ['아메리카노', '카페라떼', '바닐라 프라푸치노'],
    userId: null,
    userUuid: null,
    ownerId: 5678,
    ownerUuid: 'e5d4c3b2-a198-7654-3210-9876fedc5432',
    menus: [
      {
        menuUuid: 'menu-uuid-1',
        name: '아메리카노',
        price: 4500,
        isPopular: true,
        description: '깔끔한 맛의 아메리카노',
        images: ['https://picsum.photos/id/53/800/600'],
      },
      {
        menuUuid: 'menu-uuid-2',
        name: '카페라떼',
        price: 5000,
        isPopular: true,
        description: '부드러운 우유와 에스프레소',
        images: ['https://picsum.photos/id/54/800/600'],
      },
    ],
    totalReviewCount: 245,
    storeReviews: [],
    mate: [],
    saved: false,
    savedListId: null,
  };

  return <DetailContainer storeDetail={storeDetail} />;
}
