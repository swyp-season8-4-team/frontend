'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Autoplay,
  type CarouselApi,
} from '@repo/ui/components/carousel';

import { useContext, useEffect, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';

import { BANNERS } from '../../_consts/banner';

import Image from 'next/image';
import Link from 'next/link';

import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { CouponIsNotReadyModal } from '../../_modals/CouponIsNotReadyModal';
import { UserContext } from '@/contexts/UserContext';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
});

export function BannerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { push, pop } = useContext(PortalContext);
  const { user } = useContext(UserContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleDessertReviewBtnClick = async (
    e: React.MouseEvent,
    index: number,
  ) => {
    if (index === 2) {
      e.preventDefault();
      push('modal', {
        component: <CouponIsNotReadyModal onClose={closeModal} />,
      });
      await commonErrorHandler(storeService.updateCouponCount());
    }
  };

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
        className="w-full overflow-hidden"
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
        {/* <CarouselContent className="mb-[9px] md:mb-[13px] -ml-0"> */}
        <CarouselContent className="-ml-0 mb-[9px]">
          {BANNERS.map((banner, index) => (
            <CarouselItem
              className={cn(
                banner.bgColor,
                // 'relative flex justify-between items-center pt-[13px] pb-[17px] md:pr-[27px] md:py-6 pl-0 rounded-base w-full',
                'rounded-base relative flex w-full items-center justify-between pb-[17px] pl-0 pt-[13px]',
              )}
              key={banner.content}
            >
              <div className="flex items-center">
                {/* <div className="flex justify-center items-center mr-[9.51px] md:mr-[18px] ml-2 md:ml-6 w-[33.49px] md:w-[69px] h-[33px] md:h-[68px]"> */}
                <div className="ml-2 mr-[9.51px] flex h-[33px] w-[33.49px] items-center justify-center">
                  <Image src={banner.imgSrc} alt={banner.content} />
                </div>
                {/* <div className="font-semibold text-[#393939] text-base md:text-3xl text-nowrap -tracking-[3%] whitespace-pre-line"> */}
                <div className="whitespace-pre-line text-nowrap text-base font-semibold -tracking-[3%] text-[#393939]">
                  {banner.content}
                </div>
              </div>
              {!(index === 1 && user) && (
                <Link
                  onClick={(e) => handleDessertReviewBtnClick(e, index)}
                  href={banner.path}
                  // className="right-[15px] bottom-[15px] absolute flex justify-center items-center bg-[#AA6120] px-[12.88px] md:px-[27px] py-[3.68px] md:py-[9px] rounded-[100px] font-semibold text-[10.12px] text-white md:text-[22px] text-nowrap"
                  className="absolute bottom-[15px] right-[15px] flex items-center justify-center text-nowrap rounded-[100px] bg-[#AA6120] px-[12.88px] py-[3.68px] text-[10.12px] font-semibold text-white"
                >
                  {banner.btnContent}
                </Link>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="bottom-4 md:bottom-6 left-1/2 absolute flex gap-2 -translate-x-1/2 transform"> */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
        {BANNERS.map((_, index) => (
          <div
            key={index}
            className={cn(
              // 'w-[3.77px] h-[3.77px] md:w-2 md:h-2 rounded-full',
              'h-[3.77px] w-[3.77px] rounded-full',
              index === current ? 'bg-[#714115]' : 'bg-[#DE8332]',
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
