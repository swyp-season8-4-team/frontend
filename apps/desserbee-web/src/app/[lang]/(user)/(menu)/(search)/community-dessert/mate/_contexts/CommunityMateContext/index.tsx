'use client';

import type { Mate } from "@repo/entity/src/mate";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import type { WithChildren } from "@repo/ui";
import MateService from "@repo/usecase/src/mateService";
import { createContext, useState } from "react";

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

export const CommunityMateContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  initialIsLast: boolean;
  initialMates: Mate[];
}

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
});

export function CommunityMateProvider({ children, initialIsLast, initialMates }: Props) {
  const [mates, setMates] = useState<Mate[]>(initialMates);
  const [isLast, setIsLast] = useState(initialIsLast);
  const [page, setPage] = useState(10);

  const loadMore = async () => {
    if (isLast) return;
    
    const response = await mateService.getMateList({
      from: page,
      to: page + 9,
    });

    setMates(prev => [...prev, ...response.mates]);
    setIsLast(response.isLast);
    setPage(page + 10);
  };

  return (
    <CommunityMateContext.Provider value={{ mates, isLast, loadMore }}>
      {children}
    </CommunityMateContext.Provider>
  )
}