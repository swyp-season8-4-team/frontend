'use client';

import { SearchMessageAction } from "@/types/postMessage";
import type { CommunityCategory } from "@repo/entity/src/community";
import type { WithChildren } from "@repo/ui";
import { debounce } from "@repo/utility/src/debounce";
import { createContext, useState, useCallback } from "react";

interface State {
  activeCategory: CommunityCategory | null;
  handleCategoryClick: (category: CommunityCategory) => void;
  handleSearch: (debounceKey: string, keyword: string) => void;
}

const defaultState: State = {
  activeCategory: null,
  handleCategoryClick: () => {},
  handleSearch: () => {},
};

export const CommunityDessertCategorySearchContext = createContext<State>(defaultState);

export function CommunityDessertCategorySearchProvider({ children }: WithChildren) {
  const [activeCategory, setActiveCategory] = useState<CommunityCategory | null>(null);
  
  const handleCategoryClick = (category: CommunityCategory) => {
    // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
    setActiveCategory(activeCategory === category ? null : category);

    window.postMessage({
      action: SearchMessageAction.GetCategories,
      payload: {
        selectedCategory: activeCategory === category ? null : category,
      },
    }, window.location.origin);
  };

  const handleSearch = useCallback((debounceKey: string, keyword: string) => {
    debounce({
      key: debounceKey,
      wait: 200,
      callback: () => {
        window.postMessage({
          action: SearchMessageAction.GetSearch,
          payload: {
            keyword,
          },
        }, window.location.origin);
      }
    });
  }, []);
  
  return (
    <CommunityDessertCategorySearchContext.Provider
      value={{
        activeCategory,
        handleCategoryClick,
        handleSearch
      }}
    >
      {children}
    </CommunityDessertCategorySearchContext.Provider>
  )
}