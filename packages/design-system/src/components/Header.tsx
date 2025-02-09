import { cn } from '@repo/ui/lib/utils';
import type { ReactNode } from 'react';
interface HeaderProp {
  fontClass: string;
  children: ReactNode;
}

export function Header({ fontClass, children }: HeaderProp) {
  return (
    <header className="sticky top-0 bg-primary px-base pt-8 w-full text-[22px]">
      <div
        className={cn(
          fontClass,
          'text-3xl text-white leading-10 -tracking-[3%]',
        )}
      >
        디저비
      </div>
      {children}
    </header>
  );
}
