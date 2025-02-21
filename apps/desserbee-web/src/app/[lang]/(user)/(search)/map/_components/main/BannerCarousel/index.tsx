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

import { BANNERS } from '../../../_consts/banner';

import Image from 'next/image';
import Link from 'next/link';

// import { ReviewNotReadyModal } from '../../modal/ReviewNotReadyModal';
import { ReviewNotReadyModal } from '../../modal/ReviewNotReadyModal/bee';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { CouponIsNotReadyModal } from '../../modal/CouponIsNotReadyModal';

export function BannerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleDessertReviewBtnClick = (e: React.MouseEvent, index: number) => {
    if (index === 3) {
      e.preventDefault();
      push('modal', {
        component: <ReviewNotReadyModal onClose={closeModal} />,
      });
    } else if (index === 2) {
      e.preventDefault();
      push('modal', {
        component: <CouponIsNotReadyModal onClose={closeModal} />,
      });
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
        <CarouselContent className="mb-[9px] md:mb-[13px] -ml-0">
          {BANNERS.map((banner, index) => (
            <CarouselItem
              className={cn(
                banner.bgColor,
                'relative flex justify-between items-center pt-[13px] pb-[17px] md:pr-[27px] md:py-6 pl-0 rounded-base w-full',
              )}
              key={banner.content}
            >
              <div className="flex items-center">
                <div className="flex justify-center items-center mr-[9.51px] md:mr-[18px] ml-2 md:ml-6 w-[33.49px] md:w-[69px] h-[33px] md:h-[68px]">
                  <Image src={banner.imgSrc} alt={banner.content} />
                </div>
                <div className="font-semibold text-[#393939] text-base md:text-3xl text-nowrap -tracking-[3%] whitespace-pre-line">
                  {banner.content}
                </div>
              </div>
              <Link
                onClick={(e) => handleDessertReviewBtnClick(e, index)}
                href={banner.path}
                className="right-[15px] bottom-[15px] absolute flex justify-center items-center bg-[#AA6120] px-[12.88px] md:px-[27px] py-[3.68px] md:py-[9px] rounded-[100px] font-semibold text-[10.12px] text-white md:text-[22px] text-nowrap"
              >
                {banner.btnContent}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="bottom-4 md:bottom-6 left-1/2 absolute flex gap-2 -translate-x-1/2 transform">
        {BANNERS.map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-[3.77px] h-[3.77px] md:w-2 md:h-2 rounded-full',
              index === current ? 'bg-[#714115]' : 'bg-[#DE8332]',
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
