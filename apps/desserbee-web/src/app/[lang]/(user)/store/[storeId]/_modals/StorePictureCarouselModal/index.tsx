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
      className="md:rounded-base top-[50%] aspect-[229.78/170] w-[60%] max-w-[700px] rounded-[6.91px] p-[13.5px] md:p-[46px]"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-end"></div>
        <Carousel setApi={setApi} className="relative w-full flex-1">
          <CarouselContent>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <CarouselItem key={pageIndex} className="h-full w-full">
                <div className="grid h-full grid-cols-3 justify-center gap-2 pt-3">
                  {getPageImages(pageIndex).map((image, imageIndex) => (
                    <div
                      key={`${pageIndex}-${imageIndex}`}
                      className="max-w-1/3 relative aspect-[1/1] select-none overflow-hidden rounded-[3px] bg-[#D2D2D2]"
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
          <div className="z-modal absolute left-[-19px] top-1/2 -translate-y-1/2 md:left-[-50px]">
            <div
              onClick={() => api?.scrollPrev()}
              className="h-7 w-6 cursor-pointer md:h-14 md:w-14"
            >
              <IconDirection className="transfrom h-full w-full rotate-90 text-[#9F9F9F]" />
            </div>
          </div>
          <div className="z-modal absolute right-[-19px] top-1/2 -translate-y-1/2 md:right-[-50px]">
            <div
              onClick={() => api?.scrollNext()}
              className="h-7 w-6 cursor-pointer md:h-14 md:w-14"
            >
              <IconDirection className="transfrom absolute right-0 top-0 h-full w-full -rotate-90 text-[#9F9F9F]" />
            </div>
          </div>
        </Carousel>
      </div>
    </CustomModal>
  );
}
