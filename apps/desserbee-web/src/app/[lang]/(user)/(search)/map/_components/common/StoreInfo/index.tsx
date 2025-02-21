'use client';

import IconLocation from '@repo/design-system/components/icons/IconLocation';
import IconClock from '@repo/design-system/components/icons/IconClock';
import IconPhone from '@repo/design-system/components/icons/IconPhone';
import IconHome from '@repo/design-system/components/icons/IconHome';
import IconBaseball from '@repo/design-system/components/icons/IconBaseball';
import IconUp from '@repo/design-system/components/icons/IconUp';

import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import { IconSize } from '@repo/design-system/components/icons';
import { convertDayToKorean } from '@/utils/weekday';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';
type StoreInfoProps = Pick<
  StoreSummaryInfoData,
  | 'address'
  | 'operatingHours'
  | 'phone'
  | 'storeLink'
  | 'description'
  | 'holidays'
>;
export function StoreInfo({
  address,
  operatingHours,
  phone,
  storeLink,
  description,
  holidays,
}: StoreInfoProps) {
  const [isOperationHourOpen, setIsOperationHourOpen] = useState(false);
  return (
    <div className="flex flex-col md:gap-y-2 w-full text-[8px] md:text-lg text-nowrap leading-4">
      <div className="flex items-center gap-[6px]">
        <div className="w-[6.83px] md:w-4">
          <IconLocation className="w-full h-full text-[#BABABA]" />
        </div>
        <span>{address}</span>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex items-center gap-[6px] mb-[5px]">
            <div className="w-[6.83px] md:w-4">
              <IconClock className="w-full h-full text-[#BABABA]" />
            </div>
            <div
              className="flex items-center"
              onClick={() => setIsOperationHourOpen((prev) => !prev)}
            >
              {/**TODO: 영업중 받아오기 or 오늘 날짜에 따라 계산 */}
              <span className="mr-[11px] font-semibold">영업중</span>
              <span>19:00에 영업 종료</span>
              <div>
                <IconUp
                  className={cn(
                    'text-[#6F6F6F] w-[10px] md:w-5',
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
                    <div className="flex items-center gap-[6px] leading-3">
                      <div className="w-4"></div>
                      <div className="flex gap-[10px]">
                        <div>{convertDayToKorean(dayOfWeek)}</div>
                        {!isClosed ? (
                          <div className="flex flex-col gap-[6px]">
                            <div className="flex">
                              <span>{openingTime.hour}:</span>
                              <span>{openingTime.minute}</span>
                              <span>&nbsp;-&nbsp;</span>
                              <span>{closingTime.hour}:</span>
                              <span>{closingTime.minute}</span>
                            </div>
                            <div>
                              <span>{lastOrderTime.hour}:</span>
                              <span>{lastOrderTime.minute}&nbsp;</span>
                              <span>라스트 오더</span>
                            </div>
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
                        <span>{convertDayToKorean(holiday.date)} &nbsp;</span>
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
      <div className="flex items-center gap-[6px]">
        <div className="w-[6.83px] md:w-4">
          <IconPhone className="w-full h-full text-[#BABABA]" />
        </div>
        <span>{phone}</span>
      </div>
      <div className="flex items-center gap-[6px]">
        <div className="w-[6.83px] md:w-4">
          <IconHome className="w-full h-full text-[#BABABA]" />
        </div>
        <span>{description}</span>
      </div>
      <div className="flex items-center gap-[6px]">
        <div className="w-[6.83px] md:w-4">
          <IconBaseball className="w-full h-full text-[#BABABA]" />
        </div>
        <a className="underline" href={storeLink}>
          {storeLink}
        </a>
      </div>
    </div>
  );
}
