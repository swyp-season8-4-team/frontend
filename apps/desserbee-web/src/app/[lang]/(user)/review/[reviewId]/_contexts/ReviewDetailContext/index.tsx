'use client';

import type { Review } from "@repo/entity/src/review";
import type { WithChildren } from "@repo/ui";
import { createContext } from "react";

interface State {
  review: Review;
}

const defaultState: State = {
  review: {
    id: '',
    userId: '',
    title: '',
    contents: [],
    place: {
      name: '',
      address: '',
      latitude: '',
      longitude: '',
    },
    profileImage: '',
    nickname: '',
    createdAt: '',
    updatedAt: '',
    gender: 'MALE',
    storeId: 0,
    saved: false,
    viewCount: 0,
    category: '입터짐 조심',
  },
};

export const ReviewDetailContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  review: Review;
}

export const ReviewDetailProvider = ({ children, review }: Props) => {
  return (
    <ReviewDetailContext.Provider value={{ review }}>
      {children}
    </ReviewDetailContext.Provider>
  );
};