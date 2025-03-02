'use client';

import { MateSearchMessageAction } from "@/types/postMessage";
import type { MateCategory } from "@repo/entity/src/mate";
import type { WithChildren } from "@repo/ui";
import { debounce } from "@repo/utility/src/debounce";
import { createContext, useState, useCallback } from "react";

interface State {
  activeCategory: MateCategory | null;
  handleCategoryClick: (category: MateCategory) => void;
  handleMateSearch: (debounceKey: string, keyword: string) => void;
}

const defaultState: State = {
  activeCategory: null,
  handleCategoryClick: () => {},
  handleMateSearch: () => {},
};

export const CommunityMateCategorySearchContext = createContext<State>(defaultState);

export function CommunityMateCategorySearchProvider({ children }: WithChildren) {
  const [activeCategory, setActiveCategory] = useState<MateCategory | null>(null);
  
  const handleCategoryClick = (category: MateCategory) => {
    // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
    setActiveCategory(activeCategory === category ? null : category);

    window.postMessage({
      action: MateSearchMessageAction.GetMateCategories,
      payload: {
        selectedCategory: activeCategory === category ? null : category,
      },
    }, window.location.origin);
  };

  const handleMateSearch = useCallback((debounceKey: string, keyword: string) => {
    debounce({
      key: debounceKey,
      wait: 200,
      callback: () => {
        window.postMessage({
          action: MateSearchMessageAction.GetMateSearch,
          payload: {
            keyword,
          },
        }, window.location.origin);
      }
    });
  }, []);
  
  return (
    <CommunityMateCategorySearchContext.Provider value={{ activeCategory, handleCategoryClick, handleMateSearch }}>
      {children}
    </CommunityMateCategorySearchContext.Provider>
  )
}