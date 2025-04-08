import type { WithChildren } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';

interface OliveButtonProps extends WithChildren {
  className?: string;
  isDisabled?: boolean;
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

export function OliveButton({
  children,
  text,
  className,
  isDisabled,
  type = 'submit',
  onClick,
}: OliveButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        isDisabled
          ? 'bg-neutral-70 cursor-not-allowed text-neutral-50'
          : 'bg-secondary-40 active:bg-secondary-30 text-white',
        'px-base w-full rounded-[6px] py-[10.5px] text-center',
        className,
      )}
    >
      {children}
      {text}
    </button>
  );
}
