import { SearchBarIcon } from './svg/SearchBarIcon';

interface SearchBarProps {
  placeHolder: string;
}
export function SearchBar({ placeHolder }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="mt-[18px] mb-[14px] px-[53px] py-[22px] rounded-[60px] w-full text-[22px]"
        placeholder={placeHolder}
      />
      <div className="top-[53%] left-6 absolute -translate-y-1/2">
        <SearchBarIcon />
      </div>
    </div>
  );
}
