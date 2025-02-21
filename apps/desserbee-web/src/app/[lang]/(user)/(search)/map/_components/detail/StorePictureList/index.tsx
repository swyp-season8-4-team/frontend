import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import Image from 'next/image';
type StorePictureListProps = Pick<StoreSummaryInfoData, 'storeImages'>;

export function StorePictureList({ storeImages }: StorePictureListProps) {
  return (
    <div className="flex gap-[9px] md:gap-[22px] py-3 md:py-7">
      {storeImages?.map((image, index) =>
        index === storeImages.length - 1 ? (
          <button
            key={image}
            className="relative w-full aspect-[77/69] overflow-hidden"
          >
            <div className="z-10 absolute flex justify-center items-center opacity-100 w-full h-full text-[6vw] text-black">
              +
            </div>
            <Image
              className="opacity-50 w-full h-full object-cover"
              src={image}
              alt="가게 사진"
              width={190}
              height={162}
            />
          </button>
        ) : (
          <div key={image} className="w-full aspect-[190/162]">
            <Image
              className="w-full h-full object-cover"
              src={image}
              alt="가게 사진"
              width={190}
              height={162}
            />
          </div>
        ),
      )}

      {/* TODO: 사진 더보기 논의되면 추가 */}
    </div>
  );
}
