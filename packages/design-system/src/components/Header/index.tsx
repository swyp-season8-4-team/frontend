import type { WithChildren } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';

interface HeaderProp extends WithChildren {
  title: string;
  fontClass: string;
}

export function Header({ title, fontClass, children }: HeaderProp) {
  return (
    <header className="sticky top-0 bg-primary px-base pt-8 w-full text-[22px]">
      <h1
        className={cn(
          fontClass,
          'text-3xl text-white leading-10 -tracking-[3%]',
        )}
      >
        {title}
      </h1>
      {children}
    </header>
  );
}
