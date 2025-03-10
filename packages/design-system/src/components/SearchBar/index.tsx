import IconSearch from '../icons/IconSearch';
import { memo, useCallback, useRef } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  isSearchPanelShow: boolean;
  handleSearchPanelShow: (isShow: boolean) => void;
}

export const SearchBar = memo(function SearchBar({
  searchTerm,
  onChange,
  onSearch,
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
      onSearch(searchTerm);
      inputRef.current?.blur();
    },
    [onSearch, searchTerm],
  );

  return (
    <form className="relative px-4 w-full" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="search"
        placeholder="원하는 디저트 메이트를 검색해보세요!"
        value={searchTerm}
        className="shadow-[2px_2px_5px_0px_rgba(0,0,0,0.1)] my-[9px] py-[9.17px] pl-[42.32px] rounded-[60px] w-full md:text-[15px] text-sm [&::-webkit-search-cancel-button]:appearance-none pr-[110px]"
        onChange={handleChange}
        onFocus={() => handleSearchPanelShow(true)}
        enterKeyHint="search"
      />
      <div className="top-1/2 left-[38px] md:left-[37.49px] absolute -translate-y-1/2">
        <IconSearch className="w-4 md:w-4 h-4 md:h-6 text-[#B4B4B4]" />
      </div>
      {isSearchPanelShow && (
        <button
          onClick={() => handleSearchPanelShow(false)}
          className="top-1/2 right-8 absolute -translate-y-1/2"
        >
          <div className="text-[#B4B4B4] md:text-[13px] text-[10px]">
            검색어 추천 닫기
          </div>
        </button>
      )}
    </form>
  );
});
