import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import Image from 'next/image';
import ReadyBee from '@/assets/images/bee_icon_ready.png';

type StorePreviewPicListProps = Pick<StoreSummaryInfoData, 'ownerPickImages'>;

export function StorePreviewPicList({
  ownerPickImages,
}: StorePreviewPicListProps) {
  if (!ownerPickImages) return null;

  // 최대 4개의 이미지만 사용
  const displayImages = ownerPickImages.slice(0, 4);
  // 4개에서 모자란 수 계산
  const emptySlots = 4 - displayImages.length;

  // 빈 칸에 넣을 이미지가 필요한 경우: 준비된 꿀벌 이미지로 채움
  const placeholderImages =
    !ownerPickImages || ownerPickImages.length === 0
      ? Array(4).fill(ReadyBee)
      : Array(emptySlots).fill(ReadyBee);

  return (
    <div className="flex gap-[9.4px] md:gap-[22px]">
      {displayImages.map((image: any) => (
        <div
          key={typeof image === 'object' && image.id ? image.id : image}
          className="aspect-square w-full"
        >
          <Image
            className="h-full w-full object-cover"
            src={typeof image === 'object' && image.url ? image.url : image}
            alt="가게 사진"
            width={190}
            height={162}
          />
        </div>
      ))}

      {placeholderImages.map((src, index) => (
        <div
          key={`placeholder-${index}`}
          className="bg-neutral-80 flex aspect-square w-full flex-col items-center justify-center"
        >
          <Image
            className="h-[50%] w-[50%] object-contain opacity-50"
            src={src}
            alt="준비중 이미지"
            width={90}
            height={90}
          />
          <span className="mt-2 text-[8px] text-gray-500 md:text-xs">
            No Image
          </span>
        </div>
      ))}
    </div>
  );
}
