import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import Image from 'next/image';
import { useContext } from 'react';
import { StorePictureCarouselModal } from '../../../_modals/StorePictureCarouselModal';
interface StorePictureListProps
  extends Pick<StoreSummaryInfoData, 'ownerPickImages'> {
  menuImages: string[];
}

export function StorePictureList({
  ownerPickImages = [],
  menuImages = [],
}: StorePictureListProps) {
  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handlePlusBtnClick = () => {
    push('modal', {
      component: (
        <StorePictureCarouselModal
          images={[...ownerPickImages, ...menuImages]}
          onClose={closeModal}
        />
      ),
    });
  };

  // 최대 4개의 이미지만 보여줌
  const displayImages = [...ownerPickImages, ...menuImages].slice(0, 4);
  // 빈 슬롯 계산 (항상 4개 슬롯을 채우기 위해)
  const emptySlots = Math.max(0, 4 - displayImages.length);
  // 4개 이상의 이미지가 있는지 확인
  const hasMoreImages = ownerPickImages.length > 4 || menuImages.length > 0;

  return (
    <div className="flex gap-[9px] md:gap-[22px] py-3 md:py-7">
      {displayImages.map((image, index) =>
        index === displayImages.length - 1 && hasMoreImages ? (
          <button
            onClick={handlePlusBtnClick}
            key={image}
            className="relative w-full aspect-[77/69] overflow-hidden"
          >
            <div className="z-10 absolute flex justify-center items-center opacity-100 w-full h-full text-[4vw] text-black cursor-pointer">
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
      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="w-full aspect-[190/162] bg-gray-100"
        />
      ))}
    </div>
  );
}
