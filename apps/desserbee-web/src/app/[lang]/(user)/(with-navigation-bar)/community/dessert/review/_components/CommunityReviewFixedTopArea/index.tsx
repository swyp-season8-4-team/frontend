'use client';

import type { WithChildren } from '@repo/ui/index';
import DessertSearchBar from '../../../_components/SearchBar';
import useSearchView from '../../../_hooks/useSearchView';

export default function CommunityReviewFixedTopArea({
  children,
}: WithChildren) {
  const { isViewSearchBar } = useSearchView();

  return (
    <div className="relative min-h-6">
      {/* 검색바와 기존 콘텐츠를 절대 위치로 배치하여 레이아웃 시프트 방지 */}
      <div
        className={`absolute left-0 top-2 w-full transition-opacity duration-300 ${isViewSearchBar ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'}`}
      >
        <DessertSearchBar searchType="dessert-review-search" />
      </div>

      <div
        className={`absolute left-0 right-0 top-2 w-full transition-all duration-300 ${
          isViewSearchBar ? 'invisible opacity-0' : 'visible opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
