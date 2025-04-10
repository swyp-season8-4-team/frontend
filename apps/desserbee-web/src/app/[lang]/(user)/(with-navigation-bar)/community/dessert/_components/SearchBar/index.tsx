'use client';

import { useContext, useEffect, useState } from 'react';
import { CommunityDessertCategorySearchContext } from '../../_contexts/CommunityDessertCategorySearchContext';
import type { CommunityDessertSearchType } from '../../_types';

interface Props {
  searchType: CommunityDessertSearchType;
}

export default function DessertSearchBar({ searchType }: Props) {
  const { handleSearch } = useContext(CommunityDessertCategorySearchContext);

  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSearch(`${searchType}-submit`, query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(`${searchType}-input`, e.target.value);
  };

  // 검색창이 나타날 때 input에 포커스
  useEffect(() => {
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement instanceof HTMLInputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={query}
          onChange={handleInputChange}
          className="w-full rounded-full bg-white px-12 py-2 text-sm focus:outline-none"
        />
        <div className="absolute left-4">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </form>
  );
}
