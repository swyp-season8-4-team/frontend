import type { WithChildren } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';

interface LightOliveButtonProps extends WithChildren {
  className?: string;
  isDisabled?: boolean;
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

export function LightOliveButton({
  children,
  text,
  className,
  isDisabled,
  type = 'submit',
  onClick,
}: LightOliveButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        isDisabled
          ? 'bg-neutral-70 cursor-not-allowed text-neutral-50'
          : 'bg-secondary-60 hover:bg-secondary-40 text-white',
        'px-base w-full rounded-[6px] py-[10.5px] text-center',
        className,
      )}
    >
      {children}
      {text}
    </button>
  );
}
