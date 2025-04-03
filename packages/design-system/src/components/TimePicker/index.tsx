import { useState, useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';
import IconClockOutline from '../icons/IconClockOutline';

interface TimePickerProps {
  id: string; // 고유 ID 필요
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  isOpen: boolean; // 현재 열려있는지 여부
  onToggle: (id: string) => void; // 열기/닫기 토글 함수
}

const TimePicker = ({
  id,
  value,
  onChange,
  disabled = false,
  isOpen,
  onToggle,
}: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<string>(value || '09:00');

  // 시간과 분 생성
  const hours: string[] = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const minutes: string[] = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, '0'),
  );

  useEffect(() => {
    setSelectedTime(value || '09:00');
  }, [value]);

  const handleTimeClick = (): void => {
    if (!disabled) {
      onToggle(id);
    }
  };

  const handleTimeSelect = (hour: string, minute: string): void => {
    const newTime = `${hour}:${minute}`;
    setSelectedTime(newTime);
    if (onChange) {
      onChange(newTime);
    }
  };

  const handleConfirm = (): void => {
    if (onChange) {
      onChange(selectedTime);
    }
    onToggle(''); // 모든 타임피커 닫기
  };

  return (
    <div className="relative font-sans">
      {/* 시간 표시 박스 */}
      <div
        className={cn(
          'text-neutral-20 w-18 flex cursor-pointer items-center justify-center rounded-lg border border-[#CDC8C3] bg-white p-2 font-medium',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        onClick={handleTimeClick}
      >
        <div className="text-xs">{selectedTime}</div>
        <div className="ml-1">
          <div>
            <IconClockOutline />
          </div>
        </div>
      </div>

      {/* 타임피커 팝업 */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 overflow-y-auto pr-2">
              <h3 className="mb-2 text-xs font-medium text-gray-500">시간</h3>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`cursor-pointer rounded px-4 py-2 hover:bg-blue-100 ${
                    selectedTime.split(':')[0] === hour
                      ? 'bg-secondary-40 hover:bg-secondary-40 text-white'
                      : ''
                  }`}
                  onClick={() =>
                    handleTimeSelect(hour, selectedTime.split(':')[1])
                  }
                >
                  {hour}
                </div>
              ))}
            </div>

            <div className="h-48 overflow-y-auto">
              <h3 className="mb-2 text-xs font-medium text-gray-500">분</h3>
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={`cursor-pointer rounded px-4 py-2 hover:bg-blue-100 ${
                    selectedTime.split(':')[1] === minute
                      ? 'bg-secondary-40 hover:bg-secondary-40 text-white'
                      : ''
                  }`}
                  onClick={() => {
                    handleTimeSelect(selectedTime.split(':')[0], minute);
                    handleConfirm();
                  }}
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
