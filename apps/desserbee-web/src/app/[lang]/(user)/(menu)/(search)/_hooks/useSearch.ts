'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SEARCH_CONFIG } from '../_consts/search';
import { NavigationPathname } from '@repo/entity/src/navigation';

interface SearchConfig {
  placeHolder: string;
  onSearch: (value: string) => void;
}

export function useSearch() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  const normalizedPath = pathname.split('/', 3)[2];
  const path = `/${normalizedPath}`;

  const getSearchConfig = (): SearchConfig => {
    switch (path) {
      case NavigationPathname.Community:
        return {
          placeHolder: SEARCH_CONFIG.COMMUNITY.placeholder,
          onSearch: (value: string) => {
            // 커뮤니티 검색 로직
            console.log('커뮤니티 검색:', value);
          },
        };
      case NavigationPathname.Map:
        return {
          placeHolder: SEARCH_CONFIG.MAP.placeholder,
          onSearch: (value: string) => {
            // 지도 검색 로직
            console.log('지도 검색:', value);
          },
        };
      default:
        return {
          placeHolder: SEARCH_CONFIG.DEFAULT.placeholder,
          onSearch: (value: string) => {
            // 기본 검색 로직
            console.log('default:', value);
          },
        };
    }
  };

  const { placeHolder, onSearch } = getSearchConfig();

  const onChange = (value: string) => {
    setSearchTerm(value);
  };

  return {
    searchTerm,
    placeHolder,
    onChange,
    onSearch,
  };
}
