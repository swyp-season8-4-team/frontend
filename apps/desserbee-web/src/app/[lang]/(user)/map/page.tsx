import { BannerCarousel } from "./_components/BannerCarousel";
import { KakaoMap } from "./_components/KakaoMap";
import { PreferenceChips } from "./_components/PreferenceChips";
import { UserPreferenceBtn } from "./_components/UserPreferenceBtn";

import { CATEGORIES } from "./_consts/tag";
export default function MapPage() {
  return (
    <div className="px-base flex flex-col">
      <KakaoMap>
        <PreferenceChips categories={CATEGORIES} />
        <UserPreferenceBtn />
      </KakaoMap>
      <BannerCarousel />
    </div>
  );
}
