import { useState, useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';
import IconClockOutline from '../icons/IconClockOutline';

interface TimePickerProps {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const ClockTimePicker = ({
  id,
  value,
  onChange,
  disabled = false,
  isOpen,
  onToggle,
}: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<string>(value || '09:00');
  const [view, setView] = useState<'hours' | 'minutes'>('hours');
  const [selectedHour, setSelectedHour] = useState<number>(9);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const angle = Math.atan2(y, x) * (180 / Math.PI);
    let minute = Math.round(((angle + 90 + 360) % 360) / 6); // 360도 기준으로 1분 단위 설정

    if (minute === 60) minute = 0; // 60분이 되면 0으로 변경

    setSelectedMinute(minute);
    updateTime(selectedHour, minute);
  };

  const handleTimeClick = (): void => {
    if (!disabled) {
      onToggle(id);
      setView('hours');
    }
  };

  const handleHourSelect = (hour: number): void => {
    setSelectedHour(hour);
    setView('minutes');
    updateTime(hour, selectedMinute);
  };

  const handleMinuteSelect = (minute: number): void => {
    setSelectedMinute(minute);
    updateTime(selectedHour, minute);
    // 분 선택 후 바로 닫지 않고 사용자가 확인할 수 있도록 유지
  };

  const updateTime = (hour: number, minute: number): void => {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const newTime = `${formattedHour}:${formattedMinute}`;
    setSelectedTime(newTime);
  };

  const handleConfirm = (): void => {
    if (onChange) {
      onChange(selectedTime);
    }
    onToggle('');
  };

  // 시계 위의 점 위치 계산 함수들
  const calculatePointPosition = (
    value: number,
    totalValues: number,
    radius: number,
  ) => {
    // 12시 방향을 시작점으로 시계 방향으로 회전
    const angle = Math.PI * 2 * (value / totalValues) - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  const renderClockHours = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const clockRadius = 80;

    return (
      <div className="relative h-64 w-64">
        <svg viewBox="-100 -100 200 200" className="h-full w-full">
          {/* 시계 외곽 원 */}
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="white"
            stroke="#CDC8C3"
            strokeWidth="2"
          />

          {/* 중앙 점 */}
          <circle cx="0" cy="0" r="3" fill="#A28E6D" />

          {/* 시간 마커 */}
          {hours.map((hour) => {
            const isInner = hour > 11; // 12-23시는 안쪽 원에 배치
            const radius = isInner ? 60 : 80;
            const displayHour = isInner ? hour : hour === 0 ? 24 : hour;
            const pos = calculatePointPosition(
              displayHour % 12 === 0 ? 12 : displayHour % 12,
              12,
              radius,
            );

            return (
              <g
                key={hour}
                onClick={() => handleHourSelect(hour)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="16"
                  fill={selectedHour === hour ? '#A28E6D' : 'transparent'}
                  className="transition-colors hover:fill-[#6D5C3E]"
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill={selectedHour === hour ? 'white' : 'black'}
                  className="pointer-events-none select-none"
                >
                  {hour.toString().padStart(2, '0')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderClockMinutes = () => {
    const clockRadius = 80;

    return (
      <div className="relative h-64 w-64">
        <svg
          viewBox="-100 -100 200 200"
          className="h-full w-full cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* 시계 외곽 원 */}
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="white"
            stroke="#CDC8C3"
            strokeWidth="2"
          />

          {/* 중앙 점 */}
          <circle cx="0" cy="0" r="3" fill="#A28E6D" />

          {/* 선택된 분을 나타내는 시침 */}
          <line
            x1="0"
            y1="0"
            x2={
              calculatePointPosition(selectedMinute, 60, clockRadius * 0.75).x
            }
            y2={
              calculatePointPosition(selectedMinute, 60, clockRadius * 0.75).y
            }
            stroke="#A28E6D"
            strokeWidth="2"
          />

          {/* 분 숫자 표시 */}
          {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
            const pos = calculatePointPosition(minute, 60, clockRadius);

            return (
              <text
                key={minute}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill={selectedMinute === minute ? '#A28E6D' : 'black'}
                className="pointer-events-none select-none"
              >
                {minute.toString().padStart(2, '0')}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      setSelectedHour(hours);
      setSelectedMinute(minutes);
      setSelectedTime(value);
    }
  }, [value]);

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

      {/* 시계 UI 팝업 */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">{selectedTime}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                className={cn(
                  'rounded-md px-3 py-1 text-sm',
                  view === 'hours'
                    ? 'bg-secondary-80 text-secondary-40'
                    : 'text-gray-500 hover:bg-gray-100',
                )}
                onClick={() => setView('hours')}
              >
                시간
              </button>
              <button
                type="button"
                className={cn(
                  'rounded-md px-3 py-1 text-sm',
                  view === 'minutes'
                    ? 'bg-secondary-80 text-secondary-40'
                    : 'text-gray-500 hover:bg-gray-100',
                )}
                onClick={() => setView('minutes')}
              >
                분
              </button>
            </div>
          </div>

          {view === 'hours' ? renderClockHours() : renderClockMinutes()}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
              onClick={() => onToggle('')}
            >
              취소
            </button>
            <button
              type="button"
              className="hover:bg-secondary-50 text-40 bg-secondary-40 rounded-md px-3 py-1 text-white"
              onClick={handleConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockTimePicker;
