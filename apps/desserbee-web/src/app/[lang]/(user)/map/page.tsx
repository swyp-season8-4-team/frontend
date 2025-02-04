import { BannerCarousel } from "./_components/BannerCarousel";
import { Header } from "./_components/Header";
import { KakaoMap } from "./_components/KakaoMap";
import { NavBar } from "./_components/NavBar";
import { PreferenceChips } from "./_components/PreferenceChips";
import { UserPreferenceBtn } from "./_components/UserPreferenceBtn";

import { CATEGORIES } from "./_consts/tag";
export default function MapPage() {
  return (
    <div className="flex flex-col bg-page">
      <Header />
      <div className="px-base">
        <KakaoMap>
          <PreferenceChips categories={CATEGORIES} />
          <UserPreferenceBtn />
        </KakaoMap>
        <BannerCarousel />
      </div>
      <NavBar />
    </div>
  );
}
