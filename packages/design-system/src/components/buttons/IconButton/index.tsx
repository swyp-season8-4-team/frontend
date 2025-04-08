'use client';

import { cloneElement, useMemo } from 'react';
import type { WithRef } from '@repo/ui';
import { type Iconable, IconSize } from '../../icons';
import Button, { type ButtonProps } from '../Button';

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
    const baseClasses =
      'flex items-center justify-center flex-shrink-0 rounded-full bg-none';

    // 사이즈별 클래스 매핑 개선
    let sizeClasses = '';
    if (size === IconSize.xs) {
      sizeClasses = 'w-6 h-6 p-1';
    } else if (size === IconSize.s) {
      sizeClasses = 'w-8 h-8 p-1.5';
    } else if (size === IconSize.m) {
      sizeClasses = 'w-10 h-10 p-2';
    } else if (size === IconSize.l) {
      sizeClasses = 'w-12 h-12 p-2.5';
    } else if (typeof size === 'number') {
      // 커스텀 사이즈 지원
      sizeClasses = `w-[${size}px] h-[${size}px]`;
    }

    const hoverClasses = '';

    return `${baseClasses} ${sizeClasses} ${hoverClasses} ${className || ''}`;
  }, [className, size]);

  const defaultIconSize = useMemo(() => {
    if (iconSize) {
      return iconSize;
    }

    // 버튼 사이즈에 따른 아이콘 사이즈 매핑
    if (size === IconSize.xs) return IconSize.xs;
    if (size === IconSize.s) return IconSize.s;
    if (size === IconSize.m) return IconSize.m;
    if (size === IconSize.l) return IconSize.l;

    return IconSize.m; // 기본값
  }, [iconSize, size]);

  return (
    <Button className={buttonClasses} {...props}>
      {cloneElement(children, {
        size: defaultIconSize,
        className: 'fill-current transition-colors duration-200',
      })}
    </Button>
  );
}
