// import { http, HttpResponse } from 'msw';
// import type {
//   NearByStoreData,
//   SavedListData,
//   StoreSummaryInfoData,
//   StoreDetailInfoData,
//   StoresInSavedListData,
// } from '@repo/entity/src/store';

// export const storeHandlers = [
//   // 반경내 가게 조회
//   http.get('http://localhost:3000/api/stores', async ({ request }) => {
//     // const url = new URL(request.url);
//     // const latitude = url.searchParams.get('latitude');
//     // const longitude = url.searchParams.get('longitude');
//     // const radius = url.searchParams.get('radius');

//     const storeMapDataList: NearByStoreData[] = [
//       {
//         storeId: 1,
//         storeUuid: 'uuid-1',
//         name: '디저트39 강남점',
//         address: '서울 강남구 강남대로 396',
//         latitude: 37.497175,
//         longitude: 127.027926,
//       },
//       {
//         storeId: 2,
//         storeUuid: 'uuid-2',
//         name: '아티제 강남역점',
//         address: '서울 강남구 테헤란로 151',
//         latitude: 37.499462,
//         longitude: 127.028274,
//       },
//       {
//         storeId: 3,
//         storeUuid: 'uuid-3',
//         name: '투썸플레이스 강남파이낸스센터점',
//         address: '서울 강남구 테헤란로 152',
//         latitude: 37.500175,
//         longitude: 127.029046,
//       },
//       {
//         storeId: 4,
//         storeUuid: 'uuid-4',
//         name: '설빙 강남역점',
//         address: '서울 강남구 강남대로 358',
//         latitude: 37.496533,
//         longitude: 127.0268,
//       },
//       {
//         storeId: 5,
//         storeUuid: 'uuid-5',
//         name: '폴바셋 강남역사거리점',
//         address: '서울 강남구 테헤란로 129',
//         latitude: 37.498325,
//         longitude: 127.027892,
//       },
//       {
//         storeId: 6,
//         storeUuid: 'uuid-6',
//         name: '배스킨라빈스 강남우성점',
//         address: '서울 강남구 테헤란로 156',
//         latitude: 37.500929,
//         longitude: 127.028979,
//       },
//     ];

//     return new HttpResponse(JSON.stringify(storeMapDataList), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }),

//   // 가게 상세정보 조회
//   http.get(`http://localhost:3000/api/stores/:storeUuid/details`, async () => {
//     // const storeUuid = params.storeUuid;

//     const storeDetailInfoData: StoreDetailInfoData = {
//       name: '스타벅스 강남점',
//       address: '서울 강남구 테헤란로 101',
//       phone: '02-555-1234',
//       storeLink: 'https://instagram.com/store1',
//       description: '스타벅스 강남점입니다.',
//       animalYn: true,
//       tumblerYn: true,
//       parkingYn: false,
//       averageRating: 4.5,
//       latitude: 37.4989,
//       longitude: 127.0287,
//       tags: ['케이크', '구움과자', '건강 디저트'],
//       operatingHours: [
//         {
//           dayOfWeek: 'MONDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: true,
//         },
//         {
//           dayOfWeek: 'TUESDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'WEDNESDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: true,
//         },
//         {
//           dayOfWeek: 'THURSDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'FRIDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'SATURDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'SUNDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//       ],
//       holidays: [
//         {
//           date: 'MONDAY',
//           reason: '정기 휴무',
//         },
//         {
//           date: 'WEDNESDAY',
//           reason: '정기 휴무',
//         },
//       ],
//       notice: [
//         'No sugar, Low carb, Gluten free _ 초콜릿과 팥앙금 등 부재료 또한 하나부터 열까지 설탕 없이 직접 만듭니다.',
//         '인스타그램 @ketobbang 에서 소식을 확인해주세요.',
//       ],
//       storeImages: [
//         'https://picsum.photos/id/46/800/600',
//         'https://picsum.photos/id/47/800/600',
//         'https://picsum.photos/id/48/800/600',
//         'https://picsum.photos/id/49/800/600',
//       ],
//       ownerPickImages: [
//         'https://picsum.photos/id/50/800/600',
//         'https://picsum.photos/id/51/800/600',
//         'https://picsum.photos/id/52/800/600',
//       ],
//     };
//     return HttpResponse.json(storeDetailInfoData);
//   }),

//   http.get(`http://localhost:3000/api/stores/:storeUuid/summary`, async () => {
//     // const storeUuid = params.storeUuid;

