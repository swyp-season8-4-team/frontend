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

  const filteredMenus = menus.filter((menu) => menu.images?.[0]);

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

  if (!filteredMenus.length) return <div>표시할 메뉴 이미지가 없습니다.</div>;

  return (
    <div className="z-modal relative">
      <div className="animate-fadeIn fixed inset-0 bg-neutral-800/60" />
      <div
        className={cn(
          'animate-fadeIn fixed left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] border border-[#6F6F6F] bg-white',
          'md:rounded-base h-[90vh] max-h-[800px] w-[90vw] max-w-[700px] p-4 md:p-4',
        )}
      >
        <div className="relative h-full">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white"
          >
            <svg
              className="h-5 w-5"
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
            className="relative flex h-full w-full flex-col justify-center"
            opts={{
              skipSnaps: true,
              duration: 0,
            }}
          >
            <CarouselContent className="h-full">
              {filteredMenus.map((menu, index) => (
                <CarouselItem
                  key={index}
                  className="flex h-full w-full items-center justify-center"
                >
                  <div className="relative flex h-[calc(90vh-120px)] max-h-[700px] select-none items-center justify-center">
                    <Image
                      src={menu.images![0]}
                      alt={menu.name}
                      width={1200}
                      height={800}
                      className="h-auto max-h-full w-auto max-w-full object-contain"
                      priority
                    />
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
      </div>
    </div>
  );
}
