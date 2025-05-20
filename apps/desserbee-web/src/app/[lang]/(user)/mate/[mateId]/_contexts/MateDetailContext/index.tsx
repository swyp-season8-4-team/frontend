'use client';

import type { Mate } from '@repo/entity/src/mate';
import type { WithChildren } from '@repo/ui';
import { createContext, useState } from 'react';

interface State {
  mate: Mate;
  updateMateStatus: (
    status: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED',
  ) => void;
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
    gender: 'MALE',
    applyStatus: 'PENDING',
    capacity: 0,
    storeId: null,
    currentMemberCount: 0,
    saved: false,
  },
  updateMateStatus: () => {},
};

export const MateDetailContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  mate: Mate;
}

export const MateDetailProvider = ({ children, mate: initialMate }: Props) => {
  const [mate, setMate] = useState(initialMate);

  const updateMateStatus = (
    status: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED',
  ) => {
    setMate((prev) => ({
      ...prev,
      applyStatus: status,
    }));
  };

  return (
    <MateDetailContext.Provider value={{ mate, updateMateStatus }}>
      {children}
    </MateDetailContext.Provider>
  );
};
