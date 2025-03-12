'use client';

import { UserContext } from '@/contexts/UserContext';
import type { RecentSearchData } from '@repo/entity/src/search';
import { useCallback, useState, useEffect, useContext } from 'react';
// import { debounce } from '@repo/utility/src/debounce';

export function useHashSearch() {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState(''); // searchTerm은 보여주기용
  const [isSearchPanelShow, setIsSearchPanelShow] = useState(false);

  // 첫 로딩 시 해시값 비우기
  useEffect(() => {
    if (typeof window !== 'undefined') {
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

  const isValidQuery = useCallback((query: string): boolean => {
    // 공백이거나 두 글자 이하인 경우
    // if (!query.trim() || query.trim().length < 2) {
    if (!query.trim()) {
      return false;
    }

    // 한글 자음/모음이 포함된 경우 (완성된 글자와 섞여 있어도 검출)
    const containsKoreanConsonantsVowels = /[ㄱ-ㅎㅏ-ㅣ]/;
    if (containsKoreanConsonantsVowels.test(query.trim())) {
      return false;
    }

    return true;
  }, []);

  const saveNotSignInSearchHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    try {
      // 검색어 sanitization
      const sanitizedQuery = query.trim().replace(/[<>]/g, '');

      const searchHistory = JSON.parse(
        localStorage.getItem('searchHistory') || '[]',
      );

      const newSearchData: RecentSearchData = {
        id:
          searchHistory.length > 0
            ? Math.max(
                ...searchHistory.map((item: RecentSearchData) => item.id),
              ) + 1
            : 1,
        keyword: sanitizedQuery,
        createdAt: new Date().toISOString(),
      };

      const updatedHistory = [
        newSearchData,
        ...searchHistory.filter(
          (item: RecentSearchData) => item.keyword !== sanitizedQuery,
        ),
      ];

      const limitedHistory = updatedHistory.slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }, []);

  const onSearch = useCallback(
    (query: string) => {
      // 검색어 유효성 검사
      if (!isValidQuery(query)) {
        alert(
          '검색어를 확인해주세요 (*한글 자음/모음만 있는 검색어는 사용하실 수 없습니다.)',
        );
        return;
      }

      setSearchTerm(query);
      if (typeof window !== 'undefined') {
        // 공백을 모두 제거한 검색어 생성
        const trimmedQuery = query.replace(/\s+/g, '');

        // 현재 해시와 새 검색어가 같은 경우, 해시를 잠시 비웠다가 다시 설정
        if (window.location.hash === `#q=${encodeURIComponent(trimmedQuery)}`) {
          window.location.hash = '';

          // 약간의 지연 후 다시 해시 설정
          setTimeout(() => {
            window.location.hash = `q=${encodeURIComponent(trimmedQuery)}`;
          }, 10);
        } else {
          // 다른 검색어인 경우 바로 해시 설정
          window.location.hash = `q=${encodeURIComponent(trimmedQuery)}`;
        }

        handleSearchPanelShow(false);
        if (!user && query.trim()) {
          saveNotSignInSearchHistory(query);
        }
      }
    },
    [user, saveNotSignInSearchHistory, isValidQuery],
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
    isValidQuery, // 필요한 경우 외부에서도 유효성 검사 함수 사용 가능
  };
}
