'use client';

import { useCallback, useState } from "react";

import type { SearchMessageData } from "@/types/postMessage";
import { SearchMessageAction } from "@/types/postMessage";
import useMessageEvent from "@repo/ui/hooks/useMessageEvent";
import type { WithChildren } from "@repo/ui/index";
import SearchBar from "../../../_components/SearchBar";

export default function CommunityMateFixedTopArea({ children }: WithChildren) {
  const [isViewSearchBar, setViewSearchBar] = useState(false);

  const messagehandler = useCallback(({ action }: SearchMessageData) => {
    if (action === SearchMessageAction.OpenSearchBar) {
      setViewSearchBar(prev => !prev);
    }
  }, []);

  useMessageEvent(messagehandler);

  // 고정된 높이를 가진 컨테이너를 사용하고, 내부 콘텐츠만 전환
  return (
    <div className="relative min-h-[120px]">
      {/* 검색바와 기존 콘텐츠를 절대 위치로 배치하여 같은 공간을 차지하도록 함 */}
      <div className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${isViewSearchBar ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        <SearchBar />
      </div>
      
      <div className={`transition-opacity duration-300 ${isViewSearchBar ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
}