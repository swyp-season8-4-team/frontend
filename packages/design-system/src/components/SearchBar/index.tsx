import { cn } from '@repo/ui/lib/utils';
import { memo, useCallback, useRef } from 'react';
import IconSearch from '../icons/IconSearch';
import IconDirection from '../icons/IconDirection';
import IconX from '../icons/IconX';

interface SearchBarProps {
  searchTerm: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onClear: () => void;
  isSearchPanelShow: boolean;
  handleSearchPanelShow: (isShow: boolean) => void;
}

export const SearchBar = memo(function SearchBar({
  searchTerm,
  onChange,
  onSearch,
  onClear,
  isSearchPanelShow,
  handleSearchPanelShow,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        onSearch(searchTerm);
        inputRef.current?.blur();
      }
    },
    [onSearch, searchTerm],
  );

  return (
    <form className="relative px-4 w-full" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="search"
        placeholder="요즘 핫한 디저트를 찾아보세요!"
        value={searchTerm}
        className="shadow-[2px_2px_5px_0px_rgba(0,0,0,0.1)] pr-8 my-[9px] py-[9.17px] pl-[42.32px] rounded-[60px] w-full md:text-[15px] text-xs [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:appearance-none "
        onChange={handleChange}
        onFocus={() => handleSearchPanelShow(true)}
        enterKeyHint="search"
      />
      <button type="submit" className="hidden">
        검색
      </button>
      {isSearchPanelShow && (
        <div
          onClick={() => handleSearchPanelShow(false)}
          className="top-1/2 left-[20px] md:left-[20.49px] absolute -translate-y-1/2 flex items-center justify-center"
        >
          <IconDirection className="w-4 h-4 md:w-5 md:h-5 text-[#B4B4B4] rotate-90" />
        </div>
      )}
      <div className="top-1/2 left-[38px] md:left-[37.49px] absolute -translate-y-1/2">
        <IconSearch className="w-4 md:w-4 h-4 md:h-6 text-[#B4B4B4]" />
      </div>
      {isSearchPanelShow && (
        <div className="flex items-center">
          {searchTerm !== '' && (
            <button
              onClick={onClear}
              className="top-1/2 right-8 absolute -translate-y-1/2"
            >
              <IconX className="w-4 md:w-6 h-4 md:h-6 text-[#B4B4B4]" />
            </button>
          )}
        </div>
      )}
    </form>
  );
});
