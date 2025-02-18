'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Autoplay,
  type CarouselApi,
} from '@repo/ui/components/carousel';

import { useEffect, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';

import { BANNERS } from '../../../_consts/banner';

import Image from 'next/image';
import Link from 'next/link';

export function BannerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        className="w-full overflow-x-hidden "
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent className="mb-[13px] -ml-0">
          {BANNERS.map((banner) => (
            <CarouselItem
              className={cn(
                banner.bgColor,
                'relative flex justify-between items-center px-[27px] py-6 pl-0 rounded-base w-full',
              )}
              key={banner.content}
            >
              <div className="flex items-center">
                <div className="mr-[18px] ml-6 w-fit flex justify-center items-center">
                  <Image src={banner.imgSrc} alt={banner.content} />
                </div>
                <div className="font-semibold text-[#393939] text-3xl text-nowrap -tracking-[3%] whitespace-pre-line">
                  {banner.content}
                </div>
              </div>
              <Link
                href={banner.path}
                className="right-[15px] bottom-[15px] absolute flex justify-center items-center bg-[#AA6120] px-[27px] py-[9px] rounded-[100px] h-11 font-semibold text-[22px] text-nowrap text-white"
              >
                {banner.btnContent}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute flex bottom-6 left-1/2 gap-2">
        {BANNERS.map((_, index) => (
          <div
            key={index}
            className={cn(
              ' w-2 h-2 rounded-full',
              index === current ? 'bg-[#714115]' : 'bg-[#DE8332]',
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
