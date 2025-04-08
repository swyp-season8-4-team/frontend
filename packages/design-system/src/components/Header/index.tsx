import type { WithChildren, WithClassName } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';
import type { ReactNode } from 'react';

interface HeaderProp extends WithChildren, WithClassName {
  title: string;
  fontClass: string;
  iconClass?: string;
  backButton?: ReactNode;
  searchIcon?: ReactNode;
  logo?: ReactNode;
}

export function Header({
  title,
  fontClass,
  children,
  backButton,
  searchIcon,
  logo,
}: HeaderProp) {
  return (
    <header className="sticky top-0">
      <div className="bg-primary flex w-full items-center justify-between px-[16px] py-[21px] pb-3 pt-[13px] text-[22px]">
        <div className="flex items-center gap-1">
          {backButton}
          {logo}
          <h1
            className={cn(
              'mt-2 flex h-full items-center justify-center text-[18px] leading-[130%] tracking-[-0.54px] text-white',
              fontClass,
            )}
          >
            {title}
          </h1>
        </div>
        {searchIcon}
      </div>
      {children}
    </header>
  );
}
