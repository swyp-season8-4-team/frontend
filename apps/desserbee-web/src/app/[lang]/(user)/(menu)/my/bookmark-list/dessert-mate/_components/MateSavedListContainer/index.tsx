'use client';

import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import type { SavedMate } from '@repo/entity/src/mate';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@repo/ui/components/carousel';
import IconDirection from '@repo/design-system/components/icons/IconDirection';
import { cancelSaveMate, getSavedMateList, saveMate } from './action';

interface DessertMateTabProps {
  mates: SavedMate[];
  isLast: boolean;
}

export function MateSavedListContainer({
  mates: initialMates,
}: DessertMateTabProps) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [savedMates, setSavedMates] = useState<SavedMate[]>(initialMates);
  const [, setIsLast] = useState(false);

  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);
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
        const response = await getSavedMateList(fromTo);

        if (!response) {
          console.warn('서버 응답 없음');
          return;
        }

        setSavedMates((prev) => {
          const newMates = [...prev];
          response.mates.forEach((mate, index) => {
            newMates[fromTo.from + index] = mate;
          });
          return newMates;
        });

        // last 상태 업데이트 전후 로깅
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
      await cancelSaveMate({ id: uuid, userId: user.id });
      router.refresh();
    }
  };

  const handleSaveMate = async (uuid: string) => {
    if (!user) {
      router.replace('/sign-in');
      return;
    }

    await saveMate({ id: uuid, userId: user.id });
    router.refresh();
  };

  const handlePaticipateBtnClick = (recruitYn: boolean, mateUuid: string) => {
    if (recruitYn === false) return;
    router.push(`/mate/${mateUuid}`);
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
        <div>{user?.nickname}님께서 저장한 디저트 </div>
        <div>메이트입니다!</div>
      </div>
      <CarouselContent>
        {Array.from({
          length: Math.ceil(savedMates.length / itemsToShow),
        }).map((_, page) => (
          <CarouselItem key={page}>
            <div className="grid grid-cols-1 md:grid-cols-2 px-[34px] md:gap-x-3 gap-y-[5px] md:gap-y-3">
              {savedMates
                .slice(page * itemsToShow, (page + 1) * itemsToShow)
                .map(
                  ({
                    mateImage,
                    mateCategory,
                    title,
                    content,
                    nickname,
                    recruitYn,
                    saved,
                    mateUuid,
                  }) => (
                    <div
                      className="bg-white rounded-[4.02px] p-[13px] relative"
                      key={mateUuid}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-[10px] px-1 md:px-2  md:text-[14px] h-fit border rounded-[40.24px] md:rounded-[60px] border-[#6F6F6F] text-[#6F6F6F]">
                          <div className="text-[8px] md:text-[12px]">
                            {mateCategory}
                          </div>
                        </div>
                        <div className="flex gap-x-[4.83px] items-center text-[10px] md:text-[14px]">
                          <div className="text-[10px] md:text-[14px]">
                            {recruitYn ? '모집중' : '마감'}
                          </div>
                          <div className="border-[#714115] rounded-full aspect-square border">
                            <button
                              className="w-[10.46px] h-[10.46px] md:w-[20px] md:h-[20px] flex justify-center items-center"
                              onClick={() =>
                                saved
                                  ? handleCancelSaved(mateUuid)
                                  : handleSaveMate(mateUuid)
                              }
                            >
                              <IconBookmark
                                className={cn(
                                  saved ? 'text-[#AA6120]' : 'text-page',
                                  'md:w-3 md:h-3 w-2 h-2',
                                )}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {mateImage && (
                          <div className="w-[45px] h-[45px] flex-shrink-0 m-1 aspect-square bg-[#D9D9D9] overflow-hidden  md:w-[70px] md:h-[70px] rounded-sm">
                            <Image
                              className="w-full h-full"
                              src={mateImage}
                              width={50}
                              height={50}
                              alt={nickname}
                            />
                          </div>
                        )}
                        <div className="flex flex-col leading-3">
                          <div className="font-semibold text-[10px] md:text-base line-clamp-1">
                            {title}
                          </div>
                          <div className="text-[10px] md:text-[14px] font-medium line-clamp-1">
                            {content}
                          </div>
                          <div className="text-[10px] md:text-[14px] font-medium md:mt-[25px]">
                            {nickname}님
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handlePaticipateBtnClick(recruitYn, mateUuid)
                        }
                        className={cn(
                          'absolute text-[6px] md:text-[10px] bottom-2 right-3 text-white px-2 py-1 md:py-[6px] leading-none h-fit rounded-base',
                          recruitYn ? 'bg-primary' : 'bg-[#545454]',
                        )}
                      >
                        {recruitYn ? '참여하기' : '모집마감'}
                      </button>
                    </div>
                  ),
                )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="top-1/2 left-[-5px] md:left-[-10px] z-modal absolute translate-y-1/2">
        <div
          onClick={handlePrevPage}
          className="w-6 md:w-10 h-7 md:h-10 cursor-pointer"
        >
          <IconDirection className="w-full h-full text-[#9F9F9F] rotate-90 transfrom" />
        </div>
      </div>
      <div className="top-1/2 right-[-5px] md:right-[-10px] z-modal absolute translate-y-1/2">
        <div
          onClick={handleNextPage}
          className="w-6 md:w-10 h-7 md:h-10 cursor-pointer"
        >
          <IconDirection className="top-0 right-0 absolute w-full h-full text-[#9F9F9F] -rotate-90 transfrom" />
        </div>
      </div>
    </Carousel>
  );
}
