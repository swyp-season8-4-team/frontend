import Image from 'next/image';
import { CustomModal } from '@repo/design-system/components/Modal/custom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@repo/ui/components/carousel';
import { useEffect, useState } from 'react';
import IconDirection from '@repo/design-system/components/icons/IconDirection';

interface PictureCarouselModalProps {
  images: string[];
  onClose: () => void;
}

export function StorePictureCarouselModal({
  images = [],
  onClose,
}: PictureCarouselModalProps) {
  const imagesPerPage = 6;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const getPageImages = (pageIndex: number) => {
    const startIndex = pageIndex * imagesPerPage;
    return images.slice(startIndex, startIndex + imagesPerPage);
  };

  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <CustomModal
      isCloseBtnShow={false}
      onClose={onClose}
      className="top-[50%] p-[13.5px] md:p-[46px] rounded-[6.91px] md:rounded-base w-[70%] md:w-[60%] aspect-[229.78/170]"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-end">
          <h2 className="font-semibold text-[8px] sm:text-base md:text-xl">
            가게 사진 모아보기
          </h2>
        </div>
        <Carousel setApi={setApi} className="relative flex-1 w-full">
          <CarouselContent>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <CarouselItem key={pageIndex} className="w-full">
                <div className="justify-center gap-2 grid grid-cols-3">
                  {getPageImages(pageIndex).map((image, imageIndex) => (
                    <div
                      key={`${pageIndex}-${imageIndex}`}
                      className="relative bg-[#D2D2D2] max-w-1/3 aspect-[1/1] overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`가게 사진 ${pageIndex * imagesPerPage + imageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="top-1/2 left-[-19px] md:left-[-50px] z-modal absolute -translate-y-1/2">
            <div
              onClick={() => api?.scrollPrev()}
              className="w-6 md:w-14 h-7 md:h-14 cursor-pointer"
            >
              <IconDirection className="w-full h-full text-[#9F9F9F] rotate-90 transfrom" />
            </div>
          </div>
          <div className="top-1/2 right-[-19px] md:right-[-50px] z-modal absolute -translate-y-1/2">
            <div
              onClick={() => api?.scrollNext()}
              className="w-6 md:w-14 h-7 md:h-14 cursor-pointer"
            >
              <IconDirection className="top-0 right-0 absolute w-full h-full text-[#9F9F9F] -rotate-90 transfrom" />
            </div>
          </div>
        </Carousel>
      </div>
    </CustomModal>
  );
}
