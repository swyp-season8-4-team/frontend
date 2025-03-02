'use client';

import type { MateCategory } from '@repo/entity/src/mate';
import { useContext } from 'react';
import { CommunityMateCategoryContext } from '../../_contexts/CommunityMateCategoryContext';

interface CategoryFilterProps {
  categories: MateCategory[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const { activeCategory, handleCategoryClick } = useContext(CommunityMateCategoryContext);
  
  return (
    <div className="flex gap-2 overflow-x-auto mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      {categories.map((category) => (
        <button
          key={`dessert-mate-${category}-chip`}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
            activeCategory === category 
              ? 'bg-[#FFC700] text-white' 
              : 'bg-white text-[#333] hover:bg-gray-50'
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 