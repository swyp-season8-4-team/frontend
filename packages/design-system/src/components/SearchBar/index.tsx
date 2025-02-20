import { IconSize } from '../icons';
import IconSearch from '../icons/IconSearch';

interface SearchBarProps {
  searchTerm: string;
  placeHolder: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

export function SearchBar({
  searchTerm,
  placeHolder,
  onChange,
  onSearch,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault();
      onSearch(searchTerm);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <form className="relative px-4 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        className="shadow-[2px_2px_5px_0px_rgba(0,0,0,0.1)] my-[9px] md:mt-[18px] md:mb-[14px] px-[42.32px] md:px-[53px] py-[9.17px] md:py-[22px] rounded-[60px] w-full md:text-[22px] text-sm"
        placeholder={placeHolder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="top-[53%] left-6 absolute -translate-y-1/2">
        <IconSearch className="w-4 md:w-6 h-4 md:h-6 text-[#B4B4B4]" />
      </div>
    </form>
  );
}
