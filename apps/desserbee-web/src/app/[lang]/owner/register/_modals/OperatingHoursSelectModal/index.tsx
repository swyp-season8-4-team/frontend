import { useState, type ChangeEvent } from 'react';
import type { OperatingHoursItem } from '@repo/entity/src/store';
import { StoreRegisterHeader } from '../../_components/StoreRegisterHeader';

interface OperatingHoursSelectModalProps {
  onClose: (operatingHours?: OperatingHoursItem[]) => void;
  initialOperatingHours?: OperatingHoursItem[];
}

const DAYS_OF_WEEK = [
  { kr: '월', en: 'MONDAY' },
  { kr: '화', en: 'TUESDAY' },
  { kr: '수', en: 'WEDNESDAY' },
  { kr: '목', en: 'THURSDAY' },
  { kr: '금', en: 'FRIDAY' },
  { kr: '토', en: 'SATURDAY' },
  { kr: '일', en: 'SUNDAY' },
];

const sortOperatingHours = (
  hours: OperatingHoursItem[],
): OperatingHoursItem[] => {
  const dayOrder = DAYS_OF_WEEK.map((day) => day.en);
  return hours.sort(
    (a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek),
  );
};

export function OperatingHoursSelectModal({
  onClose,
  initialOperatingHours = [],
}: OperatingHoursSelectModalProps) {
  const [is24Hour, setIs24Hour] = useState(false);
  const [operatingHours, setOperatingHours] = useState<Set<OperatingHoursItem>>(
    new Set(sortOperatingHours(initialOperatingHours)),
  );

  const handleDayToggle = (day: (typeof DAYS_OF_WEEK)[number]) => {
    const exists = Array.from(operatingHours).some(
      (item) => item.dayOfWeek === day.en,
    );

    if (exists) {
      const updatedHours = Array.from(operatingHours).filter(
        (item) => item.dayOfWeek !== day.en,
      );
      setOperatingHours(new Set(updatedHours));
    } else {
      const updatedHours = sortOperatingHours([
        ...Array.from(operatingHours),
        {
          dayOfWeek: day.en,
          openingTime: '10:00',
          closingTime: '19:00',
          lastOrderTime: '',
          isClosed: false,
        },
      ]);
      setOperatingHours(new Set(updatedHours));
    }
  };

  const handleTimeChange = (
    dayOfWeek: string,
    field: 'openingTime' | 'closingTime',
    value: string,
  ) => {
    const updatedHours = sortOperatingHours(
      Array.from(operatingHours).map((item) =>
        item.dayOfWeek === dayOfWeek ? { ...item, [field]: value } : item,
      ),
    );
    setOperatingHours(new Set(updatedHours));
  };

  const handleTimeInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: OperatingHoursItem,
    field: 'openingTime' | 'closingTime',
    type: 'hour' | 'minute',
  ) => {
    let [hour, minute] = item[field].split(':').map(Number);

    if (type === 'hour') {
      hour = Number(e.target.value);
      if (hour < 0) hour = 0;
      if (hour > 23) hour = 23;
    } else {
      minute = Number(e.target.value);
      if (minute < 0) minute = 0;
      if (minute > 59) minute = 59;
    }

    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    handleTimeChange(
      item.dayOfWeek,
      field,
      `${formattedHour}:${formattedMinute}`,
    );
  };

  const resetOperatingHours = () => {
    setOperatingHours(new Set());
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full flex-col bg-white">
      <StoreRegisterHeader
        title="운영 시간"
        isSub={true}
        onClose={() => onClose(Array.from(operatingHours))}
      />

      <div className="p-4">
        {/* 요일 선택 버튼 */}
        <div className="mb-4 flex justify-around gap-2">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day.en}
              onClick={() => handleDayToggle(day)}
              className={`h-[32px] w-[32px] rounded-full border text-center text-[14px] ${
                Array.from(operatingHours).some(
                  (item) => item.dayOfWeek === day.en,
                )
                  ? 'border-[#DEAE00] bg-[#FFE4A1]'
                  : 'border-[#9D9D9D]'
              }`}
            >
              {day.kr}
            </button>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">운영시간</span>
          <div className="flex items-center gap-2">
            <span className="text-xs">24시간</span>
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className={`relative h-6 w-[39px] rounded-full ${
                is24Hour ? 'bg-primary' : 'bg-[#6F6F6F]'
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                  is24Hour ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-start text-xs text-[#6F6F6F]">
          *선택하지 않은 요일은 자동 휴무 처리됩니다.
        </div>

        <div className="flex flex-col gap-y-[10px]">
          {Array.from(operatingHours).map((item) => (
            <div key={item.dayOfWeek} className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-8 text-center text-[15px]">
                  {DAYS_OF_WEEK.find((day) => day.en === item.dayOfWeek)?.kr}
                </div>
                {is24Hour ? (
                  <div className="flex w-full items-center gap-2">
                    {/* 시작 시간 */}
                    <div className="flex w-full items-center">
                      <div className="flex w-full items-center rounded-[6px] border border-[#58616A] px-2 py-1">
                        <input
                          type="number"
                          className="w-8 px-0 py-0 text-center text-[15px]"
                          min="0"
                          max="23"
                          value={item.openingTime.split(':')[0]}
                          onChange={(e) =>
                            handleTimeInputChange(
                              e,
                              item,
                              'openingTime',
                              'hour',
                            )
                          }
                        />
                        <span>:</span>
                        <input
                          type="number"
                          className="w-8 px-0 py-0 text-center text-[15px]"
                          min="0"
                          max="59"
                          value={item.openingTime.split(':')[1]}
                          onChange={(e) =>
                            handleTimeInputChange(
                              e,
                              item,
                              'openingTime',
                              'minute',
                            )
                          }
                        />
                      </div>
                    </div>

                    <span> ~ </span>

                    {/* 종료 시간 */}
                    <div className="flex w-full items-center gap-1">
                      <div className="flex w-full items-center rounded-[6px] border border-[#58616A] px-2 py-1">
                        <input
                          type="number"
                          className="w-8 px-0 py-0 text-center text-[15px]"
                          min="0"
                          max="23"
                          value={item.closingTime.split(':')[0]}
                          onChange={(e) =>
                            handleTimeInputChange(
                              e,
                              item,
                              'closingTime',
                              'hour',
                            )
                          }
                        />
                        <span>:</span>
                        <input
                          type="number"
                          className="w-8 px-0 py-0 text-center text-[15px]"
                          min="0"
                          max="59"
                          value={item.closingTime.split(':')[1]}
                          onChange={(e) =>
                            handleTimeInputChange(
                              e,
                              item,
                              'closingTime',
                              'minute',
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="time"
                      className="flex w-full items-center rounded-[6px] border border-[#58616A] px-2 py-1 text-[15px] [&::-webkit-calendar-picker-indicator]:hidden"
                      name="openingTime"
                      value={item.openingTime}
                      onChange={(e) =>
                        handleTimeChange(
                          item.dayOfWeek,
                          'openingTime',
                          e.target.value,
                        )
                      }
                    />
                    <span> ~ </span>
                    <input
                      type="time"
                      className="flex w-full items-center rounded-[6px] border border-[#58616A] px-2 py-1 text-[15px] [&::-webkit-calendar-picker-indicator]:hidden"
                      name="closingTime"
                      value={item.closingTime}
                      onChange={(e) =>
                        handleTimeChange(
                          item.dayOfWeek,
                          'closingTime',
                          e.target.value,
                        )
                      }
                    />
                  </>
                )}
              </div>
              {/* <button className="w-full rounded-[10px] border border-[#949494] px-[14px] py-[10px]">
                + 라스트 오더 추가
              </button> */}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-4 flex w-full gap-x-2 px-4">
        <button
          onClick={resetOperatingHours}
          className="w-[20%] text-nowrap rounded-[99px] border border-[#B3B3B3] p-[10px]"
        >
          초기화
        </button>
        <button
          onClick={() => onClose(Array.from(operatingHours))}
          className="w-[80%] rounded-[99px] bg-[#FFB700] p-[10px] text-center"
        >
          운영시간 적용
        </button>
      </div>
    </div>
  );
}
