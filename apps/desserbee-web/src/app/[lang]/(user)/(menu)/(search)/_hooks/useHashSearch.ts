'use client';

import { useCallback, useState, useEffect } from 'react';
import { debounce } from '@repo/utility/src/debounce';

export function useHashSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  // 초기 해시값 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const query = hash.match(/q=([^&]*)/)?.[1] ?? '';
      // URL 해시에서 가져온 값은 반드시 디코딩 (브라우저마다 자동 디코딩 안될 수 있어서)
      setSearchTerm(decodeURIComponent(query));
    }
  }, []);

  // 검색어 변경 핸들러
  const onChange = useCallback((query: string) => {
    setSearchTerm(query);

    // 디바운스된 해시 URL 업데이트
    debounce({
      key: 'hashUrlChange',
      wait: 300,
      callback: () => {
        if (typeof window !== 'undefined') {
          // hash에 실제로 저장되는 값은 인코딩 된 값
          window.location.hash = query ? `q=${encodeURIComponent(query)}` : '';
        }
      },
    });
  }, []);

  return {
    searchTerm,
    onChange,
  };
}
