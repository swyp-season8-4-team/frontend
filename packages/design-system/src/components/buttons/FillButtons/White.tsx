import type { WithChildren } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';

interface WhiteButtonProps extends WithChildren {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  text?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

export function WhiteButton({
  children,
  text,
  className,
  isDisabled,
  isLoading,
  onClick,
  type = 'submit',
}: WhiteButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        isDisabled
          ? 'bg-neutral-70 cursor-not-allowed text-neutral-50'
          : 'active:bg-primary-20 rounded-[6px] border border-[#CDC8C3] bg-white text-[#412D00]',
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
