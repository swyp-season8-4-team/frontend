'use client';

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CommunityMateTitle from "../CommunityMateTitle";
import Link from "next/link";
import SeeMoreIconButton from "../SeeMoreIconButton";
import IconButton from "@repo/design-system/components/buttons/IconButton";
import { IconSize } from "@repo/design-system/components/icons";
import IconSearch from "@repo/design-system/components/icons/IconSearch";
import IconClose from "@repo/design-system/components/icons/IconClose";
import { NavigationPathname } from "@repo/entity/src/navigation";

interface SearchUIProps {
  initialQuery: string;
}

export default function SearchUI({ initialQuery }: SearchUIProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (isSearchOpen && query) {
      // 검색 모드를 닫을 때 쿼리가 있으면 쿼리 제거
      router.push('.', { scroll: false });
      setQuery('');
    }
  }, [isSearchOpen, query, router]);
  
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (query) {
      router.push(`?q=${encodeURIComponent(query)}`, { scroll: false });
    } else {
      router.push('.', { scroll: false });
    }
  }, [query, router]);
  
  return (
    <div className="mb-6">
      {isSearchOpen ? (
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="맛집동"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3 px-12 rounded-full bg-white text-sm focus:outline-none"
              autoFocus
            />
            <div className="absolute left-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              type="button"
              onClick={toggleSearch}
              className="absolute right-4"
            >
              <IconClose size={IconSize.xs} />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between relative">
          <CommunityMateTitle />
          <div className="flex gap-2">
            <Link className="px-[10.641px] py-[5.32px] rounded-[53.204px] bg-[#898989] text-sm whitespace-nowrap flex justify-center items-center gap-[10.641px] w-[43px] h-[19px] flex-shrink-0 text-[9.577px] text-white font-semibold leading-[130%] tracking-[-0.287px]" href={NavigationPathname.MateWrite}>
              글쓰기
            </Link>
            <SeeMoreIconButton />
            <IconButton onClick={toggleSearch}>
              <IconSearch size={IconSize.s} />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
} 