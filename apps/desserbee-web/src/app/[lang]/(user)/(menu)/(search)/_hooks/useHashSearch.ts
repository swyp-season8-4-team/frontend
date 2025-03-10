'use client';

import { useCallback, useState, useEffect } from 'react';
// import { debounce } from '@repo/utility/src/debounce';

export function useHashSearch() {
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
    // 빈 문자열을 포함한 모든 값에 대해 searchTerm 업데이트
    setSearchTerm(query);

    // 빈 문자열일 경우 해시도 제거
    if (query === '') {
      window.location.hash = 'q=';
    }
  }, []);

  // 엔터나 입력 완료 버튼 눌렀을 때 실행
  const onSearch = useCallback((query: string) => {
    setSearchTerm(query);
    if (typeof window !== 'undefined') {
      window.location.hash = query ? `q=${encodeURIComponent(query)}` : '';
      handleSearchPanelShow(false);
    }
  }, []);

  const handleSearchPanelShow = (isShow: boolean) => {
    setIsSearchPanelShow(isShow);
  };

  return {
    searchTerm,
    onChange,
    onSearch,
    isSearchPanelShow,
    handleSearchPanelShow,
  };
}
