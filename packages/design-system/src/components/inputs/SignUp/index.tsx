import { cn } from '@repo/ui/lib/utils';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { ResetButton } from '../../buttons/ResetButton';
import IconEye from '../../icons/IconEye';
import IconEyeBan from '../../icons/IconEyeBan';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  onReset?: () => void;
  showReset?: boolean;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  isPasswordVisible?: boolean;
}

export const SignUpInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      errorMessage,
      className,
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
              className="text-neutral-30"
            >
              {isPasswordVisible ? <IconEye /> : <IconEyeBan />}
            </button>
          )}
        </div>
        {error && errorMessage && (
          <p className="absolute mt-1 text-sm text-[#FF3B30]">{errorMessage}</p>
        )}
      </div>
    );
  },
);

SignUpInput.displayName = 'SignUpInput';
