'use client';

import { MateSearchMessageAction, type MateSearchMessageData } from "@/types/postMessage";
import type { Mate, MateCategory } from "@repo/entity/src/mate";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import type { WithChildren } from "@repo/ui";
import useMessageEvent from "@repo/ui/hooks/useMessageEvent";
import MateService from "@repo/usecase/src/mateService";
import { createContext, useCallback, useState } from "react";

interface State {
  mates: Mate[];
  isLast: boolean;
  loadMore: () => Promise<void>;
}

const defaultState: State = {
  mates: [],
  isLast: false,
  loadMore: async () => {},
};

export const CommunityMateListContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  initialIsLast: boolean;
  initialMates: Mate[];
}

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
});

export function CommunityMateListProvider({ children, initialIsLast, initialMates }: Props) {
  const [mates, setMates] = useState<Mate[]>(initialMates);
  const [isLast, setIsLast] = useState(initialIsLast);
  const [page, setPage] = useState(10);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MateCategory | null>(null);

  const loadMore = useCallback(async () => {
    if (isLast) {
      return;
    }
    
    const response = await mateService.getMateList({
      from: page,
      to: page + 9,
      ...(!!selectedCategory && { mateCategoryId: selectedCategory }),
      ...(!!keyword && { keyword }),
    });

    setMates(prev => [...prev, ...response.mates]);
    setIsLast(response.isLast);
    setPage(page + 10);
  }, [isLast, keyword, page, selectedCategory]);

  // FIXME: 중복코드
  const messageReceiveHandler = useCallback(async ({ action, payload }: MateSearchMessageData) => {
    if (action === MateSearchMessageAction.GetMateCategories) {
      const response = await mateService.getMateList({
        ...(payload?.selectedCategory && { from: 0, to: page }),
        mateCategoryId: payload?.selectedCategory
      });

      if (!!payload?.selectedCategory) {
        setSelectedCategory(payload?.selectedCategory);
      }

      setMates((prev) => {
        return response.mates.filter((mate) => !prev.some((prevMate) => prevMate.id === mate.id));
      });
      setIsLast(response.isLast);
      return;
    }

    if (action === MateSearchMessageAction.GetMateSearch) {
      const response = await mateService.getMateList({
        ...(!payload?.keyword && { from: 0, to: page }),
        ...(!!payload?.keyword && { keyword: payload?.keyword }),
      });

      if (!!payload?.keyword) {
        setKeyword(payload?.keyword);
      }

      setMates((prev) => {
        return response.mates.filter((mate) => !prev.some((prevMate) => prevMate.id === mate.id));
      });
      setIsLast(response.isLast);
      return;
    }

  }, [page]);

  useMessageEvent(messageReceiveHandler);

  return (
    <CommunityMateListContext.Provider value={{ mates, isLast, loadMore }}>
      {children}
    </CommunityMateListContext.Provider>
  )
}