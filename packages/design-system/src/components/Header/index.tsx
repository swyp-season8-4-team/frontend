import type { WithChildren } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';
import IconBee from '../icons/IconBee';

interface HeaderProp extends WithChildren {
  title: string;
  fontClass: string;
}

export function Header({ title, fontClass, children }: HeaderProp) {
  return (
    <header className="top-0 sticky">
      <div className="flex items-center bg-primary px-4 md:px-[18px] md:py-[21px] pt-[13px] pb-3 w-full text-[22px]">
        <div className="flex items-end">
          <div className="flex justify-center items-center w-[27px] md:w-[42.62px] h-[26.61px] md:h-[42px]">
            <IconBee size={27} className="w-full h-full" />
          </div>
          <h1
            className={cn(
              fontClass,
              'text-lg md:text-3xl text-white leading-none -tracking-[3%]',
            )}
          >
            {title}
          </h1>
        </div>
      </div>
      {children}
    </header>
  );
}
