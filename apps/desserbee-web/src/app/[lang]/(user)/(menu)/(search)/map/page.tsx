import { KakaoMap } from './_components/KakaoMap';
import { BannerCarousel } from './_components/BannerCarousel';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import NotFound from '@/app/[lang]/[...not-found]/page';

export default async function MapPage() {
  // 불러올 데이터
  // 1. 선호도 태그 카테고리
  // 2. 유저 선호도 태그
  // 3. 유저가 저장한 가게목록

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  let preferenceCategories;

  try {
    preferenceCategories = await storeService.getAllPreference();
  } catch (error) {
    console.log(error);

    return <NotFound />;
  }

  // if (!authorization) redirect(NavigationPathname.SignIn);

  const kakaoMapProps = {
    preferenceCategories,
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
