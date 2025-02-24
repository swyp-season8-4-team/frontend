'use client';

import { SearchBar } from '@repo/design-system/components/SearchBar';
import { useSearch } from '../_hooks/useSearch';

export function SearchBarContainer() {
  const { searchTerm, placeHolder, onChange, onSearch } = useSearch();

  return (
    <SearchBar
      searchTerm={searchTerm}
      placeHolder={placeHolder}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
}
