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
import { MenuOnePictureCarouselModal } from '../MenuOnePictureCarouselModal/index';

interface PictureCarouselModalProps {
  menus: Menu[];
  onClose: () => void;
}

export function MenuPictureCarouselModal({
  menus = [],
  onClose,
}: PictureCarouselModalProps) {
  const [imagesPerPage, setImagesPerPage] = useState(8);
  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);
  const [showOneImageModal, setShowOneImageModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const totalPages = Math.ceil(menus.length / imagesPerPage);

  const getPageImages = (pageIndex: number) => {
    const startIndex = pageIndex * imagesPerPage;
    return menus.slice(startIndex, startIndex + imagesPerPage);
  };

  const handleMenuImageClick = (menu: Menu) => {
    if (menu.images?.[0]) {
      setSelectedMenu(menu);
      setShowOneImageModal(true);
    }
  };

  useEffect(() => {
    const updateImagesPerPage = () => {
      if (window.innerWidth > 1024) {
        setImagesPerPage(8);
      } else if (window.innerWidth >= 767) {
        setImagesPerPage(6);
      } else {
        setImagesPerPage(4);
      }
    };

    updateImagesPerPage(); // 초기 설정
    window.addEventListener('resize', updateImagesPerPage);

    return () => {
      window.removeEventListener('resize', updateImagesPerPage);
    };
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  if (!menus) return <div>메뉴가 존재하지 않습니다.</div>;
  return (
    <CustomModal
      isCloseBtnShow={false}
      onClose={onClose}
      className="md:rounded-base top-[50%] min-w-[293px] p-4 md:max-w-[689px] md:p-4"
    >
      <div className="h-full">
        <Carousel
          setApi={setApi}
          className="relative flex h-full w-full flex-col justify-center"
        >
          <div className="flex items-end text-[10px] font-semibold sm:text-base md:text-xl">
            <div>메뉴 &nbsp;</div>
            <div className="text-[#898989]">{menus.length}</div>
          </div>
          <CarouselContent className="h-full">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <CarouselItem key={pageIndex} className="w-full">
                <div className="grid h-full grid-cols-2 gap-x-10 gap-y-1 md:grid-cols-3 md:grid-rows-2 md:gap-[14px] md:px-4 lg:grid-cols-4">
                  {getPageImages(pageIndex).map((menu, menuIndex) => (
                    <div key={`${pageIndex}-${menuIndex}`} className="">
                      <div
                        className="relative aspect-square cursor-pointer select-none overflow-hidden rounded-xl bg-[#eeeeee] md:max-h-[133px]"
                        onClick={() => handleMenuImageClick(menu)}
                      >
                        {menu.images && menu.images.length > 0 ? (
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
                        <div className="text-[10px] sm:text-[14px]">
                          {menu.name}
                        </div>
                        <div className="text-[10px] sm:text-[14px]">
                          {menu.price}
                        </div>
                        <div className="text-[10px] text-[#6F6F6F] sm:text-[11px]">
                          {menu.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="z-modal absolute left-[-19px] top-1/2 -translate-y-1/2 md:left-[-20px]">
            <div
              onClick={() => api?.scrollPrev()}
              className="h-7 w-6 cursor-pointer md:h-14 md:w-14"
            >
              <IconDirection className="transfrom h-full w-full rotate-90 text-[#9F9F9F]" />
            </div>
          </div>
          <div className="z-modal absolute right-[-19px] top-1/2 -translate-y-1/2 md:right-[-20px]">
            <div
              onClick={() => api?.scrollNext()}
              className="h-7 w-6 cursor-pointer md:h-14 md:w-14"
            >
              <IconDirection className="transfrom absolute right-0 top-0 h-full w-full -rotate-90 text-[#9F9F9F]" />
            </div>
          </div>
        </Carousel>
      </div>
      {showOneImageModal && selectedMenu && (
        <MenuOnePictureCarouselModal
          menus={menus}
          initialIndex={menus.findIndex((menu) => menu === selectedMenu)}
          onClose={() => setShowOneImageModal(false)}
        />
      )}
    </CustomModal>
  );
}
