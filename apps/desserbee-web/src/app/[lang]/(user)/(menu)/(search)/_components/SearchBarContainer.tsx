'use client';

import { memo } from 'react';
import { SearchBar } from '@repo/design-system/components/SearchBar';
import { useHashSearch } from '../_hooks/useHashSearch';
import { SearchBarPanel } from './SearchBarPanel';

export const SearchBarContainer = memo(function SearchBarContainer() {
  const { searchTerm, onChange, onSearch } = useHashSearch();

  return (
    <div className="absolute w-full bg-page z-10">
      <SearchBar
        searchTerm={searchTerm}
        onChange={onChange}
        onSearch={onSearch}
      />
      <div className="">
        <SearchBarPanel />
      </div>
    </div>
  );
});
