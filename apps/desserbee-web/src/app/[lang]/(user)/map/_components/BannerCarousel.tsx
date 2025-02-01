"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Autoplay,
} from "@repo/ui/components/carousel";
import { BANNERS } from "../_consts/banner";

export function BannerCarousel() {
  return (
    <Carousel
      className="w-full rounded-[20px] "
      opts={{
        align: "start",
        containScroll: "trimSnaps",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}>
      <CarouselContent className="-ml-2 ">
        {BANNERS.map((banner) => (
          <CarouselItem
            key={banner.content}
            className={`pl-8 pr-3 flex items-center py-[11px] justify-between shadow-2xl rounded-[20px]`}>
            <div className="font-semibold text-3xl whitespace-pre-line">
              {banner.content}
            </div>
            <button className="h-full p-10 font-semibold text-lg rounded-[20px] shadow-lg">
              {banner.btnContent}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
