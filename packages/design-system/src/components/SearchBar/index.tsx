import IconSearch from '../icons/IconSearch';
import { debounce } from '../../../../utility/src/debounce';
import { memo, useCallback } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

export const SearchBar = memo(function SearchBar({
  searchTerm,
  onChange,
}: SearchBarProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );

  return (
    <form className="relative px-4 w-full">
      <input
        type="text"
        placeholder="원하는 디저트 메이트를 검색해보세요!"
        value={searchTerm}
        className="shadow-[2px_2px_5px_0px_rgba(0,0,0,0.1)] my-[9px] py-[9.17px] pr-[20px] pl-[42.32px] rounded-[60px] w-full md:text-[15px] text-sm"
        onChange={handleChange}
      />
      <div className="top-1/2 left-[38px] md:left-[37.49px] absolute -translate-y-1/2">
        <IconSearch className="w-4 md:w-4 h-4 md:h-6 text-[#B4B4B4]" />
      </div>
    </form>
  );
});
