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
        openingTime: {
          hour: 9,
          minute: 10,
        },
        closingTime: {
          hour: 22,
          minute: 10,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
        },
        isClosed: true,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: {
          hour: 9,
          minute: 10,
        },
        closingTime: {
          hour: 22,
          minute: 10,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: {
          hour: 9,
          minute: 10,
        },
        closingTime: {
          hour: 22,
          minute: 10,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
        },
        isClosed: true,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: {
          hour: 9,
          minute: 10,
        },
        closingTime: {
          hour: 22,
          minute: 10,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: {
          hour: 9,
          minute: 10,
        },
        closingTime: {
          hour: 22,
          minute: 10,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: {
          hour: 9,
          minute: 10,
        },
        closingTime: {
          hour: 22,
          minute: 10,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
        },
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: {
          hour: 9,
          minute: 10,
        },
        closingTime: {
          hour: 22,
          minute: 10,
        },
        lastOrderTime: {
          hour: 21,
          minute: 30,
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
  };

  return <DetailContainer storeDetail={storeDetail} />;
}
