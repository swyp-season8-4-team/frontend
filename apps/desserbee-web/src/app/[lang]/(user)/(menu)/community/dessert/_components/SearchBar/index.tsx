'use client';

import { useState, useCallback, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // 검색어가 있으면 검색 실행
    if (query) {
      // 실제 검색 로직 구현
      console.log("Searching for:", query);
    }
  }, [query]);

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
          placeholder="맛집동"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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