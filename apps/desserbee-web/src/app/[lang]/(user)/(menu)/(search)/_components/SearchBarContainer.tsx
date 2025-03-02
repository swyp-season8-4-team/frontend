'use client';

import { memo } from 'react';
import { SearchBar } from '@repo/design-system/components/SearchBar';
import { useHashSearch } from '../_hooks/useHashSearch';

export const SearchBarContainer = memo(function SearchBarContainer() {
  const { searchTerm, placeHolder, onChange, onSearch } = useHashSearch();

  return (
    <SearchBar
      searchTerm={searchTerm}
      placeHolder={placeHolder}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
});
