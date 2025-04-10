'use client';

import type { WithChildren } from '@repo/ui/index';
import DessertSearchBar from '../../../_components/SearchBar';
import useSearchView from '../../../_hooks/useSearchView';

export default function CommunityReviewFixedTopArea({
  children,
}: WithChildren) {
  const { isViewSearchBar } = useSearchView();

  return (
    <div className="relative min-h-[48px]">
      {/* 검색바와 기존 콘텐츠를 절대 위치로 배치하여 레이아웃 시프트 방지 */}
      <div
        className={`absolute top-0 left-0 right-0 w-full transition-all duration-300 ${
          isViewSearchBar ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <DessertSearchBar searchType="dessert-review-search" />
      </div>

      <div
        className={`absolute top-2 left-0 right-0 w-full transition-all duration-300 ${
          isViewSearchBar ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
