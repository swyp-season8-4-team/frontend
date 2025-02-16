'use client';

import type { User } from '@repo/entity/src/user';
import type { WithChildren } from '@repo/ui';
import { createContext, useEffect, useState } from 'react';

interface State {
  user: User | null;
}

const defaultState: State = {
  user: null,
};

export const UserContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  user: User | null;
}

export function UserProvider({ children, user: initialUser }: Props) {
  const [user, setUser] = useState<User | null>(initialUser);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
