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
import type { Menu } from '@repo/entity/src/store';

interface PictureCarouselModalProps {
  menus: Menu[];
  onClose: () => void;
}

export function MenuPictureCarouselModal({
  menus = [],
  onClose,
}: PictureCarouselModalProps) {
  const [imagesPerPage, setImagesPerPage] = useState(8);

  useEffect(() => {
    const updateImagesPerPage = () => {
      if (window.innerWidth < 768) {
        setImagesPerPage(4);
      } else {
        setImagesPerPage(8);
      }
    };

    updateImagesPerPage(); // 초기 설정
    window.addEventListener('resize', updateImagesPerPage);

    return () => {
      window.removeEventListener('resize', updateImagesPerPage);
    };
  }, []);

  const totalPages = Math.ceil(menus.length / imagesPerPage);

  const getPageImages = (pageIndex: number) => {
    const startIndex = pageIndex * imagesPerPage;
    return menus.slice(startIndex, startIndex + imagesPerPage);
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
      className="top-[50%] p-4 md:p-4 rounded-[6.91px] md:rounded-base min-w-[293px] md:max-w-[689px] aspect-[293/333] md:aspect-[250/193]"
    >
      <div className="h-full">
        <Carousel
          setApi={setApi}
          className="relative flex flex-col justify-center w-full h-full"
        >
          <div className="flex items-end md:ml-[59px] font-semibold text-[8px] sm:text-base md:text-xl">
            <div>메뉴 &nbsp;</div>
            <div className="text-[#898989]">{menus.length}</div>
          </div>
          <CarouselContent className="h-full">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <CarouselItem key={pageIndex} className="w-full">
                <div className="gap-x-20 gap-y-1 md:gap-[14px] grid grid-cols-2 md:grid-cols-4 md:px-[59px] h-full">
                  {getPageImages(pageIndex).map((menu, menuIndex) => (
                    <div key={`${pageIndex}-${menuIndex}`} className="">
                      <div className="relative bg-[#D2D2D2] rounded-[5px] md:rounded-xl md:max-h-[133px] aspect-square overflow-hidden">
                        {menu.images ? (
                          <Image
                            src={menu.images[0]}
                            alt={`메뉴 사진 ${pageIndex * imagesPerPage + menuIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="leading-none">
                        <div className="text-[10px] sm:text-[16px]">
                          {menu.name}
                        </div>
                        <div className="text-[10px] sm:text-[14px]">
                          {menu.price}
                        </div>
                        <div className="text-[#6F6F6F] text-[10px] sm:text-[11px]">
                          {menu.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="top-1/2 left-[-19px] md:left-[-20px] z-modal absolute -translate-y-1/2">
            <div
              onClick={() => api?.scrollPrev()}
              className="w-6 md:w-14 h-7 md:h-14 cursor-pointer"
            >
              <IconDirection className="w-full h-full text-[#9F9F9F] rotate-90 transfrom" />
            </div>
          </div>
          <div className="top-1/2 right-[-19px] md:right-[-20px] z-modal absolute -translate-y-1/2">
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
