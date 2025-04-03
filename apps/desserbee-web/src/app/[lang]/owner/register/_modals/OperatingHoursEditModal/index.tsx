import type { OperatingHoursItem } from '@repo/entity/src/store';
import { StoreRegisterHeader } from '../../_components/StoreRegisterHeader';
import { useState } from 'react';
import { DAYS_OF_WEEK } from '../../_consts/operatingHours';
import { cn } from '@repo/ui/lib/utils';

/**
 * 1. editableWeekday를 받아온다. string
 * 2. initialOperatingHours를 props로 받아온다. (메인에서 편집한 거 반영되어야하기 때문)
 * 3. handle함수를 props로 받아서서 editableWeekday에 해당하는 operatingHours를 edit한다. (이건 수정 버튼 눌렀을 시)
 * 4. 초기화하면 그냥 입력 값만 비워지는 거다. 이 컴포넌트의
 */

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
                'h-[34px] w-[34px] rounded-full border text-center text-[14px] md:h-12 md:w-12',
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
    </div>
  );
}
