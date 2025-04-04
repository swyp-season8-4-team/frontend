import { cn } from '@repo/ui/lib/utils';

interface RadioButtonProps {
  name: string;
  onClick: () => void;
  isChecked: boolean;
  isDisabled?: boolean;
}
export function RadioButton({
  name,
  onClick,
  isChecked,
  isDisabled,
}: RadioButtonProps) {
  return (
    <div className="relative">
      <input
        type="radio"
        name={name}
        className="peer sr-only" // 실제 라디오 버튼 숨기기
        checked={isChecked}
        onChange={() => onClick()}
      />
      <div
        className={cn(
          isChecked
            ? 'border-primary-40'
            : isDisabled
              ? 'border-neutral-40 opacity-[38%]'
              : 'border-neutral-30',

          'flex h-[10.83px] w-[10.83px] items-center justify-center overflow-hidden rounded-full border-2 bg-white',
        )}
      >
        <div
          className={cn(
            isChecked
              ? 'bg-primary-40 block'
              : isDisabled
                ? 'bg-neutral-40 block'
                : 'hidden',

            'h-[5px] w-[5px] rounded-full',
          )}
        ></div>
      </div>
    </div>
  );
}
