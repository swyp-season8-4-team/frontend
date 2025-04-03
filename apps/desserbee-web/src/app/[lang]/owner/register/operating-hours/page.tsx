'use client';

import { useContext, useState, useEffect } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { CheckButton } from '@repo/design-system/components/CheckButton';
import { OperatingHoursSelectModal } from '../_modals/OperatingHoursSelectModal';
import type { OperatingHoursItem } from '@repo/entity/src/store';
import { formatTimeTo12Hour } from '@repo/utility/src/time';
import {
  convertClosureTypeToKorean,
  convertDayToKorean,
  convertWeekNumberToKorean,
} from '@repo/utility/src/date';
import { ALL_WEEKDAYS } from '../_consts/operatingHours';
import { useForm } from 'react-hook-form';
import { cn } from '@repo/ui/lib/utils';
import { OperatingHoursEditModal } from '../_modals/OperatingHoursEditModal';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import TimePicker from '@repo/design-system/components/TimePicker';

interface BatchTimeFormData {
  openingTime: string;
  closingTime: string;
}

export default function RegisterOperatingHoursPage() {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const { storeData, completeStep, goToNextStep, updateOperatingHours } =
    useRegister();

  const [batchSelected, setBatchSelected] = useState(false);
  const [activeTimePicker, setActiveTimePicker] = useState<string>('');
  const [selectedWeekDays, setSelectedWeekdays] = useState<Set<string>>(
    new Set(),
  );
  const [operatingHours, setOperatingHours] = useState<OperatingHoursItem[]>([
    {
      dayOfWeek: 'MONDAY',
      openingTime: '09:00',
      closingTime: '22:00',
      lastOrderTime: '21:00',
      breakTimes: [
        {
          startTime: '13:00',
          endTime: '15:00',
        },
      ],
      regularClosureType: 'MONTHLY',
      regularClosureWeeks: '1,2',
      isClosed: false,
    },
    {
      dayOfWeek: 'TUESDAY',
      openingTime: '09:00',
      closingTime: '22:00',
      isClosed: false,
    },
    {
      dayOfWeek: 'WEDNESDAY',
      openingTime: '09:00',
      closingTime: '22:00',
      isClosed: false,
    },
    {
      dayOfWeek: 'THURSDAY',
      openingTime: '09:00',
      closingTime: '22:00',
      isClosed: false,
    },
    {
      dayOfWeek: 'FRIDAY',
      openingTime: '09:00',
      closingTime: '22:00',
      isClosed: false,
    },
    {
      dayOfWeek: 'SATURDAY',
      openingTime: '09:00',
      closingTime: '22:00',
      isClosed: false,
    },
    {
      dayOfWeek: 'SUNDAY',
      openingTime: '09:00',
      closingTime: '22:00',
      isClosed: false,
    },
  ]);

  const { register, watch, setValue } = useForm<BatchTimeFormData>({
    defaultValues: {
      openingTime: '09:00',
      closingTime: '22:00',
    },
  });

  const handleBatchSelect = (): void => {
    setSelectedWeekdays(() => {
      if (batchSelected) {
        return new Set();
      } else {
        return new Set(ALL_WEEKDAYS);
      }
    });
  };

  const handleBatchTimeChange = (
    field: keyof BatchTimeFormData,
    value: string,
  ) => {
    setValue(field, value);
  };

  const handleTimePickerToggle = (id: string) => {
    setActiveTimePicker((prev) => (prev === id ? '' : id));
  };

  const handleSelectWeekDay = (weekDay: string): void => {
    setSelectedWeekdays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(weekDay)) {
        newSet.delete(weekDay);
      } else {
        newSet.add(weekDay);
      }
      return newSet;
    });
  };

  const openOperatingHoursEditModal = (
    weekdays: Set<string> | string,
    selectFunction?: (weekDay: string) => void,
  ) => {
    if (
      (weekdays instanceof Set && weekdays.size > 0) ||
      typeof weekdays === 'string'
    ) {
      push('modal', {
        component: (
          <OperatingHoursEditModal
            initialOperatingHours={operatingHours}
            editableWeekdays={weekdays}
            handleSelectWeekDay={selectFunction}
            onClose={closeMenuAddModal}
          />
        ),
      });
    }
  };

  const closeMenuAddModal = () => {
    pop('modal');
  };

  const handleBatchTimeApply = () => {
    const { openingTime, closingTime } = watch();

    // if (openingTime >= closingTime) {
    //   alert('오픈 시간은 마감 시간 이전으로 설정해주세요');
    //   return;
    // }

    setOperatingHours((prev) =>
      prev.map((item) => {
        if (selectedWeekDays.has(item.dayOfWeek)) {
          return {
            ...item,
            openingTime,
            closingTime,
          };
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    const isAllSelected = ALL_WEEKDAYS.every((day) =>
      selectedWeekDays.has(day),
    );
    setBatchSelected(isAllSelected);
  }, [selectedWeekDays]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    updateOperatingHours(operatingHours);
    completeStep(RegisterStep.MENU);
    goToNextStep();
    router.push(`${NavigationPathname.OwnerRegisterMenu}`);
  };

  return (
    <form className="" onSubmit={handleNextStep}>
      {/* 일괄입력 */}
      <div className="px-base w-full border-b border-b-[#CDC8C3] pb-[13px]">
        <div className="flex items-center justify-start text-nowrap">
          <div className="flex gap-[11px]">
            <CheckButton
              setFunction={handleBatchSelect}
              isChecked={batchSelected}
            />
            <div className="mr-2 text-sm">모두</div>
          </div>
          <div className="flex w-full justify-start gap-2">
            <div
              className={cn(
                selectedWeekDays.size < 1 && 'cursor-not-allowed opacity-80',
                'flex items-center gap-[3px]',
              )}
            >
              <div className="flex items-center gap-[3px] rounded-[6px]">
                <TimePicker
                  id="opening-time"
                  value={watch('openingTime')}
                  onChange={(value) =>
                    handleBatchTimeChange('openingTime', value)
                  }
                  disabled={selectedWeekDays.size < 1}
                  isOpen={activeTimePicker === 'opening-time'}
                  onToggle={handleTimePickerToggle}
                />
                <div>~</div>
                <TimePicker
                  id="closing-time"
                  value={watch('closingTime')}
                  onChange={(value) =>
                    handleBatchTimeChange('closingTime', value)
                  }
                  disabled={selectedWeekDays.size < 1}
                  isOpen={activeTimePicker === 'closing-time'}
                  onToggle={handleTimePickerToggle}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleBatchTimeApply}
              className={cn(
                selectedWeekDays.size < 1
                  ? 'bg-neutral-70 cursor-not-allowed text-neutral-50'
                  : 'bg-secondary-40 text-white',
                'rounded-[6px] px-[13px] py-[10px] text-sm font-medium',
              )}
            >
              일괄수정
            </button>
          </div>
        </div>
      </div>
      {/* 각 요일 확인 */}
      <div className="px-base">
        <div className="w-full flex-col gap-[9px]">
          {operatingHours.map(
            ({
              dayOfWeek,
              openingTime,
              closingTime,
              breakTimes,
              lastOrderTime,
              regularClosureType,
              regularClosureWeeks,
            }) => (
              <div
                key={dayOfWeek}
                className={cn(
                  'border-b border-[#EFEDEB]',
                  'flex min-h-[68px] items-center justify-between py-2',
                )}
              >
                <div className="flex">
                  <div className="mr-6 flex items-center gap-[13.25px]">
                    <CheckButton
                      setFunction={() => handleSelectWeekDay(dayOfWeek)}
                      isChecked={selectedWeekDays.has(dayOfWeek)}
                    />
                    <div className="text-sm">
                      {convertDayToKorean(dayOfWeek)}요일
                    </div>
                  </div>
                  {/* 결과 */}
                  <div className="flex-col text-sm">
                    {regularClosureType && (
                      <div>
                        {convertClosureTypeToKorean(regularClosureType)}{' '}
                        {regularClosureWeeks &&
                          convertWeekNumberToKorean(regularClosureWeeks)}{' '}
                        휴무
                      </div>
                    )}
                    <div className="flex items-center">
                      <div>{formatTimeTo12Hour(openingTime)}</div>
                      <div>~</div>
                      <div>{formatTimeTo12Hour(closingTime)}</div>
                    </div>
                    {breakTimes && (
                      <div>
                        휴게시간 {breakTimes[0].startTime}~
                        {breakTimes[0].endTime}
                      </div>
                    )}
                    {lastOrderTime && <div>라스트 오더 {lastOrderTime}</div>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openOperatingHoursEditModal(dayOfWeek)}
                  className="text-xs underline"
                >
                  수정
                </button>
              </div>
            ),
          )}
          {/* 선택 요일 수정 버튼 */}
          <button
            type="button"
            className={cn(
              selectedWeekDays.size < 1 && 'cursor-not-allowed opacity-50',
              'text-neutral-20 mt-[10px] rounded-[6px] border border-[#CDC8C3] px-3 py-[10px] text-sm font-medium',
            )}
            onClick={() =>
              openOperatingHoursEditModal(selectedWeekDays, handleSelectWeekDay)
            }
          >
            요일별 상세 설정
          </button>
        </div>
      </div>
      <div className="p-4">
        <button type="submit" className="w-full">
          <OliveButton className="font-semibold" text="다음" />
        </button>
      </div>
    </form>
  );
}
