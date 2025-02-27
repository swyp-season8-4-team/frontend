import { KakaoMap } from './_components/KakaoMap';
import { BannerCarousel } from './_components/BannerCarousel';

import { CATEGORIES, USER_PREFERENCES } from './_consts/tag';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { redirect } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { cookies } from 'next/headers';
import type { SavedListData } from '@repo/entity/src/store';

export default async function MapPage() {
  // 불러올 데이터
  // 1. 선호도 태그 카테고리
  // 2. 유저 선호도 태그
  // 3. 유저가 저장한 가게목록

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const authService = new AuthService({
    authRepository: new AuthNextAppRouteRepository(),
  });

  const userPreferences = USER_PREFERENCES; //TODO
  const preferenceCategories = await storeService.getAllPreference();

  const cookieStore = await cookies();
  const userUuid = cookieStore.get('userUuid');

  const authorization = await authService.getAuthorization();

  // if (!authorization) redirect(NavigationPathname.SignIn);

  let totalSavedList = [] as SavedListData[];

  if (authorization && userUuid?.value) {
    totalSavedList = await storeService.getSavedListAll(
      authorization,
      userUuid.value,
    );
  }

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
