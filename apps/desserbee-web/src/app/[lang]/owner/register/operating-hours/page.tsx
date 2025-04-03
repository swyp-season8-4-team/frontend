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
import { convertDayToKorean } from '@repo/utility/src/date';
import { ALL_WEEKDAYS } from '../_consts/operatingHours';
import { useForm } from 'react-hook-form';
import { cn } from '@repo/ui/lib/utils';

interface BatchTimeFormData {
  openingHour: string;
  openingMinute: string;
  closingHour: string;
  closingMinute: string;
}

export default function RegisterOperatingHoursPage() {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const { storeData, completeStep, goToNextStep, updateOperatingHours } =
    useRegister();

  // const openOperatingHoursAddModal = () => {
  //   push('modal', {
  //     component: <OperatingHoursSelectModal onClose={closeMenuAddModal} />,
  //   });
  // };

  // const closeMenuAddModal = () => {
  //   pop('modal');
  // };

  const [batchSelected, setBatchSelected] = useState(false);
  const [selectedWeekDays, setSelectedWeekdays] = useState<Set<string>>(
    new Set(),
  );
  const [operatingHours, setOperatingHours] = useState<OperatingHoursItem[]>([
    {
      dayOfWeek: 'MONDAY',
      openingTime: '09:00',
      closingTime: '22:00',
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
      openingHour: '09',
      openingMinute: '00',
      closingHour: '22',
      closingMinute: '00',
    },
  });

  const handleBatchTimeChange = (
    field: keyof BatchTimeFormData,
    value: string,
  ) => {
    let numValue = Number(value);

    if (field.includes('Hour')) {
      if (numValue < 0) numValue = 0;
      if (numValue > 23) numValue = 23;
    } else {
      if (numValue < 0) numValue = 0;
      if (numValue > 59) numValue = 59;
    }

    setValue(field, numValue.toString().padStart(2, '0'));
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

  const handleBatchSelect = (): void => {
    setSelectedWeekdays(() => {
      if (batchSelected) {
        return new Set();
      } else {
        return new Set(ALL_WEEKDAYS);
      }
    });
  };

  const handleBatchTimeApply = () => {
    const { openingHour, openingMinute, closingHour, closingMinute } = watch();
    const batchOpeningTime = `${openingHour}:${openingMinute}`;
    const batchClosingTime = `${closingHour}:${closingMinute}`;

    setOperatingHours((prev) =>
      prev.map((item) => {
        if (selectedWeekDays.has(item.dayOfWeek)) {
          return {
            ...item,
            openingTime: batchOpeningTime,
            closingTime: batchClosingTime,
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
      <div className="px-base flex items-center gap-[22px] text-nowrap border-b border-b-[#CDC8C3] pb-[13px]">
        <div className="flex gap-[11px]">
          <CheckButton
            setFunction={handleBatchSelect}
            isAllChecked={batchSelected}
          />
          <div className="text-sm">전체</div>
        </div>
        <div
          className={cn(
            selectedWeekDays.size < 1 && 'cursor-not-allowed opacity-20',
            'flex items-center gap-[3px]',
          )}
        >
          <div className="flex w-fit overflow-hidden rounded-[6px] border border-black px-[13px] py-[5.67px] text-center text-sm">
            <input
              {...register('openingHour')}
              type="number"
              min="0"
              max="23"
              className="w-5 appearance-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={(e) =>
                handleBatchTimeChange('openingHour', e.target.value)
              }
              disabled={selectedWeekDays.size < 1}
            />
            <div>:</div>
            <input
              {...register('openingMinute')}
              type="number"
              min="0"
              max="59"
              className="w-5 appearance-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={(e) =>
                handleBatchTimeChange('openingMinute', e.target.value)
              }
              disabled={selectedWeekDays.size < 1}
            />
          </div>
          <div>~</div>
          <div className="flex w-fit overflow-hidden rounded-[6px] border border-black px-[13px] py-[5.67px] text-center text-sm">
            <input
              {...register('closingHour')}
              type="number"
              min="0"
              max="23"
              className="m-0 w-5 appearance-none p-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={(e) =>
                handleBatchTimeChange('closingHour', e.target.value)
              }
              disabled={selectedWeekDays.size < 1}
            />
            <div>:</div>
            <input
              {...register('closingMinute')}
              type="number"
              min="0"
              max="59"
              className="w-5 appearance-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={(e) =>
                handleBatchTimeChange('closingMinute', e.target.value)
              }
              disabled={selectedWeekDays.size < 1}
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
            'rounded-[6px] px-[27px] py-[12.5px] text-sm font-medium',
          )}
        >
          입력
        </button>
      </div>
      {/* 각 요일 확인 */}
      <div className="px-base">
        <div className="max-w-3xl flex-col gap-[9px]">
          {operatingHours.map(({ dayOfWeek, openingTime, closingTime }) => (
            <div key={dayOfWeek} className="flex items-center justify-between">
              <div className="flex py-2">
                <div className="mr-6 flex gap-[13.25px]">
                  <CheckButton
                    setFunction={() => handleSelectWeekDay(dayOfWeek)}
                    isChecked={selectedWeekDays.has(dayOfWeek)}
                  />
                  <div className="text-sm">
                    {convertDayToKorean(dayOfWeek)}요일
                  </div>
                </div>
                <div className="flex text-sm">
                  <div>{formatTimeTo12Hour(openingTime)}</div>
                  <div>~</div>
                  <div>{formatTimeTo12Hour(closingTime)}</div>
                </div>
              </div>
              <button type="button" className="text-xs underline">
                수정
              </button>
            </div>
          ))}
          {/* 선택 요일 수정 버튼 */}
          <button
            type="button"
            className={cn(
              selectedWeekDays.size < 1 && 'cursor-not-allowed opacity-50',
              'text-neutral-20 rounded-[6px] border border-[#CDC8C3] px-[43px] py-[10px] text-sm font-medium',
            )}
          >
            선택 요일 수정
          </button>
        </div>
      </div>
      <div className="fixed bottom-4 left-0 right-0 mx-4">
        <button
          type="submit"
          className="bg-primary-80 w-full rounded-[6px] p-[10px] text-center font-semibold text-[#412D00]"
        >
          다음
        </button>
      </div>
    </form>
  );
}
