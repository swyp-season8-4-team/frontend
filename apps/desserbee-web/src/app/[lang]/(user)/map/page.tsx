import { BannerCarousel } from './_components/BannerCarousel';
import { Header } from '@repo/design-system/components/Header';
import { KakaoMap } from './_components/KakaoMap';
import { NavBar } from '@repo/design-system/components/NavBar';
import { PreferenceTags } from './_components/PreferenceTags';

import { CATEGORIES } from './_consts/tag';
export default function MapPage() {
  return (
    <div className="flex flex-col bg-page">
      <Header />
      <div className="px-base">
        <KakaoMap>
          <PreferenceTags categories={CATEGORIES} />
        </KakaoMap>
        <BannerCarousel />
      </div>
      <NavBar />
    </div>
  );
}
