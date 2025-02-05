'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Autoplay,
} from '@repo/ui/components/carousel';
import { BANNERS } from '../_consts/banner';
import bee from '../_assets/svg/logo-bee.svg';
import Image from 'next/image';

export function BannerCarousel() {
  return (
    <Carousel
      className="w-full overflow-x-hidden"
      opts={{
        align: 'start',
        containScroll: 'trimSnaps',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="mb-[13px] -ml-0">
        {BANNERS.map((banner) => (
          <CarouselItem
            className="relative flex justify-between items-center bg-secondary px-[27px] py-6 pl-0 rounded-base w-full"
            key={banner.content}
          >
            <div className="flex">
              <Image
                src={bee}
                className="mr-[18px] ml-6"
                width={69}
                height={68}
                alt="logo"
              />
              <div className="font-semibold text-[#393939] text-3xl text-nowrap -tracking-[3%] whitespace-pre-line">
                {banner.content}
              </div>
            </div>
            <button className="right-[15px] bottom-[15px] absolute flex justify-center items-center bg-[#AA6120] px-[27px] py-[9px] rounded-[100px] h-11 font-semibold text-[22px] text-nowrap text-white">
              {banner.btnContent}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
