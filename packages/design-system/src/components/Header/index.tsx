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
    <header className="h-full w-full">
      <div className="bg-primary-80 flex max-h-[56px] w-full items-center justify-between px-[16px] py-4 text-[22px]">
        <div className="flex items-center gap-1">
          {backButton}
          {logo}
          <h1
            className={cn(
              'flex h-full items-center justify-center pt-[7px] text-lg text-[#271900]',
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
