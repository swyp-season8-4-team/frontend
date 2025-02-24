import type { WithChildren } from "@repo/ui/index";
import { createContext, useCallback, useState } from "react";

interface State {
  email: string;
  updateEmail: (email: string) => void;
  authCode: string;
  updateAuthCode: (authCode: string) => void;
}

const defaultState: State = {
  email: '',
  updateEmail: () => {},
  authCode: '',
  updateAuthCode: () => {},
}

export const ForgotPasswordContext = createContext<State>(defaultState);

export function ForgotPasswordProvider({ children }: WithChildren) {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');

  const updateEmail = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const updateAuthCode = useCallback((authCode: string) => {
    setAuthCode(authCode);
  }, []);

  return (
    <ForgotPasswordContext.Provider value={{ email, updateEmail, authCode, updateAuthCode }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
}