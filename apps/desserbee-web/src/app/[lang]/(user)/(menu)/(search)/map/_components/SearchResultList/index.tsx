import type { NearByStoreData } from '@repo/entity/src/store';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@repo/ui/lib/utils';
import IconX from '@repo/design-system/components/icons/IconX';
import { useRouter } from 'next/navigation';

interface SearchResultListProps {
  resultData: NearByStoreData[];
  distances?: number[];
  onClose: () => void;
}

//TODO: 예림님 코드 머지되면 주석 풀고 데이터 잘 뿌려지는지 확인해보기

// 1km 미만은 m 단위로, 1km 이상은 km 단위로 표시
const formatDistance = (distance: number | undefined): string => {
  if (distance === undefined) {
    return '거리 정보 없음';
  }

  if (distance < 1) {
    // 1km 미만은 m 단위로 표시
    return `${Math.round(distance * 1000)}m`;
  } else {
    // 1km 이상은 km 단위로 표시 (소수점 한 자리)
    return `${distance.toFixed(1)}km`;
  }
};

export function SearchResultList({
  resultData,
  distances,
  onClose,
}: SearchResultListProps) {
  const router = useRouter();
  const handleResultItemClick = (storeUuId: string) => {
    router.replace(`?storeId=${storeUuId}&bottomsheet=true`, {
      scroll: false,
    });
  };

  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const isOpen = resultData.length > 0;

  return (
    <>
      {isOpen && (
        <div
          className={cn('fixed inset-0 flex justify-center w-full h-full z-10')}
          onClick={onClose}
        >
          <div
            ref={bottomSheetRef}
            className={cn(
              'bottom-0 pb-4 fixed select-none w-full',
              'left-0 right-0 mx-auto',
              'bg-white px-base pt-[10px] rounded-t-base max-w-[768px]',
              'animate-slide-up transition-transform duration-500 ease-out',
              isOpen ? 'translate-y-0' : 'translate-y-full',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full">
              <div className="mb-[21px] w-full flex items-center">
                <div className="w-full flex justify-center">
                  <div className="border-[#545454] border-[2.14px] md:border-[3px] rounded-[5px] w-[49.33px] md:w-[115.5px]"></div>
                </div>
                <button
                  className="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-gray-700 ml-auto"
                  onClick={onClose}
                  aria-label="닫기"
                >
                  <IconX />
                </button>
              </div>

              <div className="h-[30dvh] overflow-y-scroll">
                {resultData.map((store, index) => {
                  const distanceText = formatDistance(distances?.[index]);

                  return (
                    <div
                      onClick={() => handleResultItemClick(store.storeUuid)}
                      className="flex justify-between items-center border-b-[0.19px] border-b-[#9F9F9F] py-[9px] md:px-[23px] md:py-[37px]"
                      key={store.storeId}
                    >
                      <div className="w-full flex flex-col justify-center gap-[px] md:gap-[11px] ">
                        <div className="flex items-center gap-[3px] md:gap-[18px]">
                          <div className="text-xs md:text-[22px] font-semibold">
                            {store.name}
                          </div>
                          <div>
                            {/* {store.tags.map((tag, index) => (
                              <span
                                className="font-medium text-[#898989] text-[10px] md:text-base"
                                key={tag}
                              >
                                {tag}
                                {index < store.tags.length - 1 && ', '}&nbsp;
                              </span>
                            ))} */}
                          </div>
                        </div>
                        <div className="flex gap-[18px] items-center">
                          <div className="text-xs md:text-xl font-semibold">
                            {distanceText}
                          </div>
                          <div className="text-[10px] md:text-xl">
                            {store.address}
                          </div>
                        </div>
                        <div className="flex gap-[18px] items-center">
                          {/* <div className="text-xs md:text-xl font-semibold">
                            {status === 'BEFORE_OPEN' && '오픈 전'}
                            {status === 'OPEN' && '영업중'}
                            {status === 'CLOSED' && '영업 종료'}
                            {status === 'DAY_OFF' && '휴무일'}
                          </div> */}
                          <div className="text-[10px] md:text-xl">
                            한 줄 리뷰 &nbsp;{store.totalReviewCount}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="bg-[#c9c9c9] rounded-sm w-[47px] h-[47px] md:w-[98px] md:h-[98px] aspect-square overflow-hidden">
                          {/* <Image
                            src={store.storeImage}
                            className="w-full h-full object-cover"
                            width={98}
                            height={98}
                            alt={store.name}
                          /> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
