'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SEARCH_CONFIG } from '../_consts/search';

interface SearchConfig {
  placeHolder: string;
  onSearch: (value: string) => void;
}

export function useSearch() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  const getSearchConfig = (): SearchConfig => {
    switch (pathname) {
      case '/ko/community': //TODO: lang에 따라 pathname 바뀜 - i18n usecase로 옮겨야함.?
        return {
          placeHolder: SEARCH_CONFIG.COMMUNITY.placeholder,
          onSearch: (value: string) => {
            // 커뮤니티 검색 로직
            console.log('커뮤니티 검색:', value);
          },
        };
      case '/ko/map':
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
