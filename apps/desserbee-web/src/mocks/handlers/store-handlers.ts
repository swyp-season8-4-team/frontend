import { http, HttpResponse } from 'msw';
import type {
  StoreDetailData,
  StoreMapData,
  StoreSavedByUserData,
  StoreSummaryData,
  SavedListItem,
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

    return new HttpResponse(JSON.stringify(storeMapDataList), {
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
      description: '스타벅스 강남점입니다.',
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

  http.get(
    `http://localhost:3000/api/stores/:storeId/summary`,
    async ({ params }) => {
      const storeId = Number(params.storeId);

      const storeSummaryDataList: StoreSummaryData[] = [
        {
          id: 1,
          name: '디저트39 강남점',
          phone: '02-555-1234',
          address: '서울 강남구 강남대로 396',
          storeLink: 'https://instagram.com/dessert39',
          description: '디저트 39 강남점 입니다.',
          averageRating: 4.5,
          operatingHours: '10:00-22:00',
          closingDays: '연중무휴',
          animalYn: true,
          tumblerYn: true,
          parkingYn: true,
          tags: ['디저트', '케이크', '커피'],
          storeImages: [
            'https://picsum.photos/id/42/800/600',
            'https://picsum.photos/id/43/800/600',
            'https://picsum.photos/id/44/800/600',
            'https://picsum.photos/id/45/800/600',
          ],
        },
        {
          id: 2,
          name: '아티제 강남역점',
          phone: '02-555-2345',
          address: '서울 강남구 테헤란로 151',
          storeLink: 'https://instagram.com/artisee',
          description: '아티제 강남역점 입니다.',
          averageRating: 4.3,
          operatingHours: '07:00-23:00',
          closingDays: '설날, 추석',
          animalYn: false,
          tumblerYn: true,
          parkingYn: true,
          tags: ['베이커리', '브런치', '커피'],
          storeImages: [
            'https://picsum.photos/id/46/800/600',
            'https://picsum.photos/id/47/800/600',
            'https://picsum.photos/id/48/800/600',
            'https://picsum.photos/id/49/800/600',
          ],
        },
        {
          id: 3,
          name: '투썸플레이스 강남파이낸스센터점',
          phone: '02-555-3456',
          address: '서울 강남구 테헤란로 152',
          storeLink: 'https://instagram.com/twosome',
          description: '투썸플레이스 강남파이낸스센터점 입니다.',
          averageRating: 4.7,
          operatingHours: '08:00-22:00',
          closingDays: '연중무휴',
          animalYn: false,
          tumblerYn: true,
          parkingYn: true,
          tags: ['디저트', '케이크', '커피'],
          storeImages: [
            'https://picsum.photos/id/50/800/600',
            'https://picsum.photos/id/51/800/600',
            'https://picsum.photos/id/52/800/600',
            'https://picsum.photos/id/53/800/600',
          ],
        },
        {
          id: 4,
          name: '설빙 강남역점',
          phone: '02-555-4567',
          address: '서울 강남구 강남대로 358',
          storeLink: 'https://instagram.com/sulbing',
          description: '설빙 강남역점 입니다.',
          averageRating: 4.4,
          operatingHours: '11:00-22:00',
          closingDays: '연중무휴',
          animalYn: false,
          tumblerYn: false,
          parkingYn: false,
          tags: ['빙수', '디저트', '차'],
          storeImages: [
            'https://picsum.photos/id/54/800/600',
            'https://picsum.photos/id/55/800/600',
            'https://picsum.photos/id/56/800/600',
            'https://picsum.photos/id/57/800/600',
          ],
        },
        {
          id: 5,
          name: '폴바셋 강남역사거리점',
          phone: '02-555-5678',
          address: '서울 강남구 테헤란로 129',
          storeLink: 'https://instagram.com/paulbassett',
          description: '폴바셋 강남역사거리점 입니다.',
          averageRating: 4.6,
          operatingHours: '07:30-22:00',
          closingDays: '설날, 추석',
          animalYn: false,
          tumblerYn: true,
          parkingYn: true,
          tags: ['커피', '베이커리', '브런치'],
          storeImages: [
            'https://picsum.photos/id/58/800/600',
            'https://picsum.photos/id/59/800/600',
            'https://picsum.photos/id/60/800/600',
            'https://picsum.photos/id/61/800/600',
          ],
        },
        {
          id: 6,
          name: '배스킨라빈스 강남우성점',
          phone: '02-555-6789',
          address: '서울 강남구 테헤란로 156',
          storeLink: 'https://instagram.com/baskinrobbins',
          description: '배스킨라빈스 강남우성점 입니다.',
          averageRating: 4.2,
          operatingHours: '10:30-22:00',
          closingDays: '연중무휴',
          animalYn: false,
          tumblerYn: false,
          parkingYn: false,
          tags: ['아이스크림', '디저트', '케이크'],
          storeImages: [
            'https://picsum.photos/id/62/800/600',
            'https://picsum.photos/id/63/800/600',
            'https://picsum.photos/id/64/800/600',
            'https://picsum.photos/id/65/800/600',
          ],
        },
      ];

      const storeSummary = storeSummaryDataList[storeId - 1];

      return new HttpResponse(JSON.stringify(storeSummary), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  ),

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

  http.get(
    `http://localhost:3000/api/users/:userUuid/saved-store-list`,

    async () => {
      const savedStoreList: SavedListItem[] = [
        {
          id: 1,
          colorId: 1,
          title: '비건 맛집',
          count: 22,
        },
        {
          id: 2,
          colorId: 2,
          title: '다이어터를 위한 곳',
          count: 15,
        },
        {
          id: 3,
          colorId: 3,
          title: '배고프다',
          count: 31,
        },
        {
          id: 4,
          colorId: 4,
          title: '이게 디저트지',
          count: 18,
        },
        {
          id: 5,
          colorId: 1,
          title: '할미 입맛',
          count: 25,
        },
      ];
      return new HttpResponse(JSON.stringify(savedStoreList), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  ),
];
