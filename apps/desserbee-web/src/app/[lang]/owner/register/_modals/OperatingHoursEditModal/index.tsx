import type { BreakTime, OperatingHoursItem } from '@repo/entity/src/store';
import { StoreRegisterHeader } from '../../_components/StoreRegisterHeader';
import { useState, useEffect } from 'react';
import { DAYS_OF_WEEK } from '../../_consts/operatingHours';
import { cn } from '@repo/ui/lib/utils';

import { RadioButton } from '@repo/design-system/components/RadioButton';
import TimePicker from '@repo/design-system/components/TimePicker';
import { useForm } from 'react-hook-form';
import { AddButton } from '../../_components/AddButton';
import IconX from '@repo/design-system/components/icons/IconX';
import { MultiSelect } from '@repo/design-system/components/MultiSelect';

/**
 * 1. editableWeekday를 받아온다. string
 * 2. initialOperatingHours를 props로 받아온다. (메인에서 편집한 거 반영되어야하기 때문)
 * 3. handle함수를 props로 받아서서 editableWeekday에 해당하는 operatingHours를 edit한다. (이건 수정 버튼 눌렀을 시)
 * 4. 초기화하면 그냥 입력 값만 비워지는 거다. 이 컴포넌트의
 */

interface BatchTimeFormData {
  openingTime: string;
  closingTime: string;
  breakTimes?: {
    startTime: string;
    endTime: string;
  }[];
  lastOrderTime?: string;
}

interface OperatingHoursEditModalProps {
  initialOperatingHours: OperatingHoursItem[];
  editableWeekdays: Set<string> | string;
  handleSelectWeekDay?: (weekDay: string) => void;
  onClose: (operatingHours?: OperatingHoursItem[]) => void;
}

const sortOperatingHours = (
  hours: OperatingHoursItem[],
): OperatingHoursItem[] => {
  const dayOrder = DAYS_OF_WEEK.map((day) => day.en);
  return hours.sort(
    (a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek),
  );
};

