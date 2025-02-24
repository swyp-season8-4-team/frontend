import { KakaoMap } from './_components/KakaoMap';
import { BannerCarousel } from './_components/BannerCarousel';

import { CATEGORIES, USER_PREFERENCES } from './_consts/tag';

// import StoreService from '@repo/usecase/src/storeService';
// import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

export default async function MapPage() {
  // 불러올 데이터
  // 1. 선호도 태그 카테고리
  // 2. 유저 선호도 태그
  // 3. 유저가 저장한 가게목록

  // const storeService = new StoreService({
  //   storeRepository: new StoreAPIReopository(),
  // });

  const userPreferences = USER_PREFERENCES; // TODO: API 요청으로 수정
  const preferenceCategories = CATEGORIES; // TODO: API 요청으로 수정

  // const totalSavedList = await storeService.getSavedListAll(
  //   '인증 토큰',
  //   'user-uuid-1',
  // );

  const totalSavedList = [
    {
      listId: 1,
      userUuid: 'user-uuid-123',
      iconColorId: 1,
      listName: '비건 맛집',
      storeCount: 22,
    },
    {
      listId: 2,
      userUuid: 'user-uuid-123',
      iconColorId: 2,
      listName: '다이어터를 위한 곳',
      storeCount: 15,
    },
    {
      listId: 3,
      userUuid: 'user-uuid-123',
      iconColorId: 3,
      listName: '배고프다',
      storeCount: 31,
    },
    {
      listId: 4,
      userUuid: 'user-uuid-123',
      iconColorId: 4,
      listName: '이게 디저트지',
      storeCount: 18,
    },
    {
      listId: 5,
      userUuid: 'user-uuid-123',
      iconColorId: 1,
      listName: '할미 입맛',
      storeCount: 25,
    },
  ];

  // console.log(totalSavedList);

  const kakaoMapProps = {
    userPreferences,
    preferenceCategories,
    totalSavedList,
  };

  return (
    <div className="h-full overflow-hidden scroll-none">
      <div className="px-base h-full">
        <KakaoMap {...kakaoMapProps} />
        <BannerCarousel />
      </div>
    </div>
  );
}
