import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import Image from 'next/image';
import { useContext } from 'react';
import { StorePictureCarouselModal } from '../../_modals/StorePictureCarouselModal';
interface StorePictureListProps
  extends Pick<StoreSummaryInfoData, 'storeImages'> {
  menuImages: string[];
}

export function StorePictureList({
  storeImages = [],
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
          images={[...storeImages, ...menuImages]}
          onClose={closeModal}
        />
      ),
    });
  };

  return (
    <div className="flex gap-[9px] md:gap-[22px] py-3 md:py-7">
      {storeImages?.map((image, index) =>
        index === storeImages.length - 1 ? (
          <button
            onClick={handlePlusBtnClick}
            key={image}
            className="relative w-full aspect-[77/69] overflow-hidden"
          >
            <div className="z-10 absolute flex justify-center items-center opacity-100 w-full h-full text-[6vw] text-black cursor-pointer">
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
    </div>
  );
}
