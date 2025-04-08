import type { WithChildren } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';

interface HoneyButtonProps extends WithChildren {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  text?: string;
}

export function HoneyButton({
  children,
  text,
  className,
  isDisabled,
  isLoading,
}: HoneyButtonProps) {
  return (
    <div
      className={cn(
        isDisabled
          ? 'bg-neutral-70 cursor-not-allowed text-neutral-50'
          : 'bg-primary-80 active:bg-primary-70 text-[#412D00]',
        'px-base w-full rounded-[6px] py-[10.5px] text-center',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
        {text}
      </div>
    </div>
  );
}
