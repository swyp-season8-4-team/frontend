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
  // ownerPickImages가 storeImage[]일 경우 url만 추출
  const ownerPickImageUrls = ownerPickImages.map((img) =>
    typeof img === 'string' ? img : img.url,
  );

  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handlePlusBtnClick = () => {
    push('modal', {
      component: (
        <StorePictureCarouselModal
          images={[...ownerPickImageUrls, ...menuImages]}
          onClose={closeModal}
        />
      ),
    });
  };

  // 최대 4개의 이미지만 보여줌
  const displayImages = [...ownerPickImageUrls, ...menuImages].slice(0, 4);
  // 빈 슬롯 계산 (항상 4개 슬롯을 채우기 위해)
  const emptySlots = Math.max(0, 4 - displayImages.length);
  // 4개 이상의 이미지가 있는지 확인
  const hasMoreImages = ownerPickImageUrls.length > 4 || menuImages.length > 0;

  return (
    <div className="flex gap-[9px] py-3 md:gap-[22px] md:py-7">
      {displayImages.map((image, index) =>
        index === displayImages.length - 1 && hasMoreImages ? (
          <button
            onClick={handlePlusBtnClick}
            key={image}
            className="relative aspect-[77/69] w-full overflow-hidden"
          >
            <div className="absolute z-10 flex h-full w-full cursor-pointer items-center justify-center text-[4vw] text-black opacity-100">
              +
            </div>
            <Image
              className="h-full w-full object-cover opacity-50"
              src={image}
              alt="가게 사진"
              width={190}
              height={162}
            />
          </button>
        ) : (
          <div key={image} className="aspect-[190/162] w-full">
            <Image
              className="h-full w-full object-cover"
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
          className="aspect-[190/162] w-full bg-gray-100"
        />
      ))}
    </div>
  );
}
