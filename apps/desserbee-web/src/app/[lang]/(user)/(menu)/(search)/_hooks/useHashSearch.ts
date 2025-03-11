'use client';

import { UserContext } from '@/contexts/UserContext';
import { useCallback, useState, useEffect, useContext } from 'react';
// import { debounce } from '@repo/utility/src/debounce';

export function useHashSearch() {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState(''); // searchTerm은 보여주기용
  const [isSearchPanelShow, setIsSearchPanelShow] = useState(false);

  // 첫 로딩 시 해시값 비우기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 초기 해시값 로드
      // const hash = window.location.hash;
      // const query = hash.match(/q=([^&]*)/)?.[1] ?? '';
      // URL 해시에서 가져온 값은 보여주기위해 디코딩 (브라우저마다 자동 디코딩 안될 수 있어서)
      // setSearchTerm(decodeURIComponent(query));
      setSearchTerm('');
      window.location.hash = '';
    }
    setSearchTerm('');
  }, []);

  // TODO: 여기에 나중에 연관 검색어 연결
  // const onChange = useCallback((query: string) => {
  //   setSearchTerm(query);

  //   // 디바운스된 해시 URL 업데이트
  //   debounce({
  //     key: 'hashUrlChange',
  //     wait: 300,
  //     callback: () => {
  //       if (typeof window !== 'undefined') {
  //         window.location.hash = query ? `q=${encodeURIComponent(query)}` : '';
  //       }
  //     },
  //   });

  // }, []);

  const onChange = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const saveNotSignInSearchHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    try {
      // 검색어 sanitization 후 Base64 인코딩
      const sanitizedQuery = query.trim().replace(/[<>]/g, '');
      const encodedQuery = btoa(encodeURIComponent(sanitizedQuery));

      const searchHistory = JSON.parse(
        localStorage.getItem('searchHistory') || '[]',
      );
      const updatedHistory = [
        encodedQuery,
        ...searchHistory.filter((term: string) => term !== encodedQuery),
      ];
      const limitedHistory = updatedHistory.slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }, []);

  const onSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return; // 빈 검색어 처리

      setSearchTerm(query);
      if (typeof window !== 'undefined') {
        // 현재 해시와 새 검색어가 같은 경우, 해시를 잠시 비웠다가 다시 설정
        if (window.location.hash === `#q=${encodeURIComponent(query)}`) {
          window.location.hash = '';

          // 약간의 지연 후 다시 해시 설정
          setTimeout(() => {
            window.location.hash = `q=${encodeURIComponent(query)}`;
          }, 10);
        } else {
          // 다른 검색어인 경우 바로 해시 설정
          window.location.hash = `q=${encodeURIComponent(query)}`;
        }

        handleSearchPanelShow(false);
        if (!user && query.trim()) {
          saveNotSignInSearchHistory(query);
        }
      }
    },
    [user, saveNotSignInSearchHistory],
  );

  const onClear = () => {
    setSearchTerm('');
    window.location.hash = '';
  };

  const handleSearchPanelShow = (isShow: boolean) => {
    setIsSearchPanelShow(isShow);
  };

  return {
    searchTerm,
    onChange,
    onSearch,
    onClear,
    isSearchPanelShow,
    handleSearchPanelShow,
  };
}
