import { KakaoMap } from './_components/main/KakaoMap';
import { BannerCarousel } from './_components/main/BannerCarousel';

import { CATEGORIES, USER_PREFERENCES } from './_consts/tag';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

export default async function MapPage() {
  // 불러올 데이터
  // 1. 선호도 태그 카테고리
  // 2. 유저 선호도 태그
  // 3. 유저가 저장한 가게목록
  // 모두 KakaoMap으로 props 전달 - SideBar에 유저저장 가게목록 전달
  // BottomSheet는 csr로?
  // 상세페이지는 그냥 페이지 이동하는걸로? 아니면 interceptiong으로.

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const userPreferences = USER_PREFERENCES; // TODO: API 요청으로 수정
  const preferenceCategories = CATEGORIES; // TODO: API 요청으로 수정

  const totalSavedList = await storeService.getSavedListAll(
    '인증 토큰',
    'user-uuid-1',
  );

  console.log(totalSavedList);

  const kakaoMapProps = {
    userPreferences,
    preferenceCategories,
    totalSavedList,
  };

  return (
    <div className="overflow-hidden">
      <div className="px-base h-full">
        <KakaoMap {...kakaoMapProps} />
        <BannerCarousel />
        {/* <Modal buttons={<Button>test</Button>} title="test" visible={true} /> */}
      </div>
    </div>
  );
}
