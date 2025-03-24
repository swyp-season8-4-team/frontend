import type { WithChildren, WithClassName } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';
import IconBee from '../icons/IconBee';
import type { ReactNode } from 'react';

interface HeaderProp extends WithChildren, WithClassName {
  title: string;
  fontClass: string;
  iconClass?: string;
  backButton?: ReactNode;
  searchIcon?: ReactNode;
}

export function Header({
  title,
  fontClass,
  iconClass,
  children,
  backButton,
  searchIcon,
}: HeaderProp) {
  return (
    <header className="top-0 sticky">
      <div className="flex justify-between items-center bg-primary px-[16px] py-[21px] pt-[13px] pb-3 w-full text-[22px]">
        <div className="flex items-center gap-[2px]">
          {backButton}
          <div className={cn('flex justify-center items-center', iconClass)}>
            <IconBee className="w-full h-full" />
          </div>
          <h1
            className={cn(
              'text-[18px] text-white leading-[130%] tracking-[-0.54px] flex items-center justify-center h-full mt-2',
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
