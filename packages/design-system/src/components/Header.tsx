import { cn } from '@repo/ui/lib/utils';
import type { ReactElement } from 'react';
interface HeaderProp {
  fontClass: string;
  SearchBar: ReactElement;
}

export function Header({ fontClass, SearchBar }: HeaderProp) {
  return (
    <header className="bg-primary px-base pt-8 w-full text-[22px]">
      <div
        className={cn(
          fontClass,
          'text-3xl text-white leading-10 -tracking-[3%]',
        )}
      >
        디저비
      </div>
      {SearchBar}
    </header>
  );
}
