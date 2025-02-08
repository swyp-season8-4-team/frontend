import { BannerCarousel } from './_components/BannerCarousel';
import { KakaoMap } from './_components/KakaoMap';
import { PreferenceTags } from './_components/PreferenceTags';

import { CATEGORIES } from './_consts/tag';

export default function MapPage() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="px-base">
          <KakaoMap>
            <PreferenceTags categories={CATEGORIES} />
          </KakaoMap>
          <BannerCarousel />
        </div>
      </div>
    </div>
  );
}
