import { KakaoMap } from "./_components/KakaoMap";
import { PreferenceTags } from "./_components/PreferenceTags";
import { CATEGORIES } from "./_consts/tag";
export default function MapPage() {
  return (
    <div className="px-base">
      <KakaoMap>
        <PreferenceTags categories={CATEGORIES} />
      </KakaoMap>
    </div>
  );
}
