import { cn } from '@repo/ui/lib/utils';
import type { ChangeEvent, MouseEvent } from 'react';

interface RadioButtonProps {
  name: string;
  onClick: () => void;
  isChecked: boolean;
  isDisabled?: boolean;
  outerSize?: number;
  innerSize?: number;
  id?: string;
}

// 동적 크기 스타일을 만드는 유틸리티 함수
const sizeToClassName = (size: number): string => {
  // 일반적인 크기에 대한 미리 정의된 Tailwind 클래스 매핑
  const sizeMap: Record<number, string> = {
    4: 'w-4 h-4',
    5: 'w-5 h-5',
    6: 'w-6 h-6',
    8: 'w-8 h-8',
    10: 'w-10 h-10',
    12: 'w-12 h-12',
  };

  // 정확한 크기가 있으면 반환, 없으면 인라인 스타일 사용을 위해 빈 문자열 반환
  return sizeMap[size] || '';
};

export function RadioButton({
  name,
  onClick,
  isChecked,
  isDisabled,
  outerSize = 10.83,
  innerSize = 5,
  id,
}: RadioButtonProps) {
  const inputId = id || `radio-${name}`;
  const outerSizeClass = sizeToClassName(Math.round(outerSize));
  const innerSizeClass = sizeToClassName(Math.round(innerSize));

  // 정확한 Tailwind 클래스가 없는 경우 인라인 스타일 사용
  const outerStyle = !outerSizeClass
    ? { width: `${outerSize}px`, height: `${outerSize}px` }
    : {};
  const innerStyle = !innerSizeClass
    ? { width: `${innerSize}px`, height: `${innerSize}px` }
    : {};

  // 클릭 이벤트 핸들러
  const handleClick = (e: MouseEvent) => {
    if (!isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  // 체인지 이벤트 핸들러
  const handleChange = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <div className="relative">
      <input
        type="radio"
        name={name}
        id={inputId}
        className="peer sr-only" // 실제 라디오 버튼 숨기기
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <label
        htmlFor={inputId}
        className={cn(
          isChecked
            ? 'border-primary-40'
            : isDisabled
              ? 'border-neutral-40 opacity-[38%]'
              : 'border-neutral-30',
          'flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 bg-white',
          outerSizeClass,
        )}
        style={outerStyle}
      >
        <div
          className={cn(
            isChecked
              ? 'bg-primary-40 block'
              : isDisabled
                ? 'bg-neutral-40 block'
                : 'hidden',
            'rounded-full',
            innerSizeClass,
          )}
          style={innerStyle}
        ></div>
      </label>
    </div>
  );
}
