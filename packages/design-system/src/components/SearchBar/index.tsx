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
    <form className="relative w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        className="mt-[18px] mb-[14px] px-[53px] py-[22px] rounded-[60px] w-full text-[22px]"
        placeholder={placeHolder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="top-[53%] left-6 absolute -translate-y-1/2">
        <IconSearch size={IconSize.m} className="text-[#B4B4B4]" />
      </div>
    </form>
  );
}