export function OperatingHoursEditModal({
  initialOperatingHours,
  editableWeekdays,
  handleSelectWeekDay,
  onClose,
}: OperatingHoursEditModalProps) {
  const [operatingHours, setOperatingHours] = useState<Set<OperatingHoursItem>>(
    new Set(sortOperatingHours(initialOperatingHours)),
  );

  const [currentEditableWeekdays, setCurrentEditableWeekdays] =
    useState(editableWeekdays);

  const [isWorkingdaySetting, setIsWorkingDaySetting] = useState(true);
  const [isOffHourInputOpen, setIsOffHourInputOpen] = useState(false);
  const [isLastOrderInputOpen, setIsLastOrderInputOpen] = useState(false);

  const [activeTimePicker, setActiveTimePicker] = useState<string>('');

  const { register, watch, setValue, getValues } = useForm<BatchTimeFormData>({
    defaultValues: {
      openingTime: '09:00',
      closingTime: '22:00',
      breakTimes: [{ startTime: '14:00', endTime: '15:00' }],
      lastOrderTime: '21:00',
    },
  });

  const [selectedCycle, setSelectedCycle] = useState('매주');

  const [selectedWeeks, setSelectedWeeksState] = useState<Set<string>>(
    new Set(),
  );

  const setSelectedWeeks = (
    weeks: Set<string> | ((prev: Set<string>) => Set<string>),
  ) => {
    const newSet = weeks instanceof Function ? weeks(selectedWeeks) : weeks;
    const sortedWeeks = Array.from(newSet)
      .map(Number)
      .sort((a, b) => a - b)
      .map(String);
    setSelectedWeeksState(new Set(sortedWeeks));
  };

  // 초기값 설정
  useEffect(() => {
    if (typeof editableWeekdays === 'string') {
      // 단일 요일 수정인 경우
      const targetDay = initialOperatingHours.find(
        (item) => item.dayOfWeek === editableWeekdays,
      );

      if (targetDay) {
        setValue('openingTime', targetDay.openingTime);
        setValue('closingTime', targetDay.closingTime);

        if (targetDay.breakTimes && targetDay.breakTimes.length > 0) {
          setValue('breakTimes', [
            {
              startTime: targetDay.breakTimes[0].startTime,
              endTime: targetDay.breakTimes[0].endTime,
            },
          ]);
          setIsOffHourInputOpen(true);
        }

        if (targetDay.lastOrderTime) {
          setValue('lastOrderTime', targetDay.lastOrderTime);
          setIsLastOrderInputOpen(true);
        }

        if (targetDay.regularClosureType) {
          setSelectedCycle(
            targetDay.regularClosureType === 'WEEKLY' ? '매주' : '매월',
          );
          if (targetDay.regularClosureWeeks) {
            const weeks = targetDay.regularClosureWeeks.split(',').map(String);
            setSelectedWeeks(new Set(weeks));
          }
        }
      }
    } else {
      // 다중 요일 수정인 경우
      const targetDay = initialOperatingHours.find(
        (item) =>
          editableWeekdays.has(item.dayOfWeek) && item.regularClosureType,
      );

      if (targetDay) {
        setSelectedCycle(
          targetDay.regularClosureType === 'WEEKLY' ? '매주' : '매월',
        );
        if (targetDay.regularClosureWeeks) {
          const weeks = targetDay.regularClosureWeeks.split(',').map(String);
          setSelectedWeeks(new Set(weeks));
        }
      }
    }
  }, [editableWeekdays, initialOperatingHours, setValue]);

  const handleCurrentEditableWeekdaysToggle = (weekday: string) => {
    if (handleSelectWeekDay) {
      // 현재 컴포넌트에서도 selectedWeekday 보여주도록
      setCurrentEditableWeekdays((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(weekday)) {
          newSet.delete(weekday);
        } else {
          newSet.add(weekday);
        }
        return newSet;
      });

      handleSelectWeekDay?.(weekday); // 메인 폼의 selectedWeekday 관리
    }
  };

  const handleBatchValueChange = (
    field: keyof BatchTimeFormData,
    value: string,
  ) => {
    setValue(field, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleTimePickerToggle = (id: string) => {
    setActiveTimePicker(id);
  };

  const handleSubmit = () => {
    const values = getValues();
    const updatedOperatingHours = initialOperatingHours.map((item) => {
      if (
        typeof currentEditableWeekdays === 'string'
          ? currentEditableWeekdays === item.dayOfWeek
          : currentEditableWeekdays.has(item.dayOfWeek)
      ) {
        return {
          ...item,
          openingTime: values.openingTime,
          closingTime: values.closingTime,
          breakTimes: isOffHourInputOpen ? values.breakTimes : undefined,
          lastOrderTime: isLastOrderInputOpen
            ? values.lastOrderTime
            : undefined,
          regularClosureType:
            selectedCycle === '매주'
              ? ('WEEKLY' as const)
              : ('MONTHLY' as const),
          regularClosureWeeks:
            selectedCycle === '매월'
              ? Array.from(selectedWeeks).join(',')
              : undefined,
        };
      }
      return item;
    });

    onClose(updatedOperatingHours);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full flex-col bg-white">
      <StoreRegisterHeader
        title="요일별 입력"
        isSub={true}
        onClose={() => onClose(Array.from(operatingHours))}
      />
      <div className="w-full border-b border-b-[#D3D3D3] py-[10px]">
        <div className="px-base mb-[10px] font-semibold">요일 선택</div>
        {/* 요일 선택 버튼 */}
        <div className="px-base flex justify-center gap-[14px]">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day.en}
              onClick={() => handleCurrentEditableWeekdaysToggle(day.en)}
              className={cn(
                'aspect-square h-[34px] w-[34px] rounded-full border text-center text-[14px] md:h-12 md:w-12',
                (currentEditableWeekdays instanceof Set &&
                  currentEditableWeekdays.has(day.en)) ||
                  currentEditableWeekdays === day.en
                  ? 'border-primary-70 bg-primary-80'
                  : 'border-[#CDC8C3]',
              )}
            >
              {day.kr}
            </button>
          ))}
        </div>
      </div>
      {/* 영업일 휴무일 선택 */}
      <form className="px-base">
        <div className="flex items-center gap-4 border-b border-[#EFEDEB] py-[15px]">
          <label className="flex cursor-pointer items-center">
            <RadioButton
              name="dayOrOff"
              onClick={() => setIsWorkingDaySetting(true)}
              isChecked={isWorkingdaySetting}
            />
            <span className="ml-[7.58px] text-xs">영업일</span>
          </label>
          <label className="flex cursor-pointer items-center">
            <RadioButton
              name="dayOrOff"
              onClick={() => setIsWorkingDaySetting(false)}
              isChecked={!isWorkingdaySetting}
            />
            <span className="ml-[7.58px] text-xs">휴무일</span>
          </label>
        </div>
        {/* 영업일/휴무일 폼 */}
        {!isWorkingdaySetting && (
          <div className="py-base border-b border-[#EFEDEB]">
            <div className="mb-[13px] flex w-full justify-start text-sm">
              휴무주기
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCycle}
                onChange={(e) => setSelectedCycle(e.target.value)}
                className="px-base flex w-full max-w-[88px] justify-start rounded-[6px] border border-[#58616A] border-opacity-50 py-[10px] text-sm"
              >
                <option value="매주">매주</option>
                <option value="매월">매월</option>
              </select>
              {/* MultiSelect 컴포넌트로 변경 */}
              <MultiSelect
                options={[
                  { value: '1', label: '첫째 주' },
                  { value: '2', label: '둘째 주' },
                  { value: '3', label: '셋째 주' },
                  { value: '4', label: '넷째 주' },
                  { value: '5', label: '다섯째 주' },
                ]}
                value={Array.from(selectedWeeks)}
                onChange={(selectedValues) => {
                  const newSet = new Set(selectedValues);
                  setSelectedWeeks(newSet);
                }}
                disabled={selectedCycle === '매주'}
                placeholder="주 선택"
                selectClassName={cn(
                  selectedCycle === '매주' ? 'opacity-50' : '',
                )}
              />
            </div>
          </div>
        )}

        <div className="w-full">
          <div className="py-base border-b border-[#EFEDEB]">
            <div className="mb-[13px] flex w-full justify-start text-sm">
              운영시간
            </div>
            <div className="flex w-full items-center gap-[3px] rounded-[6px]">
              <TimePicker
                id="operating-opening-time"
                value={watch('openingTime')}
                onChange={(value) =>
                  handleBatchValueChange('openingTime', value)
                }
                isOpen={activeTimePicker === 'operating-opening-time'}
                onToggle={handleTimePickerToggle}
                selectClassName="w-full"
                pickerClassName="w-full"
              />
              <div>~</div>
              <TimePicker
                id="operating-closing-time"
                value={watch('closingTime')}
                onChange={(value) =>
                  handleBatchValueChange('closingTime', value)
                }
                isOpen={activeTimePicker === 'operating-closing-time'}
                onToggle={handleTimePickerToggle}
                selectClassName="w-full"
                pickerClassName="w-full"
              />
            </div>
          </div>
          {isOffHourInputOpen && (
            <div className="py-base border-b border-[#EFEDEB]">
              <div className="mb-[13px] flex w-full items-center justify-between text-sm">
                <div>휴게시간</div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOffHourInputOpen(false);
                    setValue('breakTimes', undefined);
                  }}
                  className="h-[14.73px] w-[14.73px]"
                >
                  <IconX className="text-neutral-40 h-full w-full" />
                </button>
              </div>
              <div className="flex w-full items-center gap-[3px] rounded-[6px]">
                <TimePicker
                  id="break-start-time"
                  value={watch('breakTimes.0.startTime')}
                  onChange={(value) =>
                    setValue('breakTimes.0.startTime', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  isOpen={activeTimePicker === 'break-start-time'}
                  onToggle={handleTimePickerToggle}
                  selectClassName="w-full"
                  pickerClassName="w-full"
                />
                <div>~</div>
                <TimePicker
                  id="break-end-time"
                  value={watch('breakTimes.0.endTime')}
                  onChange={(value) =>
                    setValue('breakTimes.0.endTime', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  isOpen={activeTimePicker === 'break-end-time'}
                  onToggle={handleTimePickerToggle}
                  selectClassName="w-full"
                  pickerClassName="w-full"
                />
              </div>
            </div>
          )}
          {isLastOrderInputOpen && (
            <div className="py-base">
              <div className="mb-[13px] flex w-full items-center justify-between text-sm">
                <div>라스트 오더</div>
                <button
                  type="button"
                  onClick={() => {
                    setIsLastOrderInputOpen(false);
                    setValue('lastOrderTime', undefined);
                  }}
                  className="h-[14.73px] w-[14.73px]"
                >
                  <IconX className="text-neutral-40 h-full w-full" />
                </button>
              </div>
              <div className="flex w-full items-center gap-[3px] rounded-[6px]">
                <TimePicker
                  id="last-order-time"
                  value={watch('lastOrderTime')}
                  onChange={(value) =>
                    setValue('lastOrderTime', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  isOpen={activeTimePicker === 'last-order-time'}
                  onToggle={handleTimePickerToggle}
                  selectClassName="w-1/2"
                  pickerClassName="w-1/2"
                />
              </div>
            </div>
          )}
          {(!isOffHourInputOpen || !isLastOrderInputOpen) && (
            <div className="py-base">
              <div className="mb-[13px] flex w-full justify-start text-sm">
                추가
              </div>
              <div className="flex gap-[10px]">
                {!isOffHourInputOpen && (
                  <AddButton
                    text="휴게시간"
                    clasName="font-medium w-1/2"
                    onClick={() => setIsOffHourInputOpen(true)}
                  />
                )}
                {!isLastOrderInputOpen && (
                  <AddButton
                    text="라스트 오더"
                    clasName="font-medium  w-1/2"
                    onClick={() => setIsLastOrderInputOpen(true)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </form>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-secondary-40 rounded-[6px] px-[13px] py-[10px] text-sm font-medium text-white"
      >
        수정
      </button>
    </div>
  );
}
