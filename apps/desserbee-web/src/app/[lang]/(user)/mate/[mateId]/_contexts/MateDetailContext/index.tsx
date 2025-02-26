'use client';

import type { Mate } from "@repo/entity/src/mate";
import type { WithChildren } from "@repo/ui";
import { createContext } from "react";

interface State {
  mate: Mate;
}

const defaultState: State = {
  mate: {
    id: '',
    userId: '',
    title: '',
    content: '',
    place: {
      placeName: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
    mateCategory: '친목도모',
    mateImage: '',
    profileImage: '',
    nickname: '',
    recruit: false,
    createdAt: '',
    updatedAt: '',
  },
};

export const MateDetailContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  mate: Mate;
}

export const MateDetailProvider = ({ children, mate }: Props) => {
  return (
    <MateDetailContext.Provider value={{ mate }}>
      {children}
    </MateDetailContext.Provider>
  );
};