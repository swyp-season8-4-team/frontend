'use client';

import { type MouseEvent } from 'react';
import type { WithChildren, WithClassName, WithRef, WithStyle } from '@repo/ui';
import type { ButtonSize, ButtonType } from '..';
import { cn } from '@repo/ui/lib/utils';

export interface ButtonProps
  extends WithChildren,
    WithClassName,
    WithRef<HTMLButtonElement>,
    WithStyle {
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export default function Button({
  children,
  className,
  disabled = false,
  ref,
  style,
  onClick,
}: ButtonProps) {
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      className={cn(`relative border-none cursor-pointer font-inherit outline-none overflow-hidden
        disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]
        ${className || ''}`)}
      disabled={disabled}
      style={style}
      onClick={clickHandler}
    >
      {children}
      <div 
        className="absolute inset-0 
          group-active:not-disabled:bg-[var(--opacity-pressed)]
          hover:not-disabled:bg-[var(--opacity-hover)]"
      />
    </button>
  );
}