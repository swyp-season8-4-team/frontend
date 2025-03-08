'use client';

import type { User } from '@repo/entity/src/user';
import type { WithChildren } from '@repo/ui';
import { createContext, useEffect, useMemo, useState } from 'react';
import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import DefaultFemaleAvatar from '@/assets/images/image-default-female-profile.png';
import type { StaticImageData } from 'next/image';
interface State {
  user: User | null;
  realProfileImageUrl: string | StaticImageData;
  updateUserProfile: (profileData: Partial<User>) => void;
}

const defaultState: State = {
  user: null,
  realProfileImageUrl: '',
  updateUserProfile: () => {},
};

export const UserContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  user: User | null;
}

export function UserProvider({ children, user: initialUser }: Props) {
  const [user, setUser] = useState<User | null>(initialUser);

  const realProfileImageUrl = useMemo(() => {
    if (!user) return '';

    if (!!user.profileImageUrl) {
      return user.profileImageUrl;
    }

    if (user.gender === 'MALE') {
      return DefaultMaleAvatar;
    }

    return DefaultFemaleAvatar;
  }, [user])

  const updateUserProfile = (profileData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...profileData } : null);
  };

  useEffect(() => {
    setUser((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(initialUser)) {
        return initialUser;
      }

      return prev;
    });
  }, [initialUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        realProfileImageUrl,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
