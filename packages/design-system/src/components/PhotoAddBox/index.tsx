import { cn } from '@repo/ui/lib/utils';
import IconPlusRound from '../icons/IconPlusRound';
interface PhotoAddBoxProps {
  disabled?: boolean;
  htmlFor: string;
}

export function PhotoAddBox({ disabled, htmlFor }: PhotoAddBoxProps) {
  return (
    <label
      className={cn(
        'bg-neutral-70 flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-[9.38px]',
        disabled
          ? 'cursor-not-allowed'
          : 'border-neutral-40 cursor-pointer border-[1.17px]',
      )}
      htmlFor={htmlFor}
    >
      <div className="h-5 w-5">
        <IconPlusRound
          className={cn(
            'h-full w-full',
            disabled ? 'text-neutral-50' : 'text-[#545454]',
          )}
        />
      </div>
    </label>
  );
}
