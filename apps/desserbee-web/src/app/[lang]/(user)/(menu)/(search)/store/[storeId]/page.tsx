import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import type { StoreDetailInfoData } from '@repo/entity/src/store';
import { DetailContainer } from './_components/(detail)/DetailContainer';

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
      {
        menuUuid: 'menu-uuid-2',
        name: '카페라떼',
        price: 5000,
        isPopular: true,
        description: '부드러운 우유와 에스프레소',
        images: ['https://picsum.photos/id/54/800/600'],
      },
      {
        menuUuid: 'menu-uuid-2',
        name: '카페라떼',
        price: 5000,
        isPopular: true,
        description: '부드러운 우유와 에스프레소',
        images: ['https://picsum.photos/id/54/800/600'],
      },
      {
        menuUuid: 'menu-uuid-2',
        name: '카페라떼',
        price: 5000,
        isPopular: true,
        description: '부드러운 우유와 에스프레소',
        images: ['https://picsum.photos/id/54/800/600'],
      },
      {
        menuUuid: 'menu-uuid-2',
        name: '카페라떼',
        price: 5000,
        isPopular: true,
        description: '부드러운 우유와 에스프레소',
        images: ['https://picsum.photos/id/54/800/600'],
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
    storeReviews: [
      {
        nickname: '굳!',
        profileImage: 'https://picsum.photos/id/54/800/600',
        reviewUuid: 'a685344e-f01f-457d-8b43-cbe59e1b061',
        storeId: 13,
        content: '정말 맛있어요! 분위기도 최고예요 😊',
        rating: 4.5,
        createdAt: '2025-02-13T01:08:34.353868',
        images: [],
      },
      {
        nickname: '굳!',
        profileImage: 'https://picsum.photos/id/54/800/600',
        reviewUuid: 'a685344e-f01f-457d-38b43-cbe189e1b061',
        storeId: 13,
        content: '정말 맛있어요! 분위기도 최고예요 😊',
        rating: 4.5,
        createdAt: '2025-02-13T01:08:34.353868',
        images: [],
      },
      {
        nickname: '굳!',
        profileImage: 'https://picsum.photos/id/54/800/600',
        reviewUuid: 'a685344e-f01f-457d-8b43-cbe189e1b021',
        storeId: 13,
        content: '정말 맛있어요! 분위기도 최고예요 😊',
        rating: 4.5,
        createdAt: '2025-02-13T01:08:34.353868',
        images: [],
      },
      {
        nickname: '굳!',
        profileImage: 'https://picsum.photos/id/54/800/600',
        reviewUuid: 'a685344e-f01f-457d-8b43-cbe189e3b061',
        storeId: 13,
        content: '정말 맛있어요! 분위기도 최고예요 😊',
        rating: 4.5,
        createdAt: '2025-02-13T01:08:34.353868',
        images: [],
      },
      {
        nickname: '굳!',
        profileImage: 'https://picsum.photos/id/54/800/600',
        reviewUuid: 'a685344e-f01f-457d-8b43-cbe181e1b061',
        storeId: 13,
        content: '정말 맛있어요! 분위기도 최고예요 😊',
        rating: 4.5,
        createdAt: '2025-02-13T01:08:34.353868',
        images: [],
      },
    ],

    mate: [
      {
        mateUuid: 'f01f-457d-8b43-cbe181e1b061',
        mateCategory: '친목도모',
        thumbnail: 'https://picsum.photos/id/54/800/600',
        title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
        content:
          '디저트 추천도 해주고 새로운 맛집도 공유하면 좋을 것 같아요요 ',
        nickname: '울랄라',
        recruitYn: true,
      },
      {
        mateUuid: 'f01f-457d-8b43-cbe181e1b061',
        mateCategory: '친목도모',
        thumbnail: 'https://picsum.photos/id/54/800/600',
        title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
        content:
          '디저트 추천도 해주고 새로운 맛집도 공유하면 좋을 것 같아요요 ',
        nickname: '울랄라',
        recruitYn: false,
      },
      {
        mateUuid: 'f01f-457d-8b43-cbe181e1b061',
        mateCategory: '친목도모',
        thumbnail: 'https://picsum.photos/id/54/800/600',
        title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
        content:
          '디저트 추천도 해주고 새로운 맛집도 공유하면 좋을 것 같아요요 ',
        nickname: '울랄라',
        recruitYn: true,
      },
      {
        mateUuid: 'f01f-457d-8b43-cbe181e1b061',
        mateCategory: '친목도모',
        thumbnail: 'https://picsum.photos/id/54/800/600',
        title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
        content:
          '디저트 추천도 해주고 새로운 맛집도 공유하면 좋을 것 같아요요 ',
        nickname: '울랄라',
        recruitYn: false,
      },
      {
        mateUuid: 'f01f-457d-8b43-cbe181e1b061',
        mateCategory: '친목도모',
        thumbnail: 'https://picsum.photos/id/54/800/600',
        title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
        content:
          '디저트 추천도 해주고 새로운 맛집도 공유하면 좋을 것 같아요요 ',
        nickname: '울랄라',
        recruitYn: true,
      },
      {
        mateUuid: 'f01f-457d-8b43-cbe181e1b061',
        mateCategory: '친목도모',
        thumbnail: 'https://picsum.photos/id/54/800/600',
        title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
        content: '디저트 추천도 해주고 새로운 맛집도 공유하면 좋을 것 같아요요',
        nickname: '울랄라',
        recruitYn: true,
      },
    ],
    saved: false,
    savedListId: null,
  };

  return <DetailContainer storeDetail={storeDetail} />;
}
