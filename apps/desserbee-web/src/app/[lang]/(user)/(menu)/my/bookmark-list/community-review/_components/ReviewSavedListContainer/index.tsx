'use client';

import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import defaultImage from '@/assets/svg/image-default-mate.svg';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@repo/ui/components/carousel';
import IconDirection from '@repo/design-system/components/icons/IconDirection';
import { cancelSave, getSavedReviewList, saveReview } from './action';
import type { SavedReview } from '@repo/entity/src/review';
import { formatDateToHHMM } from '@repo/utility/src/date';

interface ReviewSavedListContainerProps {
  reviews: SavedReview[];
  isLast: boolean;
}

export function ReviewSavedListContainer({
  reviews: initialMates,
}: ReviewSavedListContainerProps) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [savedReviews, setSavedReviews] = useState<SavedReview[]>(initialMates);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [fromTo, setFromTo] = useState({ from: 0, to: itemsToShow });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToShow(4); // 여기서 세로로 몇 개 보여줄지 정하고 아래에서 grid-cols 해주면 원하는대로 정렬 가능
      } else {
        setItemsToShow(8);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setFromTo({ from: 0, to: itemsToShow });
  }, [itemsToShow]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      const currentSlide = api.selectedScrollSnap();
      setCurrent(currentSlide);

      const newFrom = currentSlide * itemsToShow;
      const newTo = (currentSlide + 1) * itemsToShow;

      // 드래그 동작에서도 항상 fromTo 업데이트
      setFromTo({
        from: newFrom,
        to: newTo,
      });
    };

    // 초기 위치 설정
    setCurrent(api.selectedScrollSnap());

    // select 이벤트 리스너 등록
    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api, itemsToShow]);

  useEffect(() => {
    const loadSavedMates = async () => {
      try {
        const response = await getSavedReviewList(fromTo);

        if (!response) {
          console.warn('서버 응답 없음');
          return;
        }

        setSavedReviews((prev) => {
          const newReviews = [...prev];
          response.reviews.forEach((review, index) => {
            newReviews[fromTo.from + index] = review;
          });
          return newReviews;
        });

        setIsLast(response.last);
      } catch (error) {
        console.error('데이터 로딩 중 에러:', error);
      }
    };

    loadSavedMates();
  }, [fromTo]);

  const handleCancelSaved = async (uuid: string) => {
    if (!user) {
      router.replace('/sign-in');
      return;
    }

    const confirmed = confirm('해당 게시글 저장을 취소하시겠습니까?');
    if (confirmed) {
      await cancelSave({ reviewUuid: uuid });
      setSavedReviews((prev) =>
        prev.filter((review) => review.reviewUuid !== uuid),
      );
      router.refresh();
    }
  };

  const handleSaveMate = async (uuid: string) => {
    if (!user) {
      router.replace('/sign-in');
      return;
    }

    await saveReview({ reviewUuid: uuid });
    router.refresh();
  };

  const handleNextPage = () => {
    if (!api) return;

    api.scrollNext();
  };

  const handlePrevPage = () => {
    if (!api) return;

    api.scrollPrev();
  };

  return (
    <Carousel setApi={setApi} className="w-full h-full text-xs md:text-xl">
      <div className="text-xs md:text-[26px] font-semibold mb-4 md:leading-7">
        <div>{user?.nickname}님께서 저장한 리뷰 입니다! </div>
      </div>
      <CarouselContent>
        {Array.from({
          length: Math.ceil(savedReviews.length / itemsToShow),
        }).map((_, page) => (
          <CarouselItem key={page}>
            <div className="grid grid-cols-1 md:grid-cols-2 px-[34px] md:gap-x-3 gap-y-[5px] md:gap-y-3">
              {savedReviews
                .slice(page * itemsToShow, (page + 1) * itemsToShow)
                .map(
                  (
                    {
                      reviewUuid,
                      nickname,
                      contents,
                      title,
                      reviewCategory,
                      createdAt,
                      saved,
                      views,
                    },
                    index,
                  ) => (
                    <div
                      className="bg-white rounded-[4.02px] p-1 relative"
                      key={`${reviewUuid}-${index}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-[10px] px-1 md:px-2  md:text-[14px] h-fit border rounded-[40.24px] md:rounded-[60px] border-[#6F6F6F] text-[#6F6F6F]">
                          <div className="text-[8px] md:text-[12px]">
                            {reviewCategory}
                          </div>
                        </div>
                        <div className="flex gap-x-[4.83px] items-center text-[10px] md:text-[14px]">
                          <div className="border-[#714115] rounded-full aspect-square border">
                            <button
                              className="w-[10.46px] h-[10.46px] md:w-[20px] md:h-[20px] flex justify-center items-center"
                              onClick={() =>
                                !saved
                                  ? handleCancelSaved(reviewUuid)
                                  : handleSaveMate(reviewUuid)
                              }
                            >
                              <IconBookmark
                                className={cn(
                                  !saved ? 'text-[#AA6120]' : 'text-page',
                                  'md:w-3 md:h-3 w-2 h-2',
                                )}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex justify-center items-center w-[39px] h-[39px] md:w-[67px] md:h-[67px] flex-shrink-0 m-1 aspect-square bg-[#D9D9D9] overflow-hidden">
                          <Image
                            className={cn(
                              contents[0]?.imageUrl
                                ? 'w-full h-full'
                                : 'w-1/2 h-1/2',
                            )}
                            src={
                              contents[0]?.imageUrl
                                ? contents[0]?.imageUrl
                                : defaultImage.src
                            }
                            width={50}
                            height={50}
                            alt={nickname}
                          />
                        </div>
                        <div className="flex flex-col h-[39px] md:h-[67px] justify-between items-start">
                          <div className="font-semibold text-[12px] md:text-base line-clamp-1">
                            {title}
                          </div>
                          <div className="text-[10px] md:text-[14px] line-clamp-1">
                            {contents.map((content, cIndex) => (
                              <div key={`${content.type}-${cIndex}`}>
                                {content.value}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 md:gap-[9px]">
                            <div className="text-[10px] md:text-[14px] font-medium">
                              {nickname}님
                            </div>
                            <div className="flex items-center gap-1 text-[#9F9F9F] ">
                              <div className="text-[9px] md:text-xs">
                                {formatDateToHHMM(createdAt)}
                              </div>
                              <div className="text-[9px] md:text-xs">
                                조회&nbsp;{views}
                              </div>
                            </div>
                          </div>
                          <button className="absolute bg-primary text-[8px] md:text-[10px] bottom-1 right-1 text-white px-2 py-1 md:py-[6px] leading-none h-fit rounded-base">
                            보러가기
                          </button>
                        </div>
                      </div>
                    </div>
                  ),
                )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {current > 0 && (
        <div className="top-1/2 left-[-5px] md:left-[-10px] z-modal absolute translate-y-1/2">
          <div
            onClick={handlePrevPage}
            className="w-6 md:w-10 h-7 md:h-10 cursor-pointer"
          >
            <IconDirection className="w-full h-full text-[#9F9F9F] rotate-90 transfrom" />
          </div>
        </div>
      )}
      {!isLast && (
        <div className="top-1/2 right-[-5px] md:right-[-10px] z-modal absolute translate-y-1/2">
          <div
            onClick={handleNextPage}
            className="w-6 md:w-10 h-7 md:h-10 cursor-pointer"
          >
            <IconDirection className="top-0 right-0 absolute w-full h-full text-[#9F9F9F] -rotate-90 transfrom" />
          </div>
        </div>
      )}
    </Carousel>
  );
}
