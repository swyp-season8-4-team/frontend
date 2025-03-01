'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SEARCH_CONFIG } from '../_consts/search';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { debounce } from '@repo/utility/src/debounce';

interface SearchConfig {
  placeHolder: string;
  onSearch: (value: string) => void;
}

export function useHashSearch() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  // 컴포넌트 마운트 시 해시에서 초기 검색어 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#q=')) {
        const query = decodeURIComponent(hash.substring(3));
        setSearchTerm(query);
      }
    }
  }, []);

  const normalizedPath = pathname.split('/', 3)[2];
  const path = `/${normalizedPath}`;

  const getSearchConfig = useCallback((): SearchConfig => {
    switch (path) {
      case NavigationPathname.Community:
        return {
          placeHolder: SEARCH_CONFIG.COMMUNITY.placeholder,
          onSearch: (value: string) => {
            // 커뮤니티 검색 로직
            console.log('커뮤니티 검색:', value);
            // 여기서 실제 검색 로직을 실행 (예: 상태 업데이트, API 호출 등)
          },
        };
      case NavigationPathname.Map:
        return {
          placeHolder: SEARCH_CONFIG.MAP.placeholder,
          onSearch: (value: string) => {
            // 지도 검색 로직
            console.log('지도 검색:', value);
            // 여기서 실제 검색 로직을 실행
          },
        };
      default:
        return {
          placeHolder: SEARCH_CONFIG.DEFAULT.placeholder,
          onSearch: (value: string) => {
            // 기본 검색 로직
            console.log('default:', value);
            // 여기서 실제 검색 로직을 실행
          },
        };
    }
  }, [path]);

  const { placeHolder, onSearch: configOnSearch } = getSearchConfig();

  // 해시 URL 업데이트 함수
  const updateHashUrl = useCallback((query: string) => {
    if (typeof window !== 'undefined') {
      if (query) {
        // URL 해시 업데이트 (서버에 요청 없음)
        window.location.hash = `q=${encodeURIComponent(query)}`;
      } else {
        // 빈 검색어일 경우 해시 제거
        window.location.hash = '';
      }
    }
  }, []);

  // 디바운스된 해시 URL 업데이트
  const debouncedUpdateHash = useCallback(
    (query: string) => {
      debounce({
        key: 'hashUrlChange',
        wait: 300,
        callback: () => updateHashUrl(query),
      });
    },
    [updateHashUrl],
  );

  // 검색어 변경 핸들러
  const onChange = useCallback(
    (query: string) => {
      setSearchTerm(query);
      debouncedUpdateHash(query);
    },
    [debouncedUpdateHash],
  );

  // 검색 실행 핸들러
  const onSearch = useCallback(
    (query: string) => {
      // 해시 URL 즉시 업데이트 (디바운스 없이)
      updateHashUrl(query);
      // 검색 로직 실행
      configOnSearch(query);
    },
    [configOnSearch, updateHashUrl],
  );

  // 해시 변경 이벤트 리스너
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#q=')) {
        const query = decodeURIComponent(hash.substring(3));
        setSearchTerm(query);
        // 해시가 변경되면 검색 로직 실행 (선택적)
        // configOnSearch(query);
      } else if (hash === '') {
        setSearchTerm('');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [configOnSearch]);

  return {
    searchTerm,
    placeHolder,
    onChange,
    onSearch,
  };
}

// 이 컴포넌트는 해시 변경을 감지하고 필요한 상태를 전파하는 역할을 합니다.
// SearchBarContainer와 별도로 리스닝하여 중복 작업을 방지합니다.
export const HashChangeListener = memo(function HashChangeListener({
  onHashChange,
}: {
  onHashChange: (query: string) => void;
}) {
  useEffect(() => {
    // 초기 해시 확인
    const checkInitialHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#q=')) {
        const query = decodeURIComponent(hash.substring(3));
        onHashChange(query);
      } else {
        onHashChange('');
      }
    };

    // 해시 변경 이벤트 핸들러
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#q=')) {
        const query = decodeURIComponent(hash.substring(3));
        onHashChange(query);
      } else {
        onHashChange('');
      }
    };

    // 초기 해시 확인
    checkInitialHash();

    // 해시 변경 이벤트 리스너 등록
    window.addEventListener('hashchange', handleHashChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [onHashChange]);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다
  return null;
});
