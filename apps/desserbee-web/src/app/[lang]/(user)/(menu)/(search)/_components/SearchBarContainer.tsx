'use client';

import { memo } from 'react';
import { SearchBar } from '@repo/design-system/components/SearchBar';
import { useHashSearch } from '../_hooks/useHashSearch';
import { SearchBarPanel } from './SearchBarPanel';

export const SearchBarContainer = memo(function SearchBarContainer() {
  const { searchTerm, onChange, onSearch } = useHashSearch();

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onChange={onChange}
        onSearch={onSearch}
      />
      <SearchBarPanel />
    </div>
  );
});
