'use client';
import { Carousel, CarouselContent, CarouselItem, Autoplay } from '@repo/ui/components/carousel';
import { BANNERS } from '../_consts/banner';
import bee from '../_assets/svg/logo-bee.svg';
import Image from 'next/image';

export function BannerCarousel() {
  return (
    <Carousel
      className="rounded-[20px] w-full overflow-x-hidden"
      opts={{
        align: 'start',
        containScroll: 'trimSnaps',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}>
      <CarouselContent className="mb-[13px] w-full">
        {BANNERS.map((banner) => (
          <CarouselItem
            className={`relative flex justify-between items-center bg-secondary px-[27px] py-6 rounded-base w-[calc(100vw-16px)] basis-1/${BANNERS.length}`}
            key={banner.content}>
            <div className="flex">
              <Image src={bee} className="mr-[18px]" width={69} height={68} alt="logo" />
              <div className="font-semibold text-3xl text-nowrap -tracking-[3%] whitespace-pre-line">
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
