import type { NearByStoreData } from '@repo/entity/src/store';
import Image from 'next/image';
import { getOperationStatus } from '../../_utils/operatingStatus';
import { useRef, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import IconX from '@repo/design-system/components/icons/IconX';

interface SearchResultListProps {
  resultData: NearByStoreData[];
}

const searchResult: NearByStoreData[] = [
  {
    storeId: 1001,
    storeUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: '커피 천국',
    address: '서울특별시 강남구 테헤란로 152',
    latitude: 37.5048,
    longitude: 127.0246,
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: '08:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: '10:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: '10:00',
        closingTime: '21:00',
        lastOrderTime: '20:30',
        isClosed: false,
      },
    ],
    tags: ['아늑한', '디저트', '브런치', '테라스'],
    storeImage: 'https://picsum.photos/id/46/800/600',
    totalReviewCount: 248,
  },
  {
    storeId: 1002,
    storeUuid: 'b2c3d4e5-f6g7-8901-bcde-fg2345678901',
    name: '북카페 지식',
    address: '서울특별시 마포구 홍대로 29',
    latitude: 37.5582,
    longitude: 126.9268,
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: '10:00',
        closingTime: '21:00',
        lastOrderTime: '20:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: '10:00',
        closingTime: '21:00',
        lastOrderTime: '20:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: '10:00',
        closingTime: '21:00',
        lastOrderTime: '20:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: '10:00',
        closingTime: '21:00',
        lastOrderTime: '20:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: '10:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: '11:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: '11:00',
        closingTime: '20:00',
        lastOrderTime: '19:30',
        isClosed: true,
      },
    ],
    tags: ['조용한', '책', '스터디', '케이크'],
    storeImage: 'https://picsum.photos/id/24/800/600',
    totalReviewCount: 183,
  },
  {
    storeId: 1003,
    storeUuid: 'c3d4e5f6-g7h8-9012-cdef-gh3456789012',
    name: '해피 브루',
    address: '부산광역시 해운대구 해운대해변로 264',
    latitude: 35.1586,
    longitude: 129.1603,
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: '07:00',
        closingTime: '20:00',
        lastOrderTime: '19:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: '07:00',
        closingTime: '20:00',
        lastOrderTime: '19:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: '07:00',
        closingTime: '20:00',
        lastOrderTime: '19:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: '07:00',
        closingTime: '20:00',
        lastOrderTime: '19:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: '07:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: '08:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: '08:00',
        closingTime: '20:00',
        lastOrderTime: '19:30',
        isClosed: false,
      },
    ],
    tags: ['오션뷰', '에스프레소', '샌드위치', '음악'],
    storeImage: 'https://picsum.photos/id/87/800/600',
    totalReviewCount: 412,
  },
  {
    storeId: 1004,
    storeUuid: 'd4e5f6g7-h8i9-0123-defg-hi4567890123',
    name: '작업실 카페',
    address: '인천광역시 연수구 송도과학로 32',
    latitude: 37.3812,
    longitude: 126.6617,
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: '09:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: '09:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: '09:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: '09:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: '09:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: '11:00',
        closingTime: '23:00',
        lastOrderTime: '22:30',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: '11:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        isClosed: false,
      },
    ],
    tags: ['넓은공간', '콘센트', '와이파이', '전문가커피'],
    storeImage: 'https://picsum.photos/id/91/800/600',
    totalReviewCount: 327,
  },
  {
    storeId: 1005,
    storeUuid: 'e5f6g7h8-i9j0-1234-efgh-ij5678901234',
    name: '녹색 정원',
    address: '제주특별자치도 서귀포시 중문관광로 72번길 60',
    latitude: 33.2534,
    longitude: 126.4099,
    operatingHours: [
      {
        dayOfWeek: 'MONDAY',
        openingTime: '08:30',
        closingTime: '19:30',
        lastOrderTime: '19:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'TUESDAY',
        openingTime: '08:30',
        closingTime: '19:30',
        lastOrderTime: '19:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openingTime: '08:30',
        closingTime: '19:30',
        lastOrderTime: '19:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'THURSDAY',
        openingTime: '08:30',
        closingTime: '19:30',
        lastOrderTime: '19:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'FRIDAY',
        openingTime: '08:30',
        closingTime: '20:30',
        lastOrderTime: '20:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'SATURDAY',
        openingTime: '09:30',
        closingTime: '20:30',
        lastOrderTime: '20:00',
        isClosed: false,
      },
      {
        dayOfWeek: 'SUNDAY',
        openingTime: '09:30',
        closingTime: '19:00',
        lastOrderTime: '18:30',
        isClosed: false,
      },
    ],
    tags: ['식물', '유기농', '테마카페', '포토존'],
    storeImage: 'https://picsum.photos/id/63/800/600',
    totalReviewCount: 289,
  },
];

export function SearchResultList({ resultData }: SearchResultListProps) {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(resultData.length > 0);

  const handleResultListClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {resultData.length > 0 && (
        <div
          className="z-bottomSheet fixed flex justify-center w-full"
          onClick={handleResultListClose}
        >
          <div
            ref={bottomSheetRef}
            className={cn(
              'bottom-0 z-bottomSheet pb-4 fixed select-none w-full',
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
                  onClick={handleResultListClose}
                  aria-label="닫기"
                >
                  <IconX />
                </button>
              </div>
              <div className="h-[30dvh] overflow-y-scroll">
                {searchResult.map((store) => {
                  const { status } = getOperationStatus(store.operatingHours);
                  return (
                    <div
                      className="flex justify-between items-center border-b-[0.19px] border-b-[#9F9F9F] py-[9px] md:px-[23px] md:py-[37px]"
                      key={store.storeId}
                    >
                      <div className="w-full flex flex-col justify-center gap-[px] md:gap-[11px] ">
                        <div className="flex items-center gap-[3px] md:gap-[18px]">
                          <div className="text-xs md:text-[22px] font-semibold">
                            {store.name}
                          </div>
                          <div>
                            {store.tags.map((tag, index) => (
                              <span
                                className="font-medium text-[#898989] text-[10px] md:text-base"
                                key={tag}
                              >
                                {tag}
                                {index < store.tags.length - 1 && ', '}&nbsp;
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-[18px] items-center">
                          <div className="text-xs md:text-xl font-semibold">
                            170m
                          </div>
                          <div className="text-[10px] md:text-xl">
                            {store.address}
                          </div>
                        </div>
                        <div className="flex gap-[18px] items-center">
                          <div className="text-xs md:text-xl font-semibold">
                            {status === 'BEFORE_OPEN' && '오픈 전'}
                            {status === 'OPEN' && '영업중'}
                            {status === 'CLOSED' && '영업 종료'}
                            {status === 'DAY_OFF' && '휴무일'}
                          </div>
                          <div className="text-[10px] md:text-xl">
                            한 줄 리뷰 &nbsp;{store.totalReviewCount}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="rounded-sm w-[47px] h-[47px] md:w-[98px] md:h-[98px] aspect-square overflow-hidden">
                          <Image
                            src={store.storeImage}
                            className="w-full h-full object-cover"
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
