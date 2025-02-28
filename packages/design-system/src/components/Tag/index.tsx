import React, { type ReactNode } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface TagProps {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function TagComponent({ children, className, onClick }: TagProps) {
  return (
    <button
      className={cn('shadow-base px-3 py-2 rounded-[24px] bg-white', className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export const Tag = React.memo(TagComponent);
