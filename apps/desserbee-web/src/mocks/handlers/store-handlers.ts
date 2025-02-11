import { http, HttpResponse } from 'msw';
import type {
  StoreDetailData,
  StoreMapData,
  StoreSavedByUserData,
  StoreSummaryData,
} from '@repo/entity/src/store';

export const storeHandlers = [
  http.get('http://localhost:3000/api/stores', async ({ request }) => {
    const url = new URL(request.url);
    const latitude = url.searchParams.get('latitude');
    const longitude = url.searchParams.get('longitude');
    const radius = url.searchParams.get('radius');

    // StoreMapData[]
    const storeMapDataList: StoreMapData[] = [
      {
        id: 1,
        name: '디저트39 강남점',
        address: '서울 강남구 강남대로 396',
        latitude: 37.497175,
        longitude: 127.027926,
      },
      {
        id: 2,
        name: '아티제 강남역점',
        address: '서울 강남구 테헤란로 151',
        latitude: 37.499462,
        longitude: 127.028274,
      },
      {
        id: 3,
        name: '투썸플레이스 강남파이낸스센터점',
        address: '서울 강남구 테헤란로 152',
        latitude: 37.500175,
        longitude: 127.029046,
      },
      {
        id: 4,
        name: '설빙 강남역점',
        address: '서울 강남구 강남대로 358',
        latitude: 37.496533,
        longitude: 127.0268,
      },
      {
        id: 5,
        name: '폴바셋 강남역사거리점',
        address: '서울 강남구 테헤란로 129',
        latitude: 37.498325,
        longitude: 127.027892,
      },
      {
        id: 6,
        name: '배스킨라빈스 강남우성점',
        address: '서울 강남구 테헤란로 156',
        latitude: 37.500929,
        longitude: 127.028979,
      },
    ];

    if (
      Number(latitude) === 37.498095 &&
      Number(longitude) === 127.028979 &&
      Number(radius) === 2
    ) {
      return new HttpResponse(JSON.stringify(storeMapDataList), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new HttpResponse(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.get(`http://localhost:3000/api/stores/1/details`, async () => {
    // StoreDetailData
    const storeDetailData: StoreDetailData = {
      id: 1,
      name: '스타벅스 강남점',
      address: '서울 강남구 테헤란로 101',
      operatingHours: '09:00-22:00',
      closingDays: '연중무휴',
      phone: '02-555-1234',
      storeLink: 'https://instagram.com/store1',
      animalYn: true,
      tumblerYn: true,
      parkingYn: false,
      averageRating: 4.5,
      events: [
        {
          id: 1,
          title: '여름 시즌 프로모션',
          description: '아이스 음료 20% 할인',
          startDate: new Date('2024-07-01'),
          endDate: new Date('2024-08-31'),
          images: ['https://picsum.photos/id/44/800/600'],
        },
      ],
      menus: [
        {
          id: 1,
          name: '아메리카노',
          price: 4500,
          isPopular: true,
          description: '깊고 진한 에스프레소의 맛',
          images: ['https://picsum.photos/id/45/800/600'],
        },
      ],
      coupons: [
        {
          title: '신규 가입 쿠폰',
          description: '첫 주문 시 3,000원 할인',
          expiryDate: '2024-12-31',
        },
      ],
      storeImages: [
        'https://picsum.photos/id/46/800/600',
        'https://picsum.photos/id/47/800/600',
        'https://picsum.photos/id/48/800/600',
        'https://picsum.photos/id/49/800/600',
      ],
      storeReviews: [
        {
          id: 1,
          storeId: 1,
          content: '분위기가 너무 좋아요!',
          rating: 5,
          createdAt: '2024-02-07T09:00:00Z',
          images: ['https://picsum.photos/id/48/800/600'],
        },
      ],
      tags: ['베이커리', '루프탑 있음', '애완동물 동반 가능'],
    };
    return HttpResponse.json(storeDetailData);
  }),

  http.get(`http://localhost:3000/api/stores/1/summary`, async () => {
    const storeSummaryData: StoreSummaryData = {
      id: 1,
      name: '스타벅스 강남점',
      phone: '02-555-1234',
      address: '서울 강남구 테헤란로 101',
      storeLink: 'https://instagram.com/store1',
      averageRating: 4.5,
      operatingHours: '09:00-22:00',
      closingDays: '연중무휴',
      animalYn: true,
      tumblerYn: true,
      parkingYn: false,
      tags: ['베이커리', '루프탑 있음', '애완동물 동반 가능'],
      storeImages: [
        'https://picsum.photos/id/42/800/600',
        'https://picsum.photos/id/43/800/600',
        'https://picsum.photos/id/48/800/600',
        'https://picsum.photos/id/49/800/600',
      ],
    };

    return new HttpResponse(JSON.stringify(storeSummaryData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.get(`/api/users/1/saved-stores`, () => {
    // StoreDetailData
    const storeSavedByUserDataList: StoreSavedByUserData[] = [
      {
        id: 1,
        storeId: 1,
        storeName: '스타벅스 강남점',
        address: '서울 강남구 테헤란로 101',
        storeLink: 'https://instagram.com/store1',
        savedAt: '2024-02-07T09:00:00Z',
      },
      {
        id: 2,
        storeId: 2,
        storeName: '투썸플레이스 역삼점',
        address: '서울 강남구 역삼로 110',
        storeLink: 'https://instagram.com/store2',
        savedAt: '2024-02-06T15:30:00Z',
      },
      {
        id: 3,
        storeId: 3,
        storeName: '폴바셋 선릉점',
        address: '서울 강남구 선릉로 123',
        storeLink: 'https://instagram.com/store3',
        savedAt: '2024-02-05T11:20:00Z',
      },
      {
        id: 4,
        storeId: 4,
        storeName: '커피빈 삼성점',
        address: '서울 강남구 삼성로 145',
        storeLink: 'https://instagram.com/store4',
        savedAt: '2024-02-04T16:45:00Z',
      },
      {
        id: 5,
        storeId: 5,
        storeName: '블루보틀 압구정점',
        address: '서울 강남구 압구정로 156',
        storeLink: 'https://instagram.com/store5',
        savedAt: '2024-02-03T13:15:00Z',
      },
    ];
    return new HttpResponse(JSON.stringify(storeSavedByUserDataList), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.get(`/api/store`, async () => {
    return HttpResponse.json({});
  }),
];
