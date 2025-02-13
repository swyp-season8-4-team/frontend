'use client';

import type { WithChildren } from "@repo/ui/index";
import { createContext, useState } from "react";

interface State {
  email: string;
  updateEmail: (email: string) => void;
}

const defaultState: State = {
  email: '',
  updateEmail: () => {},
};

export const SignUpContext = createContext<State>(defaultState);

export function SignUpProvider({ children }: WithChildren) {
  const [email, setEmail] = useState<string>('');

  const updateEmail = (email: string) => {
    setEmail(email);
  };
  
  return (
    <SignUpContext.Provider value={{ email, updateEmail }}>
      {children}
    </SignUpContext.Provider>
  );
}
