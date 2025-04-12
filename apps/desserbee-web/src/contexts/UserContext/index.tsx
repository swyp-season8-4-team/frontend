'use client';

import type { User } from '@repo/entity/src/user';
import type { WithChildren } from '@repo/ui';
import { createContext, useEffect, useMemo, useState } from 'react';
import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import DefaultFemaleAvatar from '@/assets/images/image-default-female-profile.png';
import DefaultProfileImage from '@/assets/svg/logo-bee.svg';
import type { StaticImageData } from 'next/image';
import UserService from '@repo/usecase/src/userService';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';

interface State {
  user: User | null;
  realProfileImageUrl: string | StaticImageData;
  updateUserProfile: (profileData: Partial<User>) => Promise<void>;
}

const defaultState: State = {
  user: null,
  realProfileImageUrl: '',
  updateUserProfile: () => Promise.resolve(),
};

export const UserContext = createContext<State>(defaultState);

const userService = new UserService({
  userRepository: new UserAPIRepository(),
});

interface Props extends WithChildren {
  user: User | null;
}

export function UserProvider({ children, user: initialUser }: Props) {
  const [user, setUser] = useState<User | null>(initialUser);

  const realProfileImageUrl = useMemo(() => {
    if (!user) {
      return '';
    }

    if (!!user.profileImageUrl) {
      return user.profileImageUrl;
    }

    // if (user.gender === 'MALE') {
    //   return DefaultMaleAvatar;
    // }

    // return DefaultFemaleAvatar;

    return DefaultProfileImage;
  }, [user]);

  const updateUserProfile = async (profileData: Partial<User>) => {
    if (!user) {
      return;
    }

    const updatedUser = await userService.updateMe({ ...user, ...profileData });

    setUser(updatedUser);
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
