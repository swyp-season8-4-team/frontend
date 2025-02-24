import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import Image from 'next/image';

type StorePreviewPicListProps = Pick<StoreSummaryInfoData, 'storeImages'>;

export function StorePreviewPicList({ storeImages }: StorePreviewPicListProps) {
  if (!storeImages) return;

  return (
    <div className="flex gap-[9.4px] md:gap-[22px]">
      {storeImages.map((image) => (
        <div key={image} className="w-full aspect-[165/161]">
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt="가게 사진"
            width={190}
            height={162}
          />
        </div>
      ))}
      {Array.from({ length: 4 - storeImages.length }, (_, i) => (
        <div key={i} className="w-full aspect-[165/161]" />
      ))}
    </div>
  );
}
