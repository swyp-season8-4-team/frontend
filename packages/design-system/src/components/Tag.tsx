import type { ReactNode } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface TagProps {
  children: ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
}

export function Tag({
  children,
  isSelected = false,
  disabled = false,
}: TagProps) {
  return (
    <button
      className={cn(
        'bg-white shadow-base px-4 py-2 rounded-[48.78px] min-w-[104px] font-medium text-lg select-none',
        isSelected && 'bg-primary text-white',
        !isSelected && 'bg-white text-[#393939]',
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
