import type { MouseEvent, ReactElement } from 'react';

import type { WithChildren, WithClassName, WithStyle } from '@repo/ui';

export enum IconSize {
  xs = 16,
  s = 20,
  m = 24,
  l = 32,
  xl = 40,
}

export interface SVGProps extends WithChildren, WithClassName, WithStyle {
  id?: string;
  size?: IconSize;
  viewBox?: string;
  onClick?(event: MouseEvent<SVGElement>): void;
}

export default function Icon({
  id,
  children,
  size,
  style,
  viewBox,
  ...props
}: SVGProps) {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      fill={'none'}
      width={size}
      height={size}
      viewBox={viewBox ? viewBox : '0 0 24 24'}
      style={{ ...style, flexShrink: 0 }}
      {...props}
    >
      {children}
    </svg>
  );
}

export type Iconable = ReactElement<SVGProps>;
