import type { ReactNode } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <button
      className={cn(
        'shadow-base px-3 py-2 rounded-[24px]  bg-white',
        className,
      )}
    >
      {children}
    </button>
  );
}
