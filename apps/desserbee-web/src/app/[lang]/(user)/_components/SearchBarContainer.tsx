'use client';

import { memo } from 'react';
import { SearchBar } from '@repo/design-system/components/SearchBar';
import { useHashSearch } from '../_hooks/useHashSearch';
import { SearchBarPanel } from './SearchBarPanel';

export const SearchBarContainer = memo(function SearchBarContainer() {
  const {
    searchTerm,
    onChange,
    onSearch,
    onClear,
    isSearchPanelShow,
    handleSearchPanelShow,
  } = useHashSearch();

  return (
    <div className="z-modal w-full">
      <SearchBar
        searchTerm={searchTerm}
        onChange={onChange}
        onSearch={onSearch}
        onClear={onClear}
        isSearchPanelShow={isSearchPanelShow}
        handleSearchPanelShow={handleSearchPanelShow}
      />
      {isSearchPanelShow && (
        <div className="absolute z-[100]">
          <SearchBarPanel onChange={onChange} onSearch={onSearch} />
        </div>
      )}
    </div>
  );
});
