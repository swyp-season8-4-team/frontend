'use client';

import { MateSearchMessageAction } from "@/types/postMessage";
import type { MateCategory } from "@repo/entity/src/mate";
import type { WithChildren } from "@repo/ui";
import { createContext, useState } from "react";

interface State {
  activeCategory: MateCategory | null;
  handleCategoryClick: (category: MateCategory) => void;
}

const defaultState: State = {
  activeCategory: null,
  handleCategoryClick: () => {},
};

export const CommunityMateCategoryContext = createContext<State>(defaultState);

export function CommunityMateCategoryProvider({ children }: WithChildren) {
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
  
  return (
    <CommunityMateCategoryContext.Provider value={{ activeCategory, handleCategoryClick }}>
      {children}
    </CommunityMateCategoryContext.Provider>
  )
}