'use client';

import type { WithChildren } from "@repo/ui/index";
import { createContext, useCallback, useState } from "react";

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updateConfirmPassword: (confirmPassword: string) => void;
}

const defaultState: State = {
  email: '',
  password: '',
  confirmPassword: '',
  updateEmail: () => {},
  updatePassword: () => {},
  updateConfirmPassword: () => {},
};

export const SignUpContext = createContext<State>(defaultState);

export function SignUpProvider({ children }: WithChildren) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateEmail = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const updatePassword = useCallback((password: string) => {
    setPassword(password);
  }, []);

  const updateConfirmPassword = useCallback((confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  }, []);

  return (
    <SignUpContext.Provider value={{ email, updateEmail, password, updatePassword, confirmPassword, updateConfirmPassword }}>
      {children}
    </SignUpContext.Provider>
  );
}