//     const storeSummaryInfoData: StoreSummaryInfoData = {
//       storeUuid: 'store-uuid-123',
//       name: '스타벅스 강남점',
//       address: '서울 강남구 테헤란로 101',
//       phone: '02-555-1234',
//       storeLink: 'https://instagram.com/store1',
//       description: '스타벅스 강남점입니다.',
//       animalYn: true,
//       tumblerYn: true,
//       parkingYn: false,
//       averageRating: 4.5,
//       tags: ['케이크', '구움과자', '건강 디저트'],
//       operatingHours: [
//         {
//           dayOfWeek: 'MONDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: true,
//         },
//         {
//           dayOfWeek: 'TUESDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'WEDNESDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: true,
//         },
//         {
//           dayOfWeek: 'THURSDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'FRIDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'SATURDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//         {
//           dayOfWeek: 'SUNDAY',
//           openingTime: {
//             hour: 9,
//             minute: 0,
//           },
//           closingTime: {
//             hour: 22,
//             minute: 0,
//           },
//           lastOrderTime: {
//             hour: 21,
//             minute: 30,
//           },
//           isClosed: false,
//         },
//       ],
//       holidays: [
//         {
//           date: 'MONDAY',
//           reason: '정기 휴무',
//         },
//         {
//           date: 'WEDNESDAY',
//           reason: '정기 휴무',
//         },
//       ],
//       storeImages: [
//         'https://picsum.photos/id/46/800/600',
//         'https://picsum.photos/id/47/800/600',
//         'https://picsum.photos/id/48/800/600',
//         'https://picsum.photos/id/49/800/600',
//       ],
//       ownerPickImages: [
//         'https://picsum.photos/id/50/800/600',
//         'https://picsum.photos/id/51/800/600',
//         'https://picsum.photos/id/52/800/600',
//       ],
//     };

//     return new HttpResponse(JSON.stringify(storeSummaryInfoData), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }),

//   // 저장 리스트
//   http.get(
//     `http://localhost:3000/api/user-store/:userUuid/lists`,

//     async () => {
//       const savedStoreList: SavedListData[] = [
//         {
//           listId: 1,
//           userUuid: 'user-uuid-123',
//           iconColorId: 1,
//           listName: '비건 맛집',
//           storeCount: 22,
//         },
//         {
//           listId: 2,
//           userUuid: 'user-uuid-123',
//           iconColorId: 2,
//           listName: '다이어터를 위한 곳',
//           storeCount: 15,
//         },
//         {
//           listId: 3,
//           userUuid: 'user-uuid-123',
//           iconColorId: 3,
//           listName: '배고프다',
//           storeCount: 31,
//         },
//         {
//           listId: 4,
//           userUuid: 'user-uuid-123',
//           iconColorId: 4,
//           listName: '이게 디저트지',
//           storeCount: 18,
//         },
//         {
//           listId: 5,
//           userUuid: 'user-uuid-123',
//           iconColorId: 1,
//           listName: '할미 입맛',
//           storeCount: 25,
//         },
//       ];
//       return new HttpResponse(JSON.stringify(savedStoreList), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     },
//   ),

//   // 리스트별 저장된 가게 리스트
//   http.get(`/api/user-store/lists/:listId/stores`, () => {
//     const StoresInSavedListDataList: StoresInSavedListData[] = [
//       {
//         userUuid: 'user-uuid-123',
//         storeUuid: 'store-uuid-123',
//         listName: '맛집',
//         storeName: '스타벅스 강남점',
//         storeAddress: '서울 강남구 테헤란로 101',
//         imageUrls: [
//           'https://picsum.photos/id/46/800/600',
//           'https://picsum.photos/id/47/800/600',
//           'https://picsum.photos/id/48/800/600',
//           'https://picsum.photos/id/49/800/600',
//         ],
//       },
//       {
//         userUuid: 'user-uuid-123',
//         storeUuid: 'store-uuid-123',
//         listName: '맛집',
//         storeName: '스타벅스 강남점',
//         storeAddress: '서울 강남구 테헤란로 101',
//         imageUrls: [
//           'https://picsum.photos/id/46/800/600',
//           'https://picsum.photos/id/47/800/600',
//           'https://picsum.photos/id/48/800/600',
//           'https://picsum.photos/id/49/800/600',
//         ],
//       },
//       {
//         userUuid: 'user-uuid-123',
//         storeUuid: 'store-uuid-123',
//         listName: '맛집',
//         storeName: '스타벅스 강남점',
//         storeAddress: '서울 강남구 테헤란로 101',
//         imageUrls: [
//           'https://picsum.photos/id/46/800/600',
//           'https://picsum.photos/id/47/800/600',
//           'https://picsum.photos/id/48/800/600',
//           'https://picsum.photos/id/49/800/600',
//         ],
//       },
//       {
//         userUuid: 'user-uuid-123',
//         storeUuid: 'store-uuid-123',
//         listName: '맛집',
//         storeName: '스타벅스 강남점',
//         storeAddress: '서울 강남구 테헤란로 101',
//         imageUrls: [
//           'https://picsum.photos/id/46/800/600',
//           'https://picsum.photos/id/47/800/600',
//           'https://picsum.photos/id/48/800/600',
//           'https://picsum.photos/id/49/800/600',
//         ],
//       },
//       {
//         userUuid: 'user-uuid-123',
//         storeUuid: 'store-uuid-123',
//         listName: '맛집',
//         storeName: '스타벅스 강남점',
//         storeAddress: '서울 강남구 테헤란로 101',
//         imageUrls: [
//           'https://picsum.photos/id/46/800/600',
//           'https://picsum.photos/id/47/800/600',
//           'https://picsum.photos/id/48/800/600',
//           'https://picsum.photos/id/49/800/600',
//         ],
//       },
//     ];
//     return new HttpResponse(JSON.stringify(StoresInSavedListDataList), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }),
// ];
