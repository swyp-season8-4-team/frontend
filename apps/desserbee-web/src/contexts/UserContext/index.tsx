'use client';

import type { User } from '@repo/entity/src/user';
import type { WithChildren } from '@repo/ui';
import { createContext, useEffect, useMemo, useState } from 'react';
import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import DefaultFemaleAvatar from '@/assets/images/image-default-female-profile.png';
import type { StaticImageData } from 'next/image';
import { updateMe } from './action';
import { useRouter } from 'next/navigation';

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

interface Props extends WithChildren {
  user: User | null;
}

export function UserProvider({ children, user: initialUser }: Props) {
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  const realProfileImageUrl = useMemo(() => {
    if (!user) {
      return '';
    }

    if (!!user.profileImageUrl) {
      return user.profileImageUrl;
    }

    if (user.gender === 'MALE') {
      return DefaultMaleAvatar;
    }

    return DefaultFemaleAvatar;

    // return DefaultProfileImage;
  }, [user]);

  const updateUserProfile = async (profileData: Partial<User>) => {
    if (!user) {
      return;
    }

    const updatedUser = await updateMe(user, profileData);

    // 서버 액션 이후 클라이언트 상태 갱신
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
    }));

    // 캐시 무효화 또는 리프레시
    router.refresh();
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
