'use client';

import { SearchMessageAction, type SearchMessageData } from "@/types/postMessage";

import { useCallback, useState } from "react";

import useMessageEvent from "@repo/ui/hooks/useMessageEvent";

export default function useSearchView() {
  const [isViewSearchBar, setViewSearchBar] = useState(false);

  const messagehandler = useCallback(({ action }: SearchMessageData) => {
    if (action === SearchMessageAction.OpenSearchBar) {
      setViewSearchBar(prev => !prev);
    }
  }, []);

  useMessageEvent(messagehandler);

  return { isViewSearchBar };
}
