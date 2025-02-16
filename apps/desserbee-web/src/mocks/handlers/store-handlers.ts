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

  http.get(
    `http://localhost:3000/api/stores/:storeId/details`,
    async ({ params }) => {
      const storeId = Number(params.storeId);
      const storeDetailsDataList = [
        {
          id: 1,
          name: '디저트39 강남점',
          address: '서울 강남구 강남대로 396',
          operatingHours: '10:00-22:00',
          closingDays: '연중무휴',
          phone: '02-555-1234',
          storeLink: 'https://instagram.com/dessert39',
          description: '디저트 39 강남점 입니다.',
          animalYn: true,
          tumblerYn: true,
          parkingYn: true,
          averageRating: 4.5,
          events: [
            {
              id: 1,
              title: '디저트 페어',
              description: '시그니처 케이크 2개 구매시 1개 무료',
              startDate: new Date('2024-03-01'),
              endDate: new Date('2024-03-31'),
              images: ['https://picsum.photos/id/42/800/600'],
            },
          ],
          menus: [
            {
              id: 1,
              name: '티라미수',
              price: 8500,
              isPopular: true,
              description: '풍부한 마스카포네 크림의 클래식 티라미수',
              images: ['https://picsum.photos/id/43/800/600'],
            },
            {
              id: 2,
              name: '말차 케이크',
              price: 7500,
              isPopular: true,
              description: '진한 말차 크림의 시그니처 케이크',
              images: ['https://picsum.photos/id/44/800/600'],
            },
          ],
          coupons: [
            {
              title: '새친구 웰컴 쿠폰',
              description: '첫 방문 시 전 메뉴 20% 할인',
              expiryDate: '2024-12-31',
            },
          ],
          storeImages: [
            'https://picsum.photos/id/42/800/600',
            'https://picsum.photos/id/43/800/600',
            'https://picsum.photos/id/44/800/600',
            'https://picsum.photos/id/45/800/600',
          ],
          storeReviews: [
            {
              id: 1,
              storeId: 1,
              content: '케이크가 너무 맛있어요! 특히 티라미수가 일품입니다.',
              rating: 5,
              createdAt: '2024-02-10T14:30:00Z',
              images: ['https://picsum.photos/id/42/800/600'],
            },
          ],
          tags: ['디저트', '케이크', '커피'],
        },
        {
          id: 2,
          name: '아티제 강남역점',
          address: '서울 강남구 테헤란로 151',
          operatingHours: '07:00-23:00',
          closingDays: '설날, 추석',
          phone: '02-555-2345',
          storeLink: 'https://instagram.com/artisee',
          description: '아티제 강남역점 입니다.',
          animalYn: false,
          tumblerYn: true,
          parkingYn: true,
          averageRating: 4.3,
          events: [
            {
              id: 1,
              title: '브런치 스페셜',
              description: '평일 오전 브런치 세트 30% 할인',
              startDate: new Date('2024-03-01'),
              endDate: new Date('2024-04-30'),
              images: ['https://picsum.photos/id/46/800/600'],
            },
          ],
          menus: [
            {
              id: 1,
              name: '아보카도 토스트',
              price: 12000,
              isPopular: true,
              description: '신선한 아보카도와 구운 통밀 빵의 조화',
              images: ['https://picsum.photos/id/47/800/600'],
            },
            {
              id: 2,
              name: '크로플',
              price: 6500,
              isPopular: true,
              description: '바삭한 크로와상 와플',
              images: ['https://picsum.photos/id/48/800/600'],
            },
          ],
          coupons: [
            {
              title: '모바일 주문 할인',
              description: '모바일 주문시 5% 할인',
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
              storeId: 2,
              content: '브런치가 정말 맛있어요. 특히 아보카도 토스트 강추!',
              rating: 4,
              createdAt: '2024-02-15T11:20:00Z',
              images: ['https://picsum.photos/id/46/800/600'],
            },
          ],
          tags: ['베이커리', '브런치', '커피'],
        },
        {
          id: 3,
          name: '투썸플레이스 강남파이낸스센터점',
          address: '서울 강남구 테헤란로 152',
          operatingHours: '08:00-22:00',
          closingDays: '연중무휴',
          phone: '02-555-3456',
          storeLink: 'https://instagram.com/twosome',
          description: '투썸플레이스 강남파이낸스센터점 입니다.',
          animalYn: false,
          tumblerYn: true,
          parkingYn: true,
          averageRating: 4.7,
          events: [
            {
              id: 1,
              title: '시즌 스페셜',
              description: '신메뉴 출시 기념 10% 할인',
              startDate: new Date('2024-03-15'),
              endDate: new Date('2024-04-15'),
              images: ['https://picsum.photos/id/50/800/600'],
            },
          ],
          menus: [
            {
              id: 1,
              name: '뉴욕 치즈케이크',
              price: 7500,
              isPopular: true,
              description: '부드러운 치즈의 풍미가 가득한 프리미엄 케이크',
              images: ['https://picsum.photos/id/51/800/600'],
            },
          ],
          coupons: [
            {
              title: '멤버십 할인',
              description: '멤버십 회원 케이크 15% 할인',
              expiryDate: '2024-12-31',
            },
          ],
          storeImages: [
            'https://picsum.photos/id/50/800/600',
            'https://picsum.photos/id/51/800/600',
            'https://picsum.photos/id/52/800/600',
            'https://picsum.photos/id/53/800/600',
          ],
          storeReviews: [
            {
              id: 1,
              storeId: 3,
              content: '매장이 깔끔하고 케이크가 맛있어요!',
              rating: 5,
              createdAt: '2024-02-12T15:45:00Z',
              images: ['https://picsum.photos/id/50/800/600'],
            },
          ],
          tags: ['디저트', '케이크', '커피'],
        },
        {
          id: 4,
          name: '설빙 강남역점',
          address: '서울 강남구 강남대로 358',
          operatingHours: '11:00-22:00',
          closingDays: '연중무휴',
          phone: '02-555-4567',
          storeLink: 'https://instagram.com/sulbing',
          description: '설빙 강남역점 입니다.',
          animalYn: false,
          tumblerYn: false,
          parkingYn: false,
          averageRating: 4.4,
          events: [
            {
              id: 1,
              title: '여름 빙수 페스티벌',
              description: '인기 빙수 2인 세트 메뉴 20% 할인',
              startDate: new Date('2024-07-01'),
              endDate: new Date('2024-08-31'),
              images: ['https://picsum.photos/id/54/800/600'],
            },
          ],
          menus: [
            {
              id: 1,
              name: '인절미 설빙',
              price: 12000,
              isPopular: true,
              description: '곱게 갈은 우유 얼음과 인절미의 환상적인 조화',
              images: ['https://picsum.photos/id/55/800/600'],
            },
          ],
          coupons: [
            {
              title: '여름 시즌 쿠폰',
              description: '빙수 메뉴 2,000원 할인',
              expiryDate: '2024-08-31',
            },
          ],
          storeImages: [
            'https://picsum.photos/id/54/800/600',
            'https://picsum.photos/id/55/800/600',
            'https://picsum.photos/id/56/800/600',
            'https://picsum.photos/id/57/800/600',
          ],
          storeReviews: [
            {
              id: 1,
              storeId: 4,
              content: '인절미 설빙이 진짜 맛있어요! 양도 많아요',
              rating: 4,
              createdAt: '2024-02-14T13:30:00Z',
              images: ['https://picsum.photos/id/54/800/600'],
            },
          ],
          tags: ['빙수', '디저트', '차'],
        },
        {
          id: 5,
          name: '폴바셋 강남역사거리점',
          address: '서울 강남구 테헤란로 129',
          operatingHours: '07:30-22:00',
          closingDays: '설날, 추석',
          phone: '02-555-5678',
          storeLink: 'https://instagram.com/paulbassett',
          description: '폴바셋 강남역사거리점 입니다.',
          animalYn: false,
          tumblerYn: true,
          parkingYn: true,
          averageRating: 4.6,
          events: [
            {
              id: 1,
              title: '아침 커피 타임',
              description: '오픈 2시간 동안 아메리카노 50% 할인',
              startDate: new Date('2024-03-01'),
              endDate: new Date('2024-05-31'),
              images: ['https://picsum.photos/id/58/800/600'],
            },
          ],
          menus: [
            {
              id: 1,
              name: '시그니처 라떼',
              price: 6500,
              isPopular: true,
              description: '폴바셋만의 특별한 블렌드로 만든 라떼',
              images: ['https://picsum.photos/id/59/800/600'],
            },
          ],
          coupons: [
            {
              title: '텀블러 할인',
              description: '텀블러 사용시 500원 할인',
              expiryDate: '2024-12-31',
            },
          ],
          storeImages: [
            'https://picsum.photos/id/58/800/600',
            'https://picsum.photos/id/59/800/600',
            'https://picsum.photos/id/60/800/600',
            'https://picsum.photos/id/61/800/600',
          ],
          storeReviews: [
            {
              id: 1,
              storeId: 5,
              content: '커피 퀄리티가 항상 일정하게 좋아요',
              rating: 5,
              createdAt: '2024-02-13T08:15:00Z',
              images: ['https://picsum.photos/id/58/800/600'],
            },
          ],
          tags: ['커피', '베이커리', '브런치'],
        },
        {
          id: 6,
          name: '배스킨라빈스 강남우성점',
          address: '서울 강남구 테헤란로 156',
          operatingHours: '10:30-22:00',
          closingDays: '연중무휴',
          phone: '02-555-6789',
          storeLink: 'https://instagram.com/baskinrobbins',
          description: '배스킨라빈스 강남우성점 입니다.',
          animalYn: false,
          tumblerYn: false,
          parkingYn: false,
          averageRating: 4.2,
          events: [
            {
              id: 1,
              title: '패밀리데이',
              description: '패밀리 사이즈 아이스크림 케이크 30% 할인',
              startDate: new Date('2024-03-01'),
              endDate: new Date('2024-03-31'),
              images: ['https://picsum.photos/id/62/800/600'],
            },
          ],
          menus: [
            {
              id: 1,
              name: '엄마는 외계인',
              price: 3500,
              isPopular: true,
              description: '초콜릿과 민트의 완벽한 조화',
              images: ['https://picsum.photos/id/63/800/600'],
            },
          ],
          coupons: [
            {
              title: '생일 특별 쿠폰',
              description: '생일 고객 아이스크림 케이크 20% 할인',
              expiryDate: '2024-12-31',
            },
          ],
          storeImages: [
            'https://picsum.photos/id/62/800/600',
            'https://picsum.photos/id/63/800/600',
            'https://picsum.photos/id/64/800/600',
            'https://picsum.photos/id/65/800/600',
          ],
          storeReviews: [
            {
              id: 1,
              storeId: 6,
              content:
                '아이들이 좋아하는 맛이 다 있어요! 직원분들도 친절하세요',
              rating: 4,
              createdAt: '2024-02-11T16:20:00Z',
              images: ['https://picsum.photos/id/62/800/600'],
            },
          ],
          tags: ['아이스크림', '디저트', '케이크'],
        },
      ];

      const storeDetail = storeDetailsDataList[storeId - 1];

      return HttpResponse.json(storeDetail);
    },
  ),

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
