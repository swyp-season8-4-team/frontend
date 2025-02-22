'use client';

import { cloneElement, useMemo } from 'react';
import type { WithRef } from '@repo/ui';
import { type Iconable, IconSize } from '../../icons';
import Button, { type ButtonProps } from '../Button';import { ButtonSize } from '..';

interface Props
  extends Omit<ButtonProps, 'children' | 'size'>,
    WithRef<HTMLButtonElement> {
  children: Iconable;
  iconSize?: IconSize | number;
  size?: IconSize | number;
}

export default function IconButton({
  children,
  className,
  iconSize,
  size = IconSize.m,
  ...props
}: Props) {
  const buttonClasses = useMemo(() => {
    const baseClasses = 'flex items-center justify-center flex-shrink-0 rounded-full bg-none';
    const sizeClasses = size === IconSize.xs 
      ? 'w-4 h-4 scale-[2.5]' 
      : 'w-6 h-6 scale-[2]';
    const hoverClasses = 'hover:bg-[#f8f9fb] hover:not:disabled:opacity-100';
    
    return `${baseClasses} ${sizeClasses} ${hoverClasses} ${className || ''}`;
  }, [className, size]);

  const iconClasses = useMemo(() => {
    return size === IconSize.xs 
      ? 'scale-[0.4] fill-current transition-colors duration-200' 
      : 'scale-[0.5] fill-current transition-colors duration-200';
  }, [size]);

  const defaultIconSize = useMemo(() => {
    if (iconSize) {
      return iconSize;
    }

    return size === IconSize.xs ? IconSize.xs : IconSize.m;
  }, [iconSize, size]);

  return (
    <Button className={buttonClasses} {...props}>
      {cloneElement(children, { 
        size: defaultIconSize,
        className: iconClasses 
      })}
    </Button>
  );
}