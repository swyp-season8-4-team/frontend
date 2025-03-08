'use client';

import { useContext, useEffect, useState } from "react";
import { CommunityDessertCategorySearchContext } from "../../_contexts/CommunityDessertCategorySearchContext";

export default function SearchBar() {
  const { handleSearch: handleMateSearch } = useContext(CommunityDessertCategorySearchContext);
  const [query, setQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    handleMateSearch('dessert-mate-search-submit', query);

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleMateSearch('dessert-mate-search-input', e.target.value);
  };

  // 검색창이 나타날 때 input에 포커스
  useEffect(() => {
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  
  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={query}
          onChange={handleInputChange}
          className="w-full py-3 px-12 rounded-full bg-white text-sm focus:outline-none"
        />
        <div className="absolute left-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </form>
  );
} 