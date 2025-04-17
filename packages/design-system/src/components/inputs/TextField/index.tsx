import { cn } from '@repo/ui/lib/utils';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { ResetButton } from '../../buttons/ResetButton';
import IconEye from '../../icons/IconEye';
import IconEyeBan from '../../icons/IconEyeBan';
import IconWarn from '../../icons/IconWarn';
import IconCheckRound from '../../icons/IconCheckRound';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  successMessage?: string;
  onReset?: () => void;
  showReset?: boolean;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  isPasswordVisible?: boolean;
  containerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      errorMessage,
      successMessage,
      className,
      containerClassName,
      onReset,
      showReset,
      showPasswordToggle,
      onPasswordToggle,
      isPasswordVisible,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('relative', containerClassName)}>
        <input
          ref={ref}
          className={cn(
            'px-base w-full rounded-[6px] border bg-[#FCFAF8] py-[14.5px] pr-10 text-sm placeholder:text-[#BABABA] focus:outline-none',
            error ? 'border-[#FF3B30]' : 'border-[#A6A6A6]/[50%]',
            className,
          )}
          {...props}
        />
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-[11.5px]">
          <ResetButton
            onClick={onReset}
            isShown={showReset}
            height={18}
            width={18}
          />
          {showPasswordToggle && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onPasswordToggle}
              className="text-neutral-30 h-[18px] w-[18px]"
            >
              {isPasswordVisible ? (
                <IconEye className="h-full w-full" />
              ) : (
                <IconEyeBan className="h-full w-full" />
              )}
            </button>
          )}
        </div>
        {error && errorMessage && (
          <div className="text-error-60 absolute mt-3 flex items-center gap-[5px] whitespace-nowrap text-sm">
            <div className="h-4 w-4 flex-shrink-0">
              <IconWarn className="h-full w-full" />
            </div>
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && !error && (
          <div className="text-success-60 absolute mt-3 flex items-center gap-[5px] whitespace-nowrap text-sm">
            <div className="h-4 w-4 flex-shrink-0">
              <IconCheckRound className="h-full w-full" />
            </div>
            <span>{successMessage}</span>
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
