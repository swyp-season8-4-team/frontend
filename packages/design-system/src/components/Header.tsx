import { cn } from '@repo/ui/lib/utils';
import { SearchBar } from './SearchBar';

interface HeaderProp {
  fontClass: string;
}

export function Header({ fontClass }: HeaderProp) {
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
      {/* //TODO: placeHolder 페이지마다 다르게 */}
      <SearchBar placeHolder="지금 핫한 디저트를 검색해 보세요!" />
    </header>
  );
}
