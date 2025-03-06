import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@repo/ui/components/carousel';
import { useEffect, useState } from 'react';
import IconDirection from '@repo/design-system/components/icons/IconDirection';
import type { Menu } from '@repo/entity/src/store';
import { cn } from '@repo/ui/lib/utils';

interface MenuOnePictureCarouselModalProps {
  menus: Menu[];
  initialIndex?: number;
  onClose: () => void;
}

export function MenuOnePictureCarouselModal({
  menus = [],
  initialIndex = 0,
  onClose,
}: MenuOnePictureCarouselModalProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);

  useEffect(() => {
    if (api) {
      api.scrollTo(initialIndex);
    }
  }, [api, initialIndex]);

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
    <div className="z-modal relative">
      <div className="fixed inset-0 bg-neutral-800/60 animate-fadeIn" />
      <div
        className={cn(
          'top-[50%] left-1/2 fixed bg-white border border-[#6F6F6F] rounded-[10px] -translate-x-1/2 -translate-y-1/2 transform animate-fadeIn',
          'p-4 md:p-4 md:rounded-base w-[90vw] h-[90vh] max-w-[1200px] max-h-[800px]',
        )}
      >
        <div className="h-full relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Carousel
            setApi={setApi}
            className="relative flex flex-col justify-center w-full h-full"
          >
            <CarouselContent className="h-full">
              {menus.map((menu, index) => (
                <CarouselItem
                  key={index}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="relative h-[calc(90vh-120px)] max-h-[700px] flex items-center justify-center">
                    {menu.images && menu.images.length > 0 ? (
                      <Image
                        src={menu.images[0]}
                        alt={menu.name}
                        width={1200}
                        height={800}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-[#eeeeee]" />
                    )}
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
      </div>
    </div>
  );
}
