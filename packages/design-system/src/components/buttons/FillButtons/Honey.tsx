import type { WithChildren } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';

interface HoneyButtonProps extends WithChildren {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  text?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

export function HoneyButton({
  children,
  text,
  className,
  isDisabled,
  isLoading,
  onClick,
  type = 'submit',
}: HoneyButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
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
    </button>
  );
}
