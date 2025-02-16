import IconPlus from '@repo/design-system/components/icons/IconPlus';
import type { StoreSummaryData } from '@repo/entity/src/store';
import Image from 'next/image';
type StorePictureListProps = Pick<StoreSummaryData, 'storeImages'>;

export function StorePictureList({ storeImages }: StorePictureListProps) {
  return (
    <div className="flex gap-[22px] py-7">
      {storeImages.map((image, index) =>
        index === storeImages.length - 1 ? ( // TODO: 항상 사진이 4개 채워져있는지
          <button
            key={image}
            className="relative w-full aspect-[190/162] overflow-hidden"
          >
            <div className="absolute z-10 opacity-100 w-full h-full flex justify-center items-center text-[6vw] text-black">
              +
            </div>
            <Image
              className="w-full h-full object-cover opacity-50"
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
