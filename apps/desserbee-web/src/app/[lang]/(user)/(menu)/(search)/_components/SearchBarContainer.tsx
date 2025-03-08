'use client';

import { memo } from 'react';
import { SearchBar } from '@repo/design-system/components/SearchBar';
import { useHashSearch } from '../_hooks/useHashSearch';

export const SearchBarContainer = memo(function SearchBarContainer() {
  const { searchTerm, onChange } = useHashSearch();

  return <SearchBar searchTerm={searchTerm} onChange={onChange} />;
});
