import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import Image from 'next/image';

type StorePreviewPicListProps = Pick<StoreSummaryInfoData, 'ownerPickImages'>;

export function StorePreviewPicList({
  ownerPickImages,
}: StorePreviewPicListProps) {
  if (!ownerPickImages || ownerPickImages.length === 0) return null;

  // 최대 4개의 이미지만 사용
  const displayImages = ownerPickImages.slice(0, 4);
  // 4개에서 모자란 수 계산
  const emptySlots = 4 - displayImages.length;

  return (
    <div className="flex gap-[9.4px] md:gap-[22px]">
      {displayImages.map((image: any) => (
        <div key={image} className="aspect-square w-full">
          <Image
            className="h-full w-full object-cover"
            src={image}
            alt="가게 사진"
            width={190}
            height={162}
          />
        </div>
      ))}

      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="aspect-square w-full bg-gray-100"
        />
      ))}
    </div>
  );
}
