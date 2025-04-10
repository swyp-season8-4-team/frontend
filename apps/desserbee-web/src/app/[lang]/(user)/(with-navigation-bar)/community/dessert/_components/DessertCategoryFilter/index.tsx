'use client';

import { useContext } from 'react';
import { CommunityDessertCategorySearchContext } from '../../_contexts/CommunityDessertCategorySearchContext';
import type { CommunityCategory } from '@repo/entity/src/community';

interface Props {
  categories: CommunityCategory[];
}

export default function DessertCategoryFilter({ categories }: Props) {
  const { activeCategory, handleCategoryClick } = useContext(
    CommunityDessertCategorySearchContext,
  );

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <button
          key={`dessert-mate-${category}-chip`}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium text-[#412D00] transition-colors ${
            activeCategory === category
              ? 'border-primary-70 bg-primary-90'
              : 'border-[#CDC8C3] bg-white'
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
