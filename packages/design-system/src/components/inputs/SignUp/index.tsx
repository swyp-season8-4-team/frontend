import { cn } from '@repo/ui/lib/utils';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { ResetButton } from '../../buttons/ResetButton';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  onReset?: () => void;
  showReset?: boolean;
}

export const SingUpInput = forwardRef<HTMLInputElement, InputProps>(
  ({ error, errorMessage, className, onReset, showReset, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'px-base w-full rounded-[6px] border bg-[#FCFAF8] py-[14.5px] text-sm placeholder:text-[#BABABA] focus:outline-none',
            error ? 'border-[#FF3B30]' : 'border-[#A6A6A6]/[50%]',
            className,
          )}
          {...props}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ResetButton
            onClick={onReset}
            isShown={showReset}
            height={18}
            width={18}
          />
        </div>
        {error && errorMessage && (
          <p className="absolute mt-1 text-sm text-[#FF3B30]">{errorMessage}</p>
        )}
      </div>
    );
  },
);

SingUpInput.displayName = 'SingUpInput';
