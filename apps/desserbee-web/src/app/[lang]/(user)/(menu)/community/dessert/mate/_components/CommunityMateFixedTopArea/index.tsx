'use client';

import type { WithChildren } from '@repo/ui/index';
import DessertSearchBar from '../../../_components/SearchBar';
import useSearchView from '../../../_hooks/useSearchView';

export default function CommunityMateFixedTopArea({ children }: WithChildren) {
  const { isViewSearchBar } = useSearchView();

  // 고정된 높이를 가진 컨테이너를 사용하고, 내부 콘텐츠만 전환
  return (
    <div className="relative">
      {/* 검색바와 기존 콘텐츠를 절대 위치로 배치하여 같은 공간을 차지하도록 함 */}
      <div
        className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${isViewSearchBar ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
      >
        <DessertSearchBar searchType="dessert-mate-search" />
      </div>

      <div
        className={`transition-opacity duration-300 ${isViewSearchBar ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {children}
      </div>
    </div>
  );
}
