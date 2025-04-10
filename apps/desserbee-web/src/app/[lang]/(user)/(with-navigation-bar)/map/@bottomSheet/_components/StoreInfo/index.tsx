'use client';

import IconLocation from '@repo/design-system/components/icons/IconLocation';
import IconClock from '@repo/design-system/components/icons/IconClock';
import IconPhone from '@repo/design-system/components/icons/IconPhone';
import IconHome from '@repo/design-system/components/icons/IconHome';
import IconBaseball from '@repo/design-system/components/icons/IconBaseball';
import IconDirection from '@repo/design-system/components/icons/IconDirection';

import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import { convertDayToKorean } from '@/utils/weekday';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';
import { getOperationStatus } from '../../../_utils/operatingStatus';
type StoreInfoProps = Pick<
  StoreSummaryInfoData,
  | 'address'
  | 'operatingHours'
  | 'phone'
  | 'primaryStoreLink'
  | 'storeLinks'
  | 'description'
  | 'holidays'
>;
export function StoreInfo({
  address,
  operatingHours,
  phone,
  primaryStoreLink,
  storeLinks,
  description,
  holidays,
}: StoreInfoProps) {
  const [isOperationHourOpen, setIsOperationHourOpen] = useState(false);
  const { status, message } = getOperationStatus(operatingHours);

  return (
    <div className="flex w-full flex-col text-[10px] leading-[15px] md:text-lg">
      <div className="flex items-start gap-[6px]">
        <div className="mt-[3px] w-[10px] flex-shrink-0 md:mt-[5px] md:w-4">
          <IconLocation className="h-full w-full text-[#BABABA]" />
        </div>
        <span>{address}</span>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex items-start gap-[6px] text-nowrap">
            <div className="mt-[3px] w-[10px] flex-shrink-0 md:mt-[5px] md:w-4">
              <IconClock className="h-full w-full text-[#BABABA]" />
            </div>
            <div
              className="flex items-center"
              onClick={() => setIsOperationHourOpen((prev) => !prev)}
            >
              <span className="mr-[11px] font-semibold">
                {status === 'BEFORE_OPEN' && '오픈 전'}
                {status === 'OPEN' && '영업중'}
                {status === 'CLOSED' && '영업 종료'}
                {status === 'DAY_OFF' && '휴무일'}
              </span>
              <span>{message}</span>
              <div className="w-[12px] flex-shrink-0 md:w-5">
                <IconDirection
                  className={cn(
                    'h-full w-full text-[#BABABA]',
                    isOperationHourOpen && 'rotate-180',
                  )}
                />
              </div>
            </div>
          </div>
          {isOperationHourOpen && (
            <div className="flex flex-col md:gap-y-[6px]">
              {operatingHours.map(
                ({
                  dayOfWeek,
                  openingTime,
                  closingTime,
                  lastOrderTime,
                  isClosed,
                }) => (
                  <div
                    key={dayOfWeek}
                    className={cn(isClosed ? 'font-semibold' : '')}
                  >
                    <div className="ap-[6px] flex items-center md:leading-[100%]">
                      <div className="w-4"></div>
                      <div className="flex gap-[10px] pl-[10px] md:pl-10">
                        <div>{convertDayToKorean(dayOfWeek)}</div>
                        {!isClosed ? (
                          <div className="flex flex-col md:gap-[6px]">
                            <div className="flex">
                              <span>{openingTime}</span>
                              <span>&nbsp;-&nbsp;</span>
                              <span>{closingTime}</span>
                            </div>
                            {lastOrderTime && (
                              <div>
                                <span>{lastOrderTime}&nbsp;</span>
                                <span>라스트 오더</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="font-semibold">정기 휴무</div>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}
              <div>
                <div className="flex">
                  <div className="flex gap-[6px]">
                    <span className="w-4"></span>
                    {holidays.map((holiday, index) => (
                      <div key={holiday.date}>
                        <span>{holiday.date} &nbsp;</span>
                        <span>{holiday.reason}</span>
                        {index !== holidays.length - 1 && <span>, </span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {phone && (
        <div className="flex items-start gap-[6px]">
          <div className="mt-[3px] w-[10px] flex-shrink-0 md:mt-[5px] md:w-4">
            <IconPhone className="h-full w-full text-[#BABABA]" />
          </div>
          <span>{phone}</span>
        </div>
      )}
      {description && (
        <div className="flex items-start gap-[6px]">
          <div className="mt-[3px] w-[10px] flex-shrink-0 md:mt-[5px] md:w-4">
            <IconHome className="h-full w-full text-[#BABABA]" />
          </div>
          <span>{description}</span>
        </div>
      )}
      {/* 디자인 나오는대로 수정필요 */}
      {/* {storeLink && (
        <div className="flex items-start gap-[6px]">
          <div className="mt-[3px] w-[10px] flex-shrink-0 md:mt-[5px] md:w-4">
            <IconBaseball className="h-full w-full text-[#BABABA]" />
          </div>
          <a className="break-all underline" href={storeLink}>
            {storeLink}
          </a>
        </div>
      )} */}
    </div>
  );
}
