'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  
  const handleCategoryClick = (category: string) => {
    setActiveCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <div className="flex gap-2 overflow-x-auto mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      {categories.map((category) => (
        <button
          key={`${category}-chip`}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
            activeCategories.has(category) 
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