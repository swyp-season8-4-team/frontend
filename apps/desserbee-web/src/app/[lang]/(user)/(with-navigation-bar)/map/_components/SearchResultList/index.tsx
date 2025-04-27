import type { NearByStoreData } from '@repo/entity/src/store';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@repo/ui/lib/utils';
import IconX from '@repo/design-system/components/icons/IconX';
import { useRouter } from 'next/navigation';
import { getOperationStatus } from '../../_utils/operatingStatus';
import beeImg from '@/assets/svg/logo-bee.svg';

interface SearchResultListProps {
  resultData: NearByStoreData[];
  distances?: number[];
  onClose: () => void;
}

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

  // 중복 제거된 결과 데이터
  const uniqueResultData = resultData.filter(
    (store, index, self) =>
      index === self.findIndex((s) => s.storeId === store.storeId),
  );

  // isOpen 체크를 위해 uniqueResultData 사용
  const isOpen = uniqueResultData.length > 0;

  const handleResultItemClick = (storeUuId: string) => {
    router.replace(`?storeId=${storeUuId}&bottomsheet=true`, {
      scroll: false,
    });
  };

  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // 닫기 버튼 클릭 시 onClose 함수를 직접 호출하도록 수정
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className={cn('fixed inset-0 z-10 flex h-full w-full justify-center')}
          onClick={handleClose}
        >
          <div
            ref={bottomSheetRef}
            className={cn(
              'fixed bottom-0 w-full select-none pb-4',
              'left-0 right-0 mx-auto',
              'px-base rounded-t-base max-w-[768px] bg-white pt-[10px]',
              'animate-slide-up transition-transform duration-500 ease-out',
              isOpen ? 'translate-y-0' : 'translate-y-full',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full">
              <div className="mb-[21px] flex w-full items-center">
                <div className="flex w-full justify-center">
                  <div className="w-[49.33px] rounded-[5px] border-[2.14px] border-[#545454] md:w-[115.5px] md:border-[3px]"></div>
                </div>
                <button
                  className="ml-auto flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-700"
                  onClick={handleClose}
                  aria-label="닫기"
                >
                  <IconX />
                </button>
              </div>

              <div className="h-[40dvh] overflow-y-scroll pb-[60px]">
                {uniqueResultData.map((store, index) => {
                  const distanceText = formatDistance(distances?.[index]);
                  const { status } = getOperationStatus(store.operatingHours);

                  return (
                    <div
                      onClick={() => handleResultItemClick(store.storeUuid)}
                      className="flex cursor-pointer items-center justify-between border-b-[0.19px] border-b-[#9F9F9F] py-[9px] md:px-[23px] md:py-[37px]"
                      key={store.storeId}
                    >
                      <div className="flex w-full flex-col justify-center md:gap-[11px]">
                        <div className="flex items-center gap-2 md:gap-[18px]">
                          <div className="text-xs font-semibold md:text-[22px]">
                            {store.name}
                          </div>
                          <div>
                            {store.tags.map((tag, index) => (
                              <span
                                className="text-[10px] font-medium text-[#898989] md:text-base"
                                key={tag}
                              >
                                {tag}
                                {index < store.tags.length - 1 && ', '}&nbsp;
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-[18px]">
                          <div className="flex flex-col items-start leading-none">
                            <div className="text-xs font-medium md:text-xl">
                              {distanceText}
                            </div>
                            <div className="text-xs font-medium md:text-xl">
                              {status === 'BEFORE_OPEN' && '오픈 전'}
                              {status === 'OPEN' && '영업중'}
                              {status === 'CLOSED' && '영업 종료'}
                              {status === 'DAY_OFF' && '휴무일'}
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-1 leading-none">
                            <div className="text-[10px] md:text-xl">
                              {store.address}
                            </div>
                            <div className="text-[10px] md:text-xl">
                              한 줄 리뷰 &nbsp;{store.shortReviewCount}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="aspect-square h-[47px] w-[47px] overflow-hidden rounded-sm bg-white md:h-[98px] md:w-[98px]">
                          <Image
                            src={store.storeImage ?? beeImg}
                            className="h-full w-full object-cover"
                            width={98}
                            height={98}
                            alt={store.name}
                          />
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
