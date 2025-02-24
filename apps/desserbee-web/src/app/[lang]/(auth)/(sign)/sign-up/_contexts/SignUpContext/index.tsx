'use client';

import type { Gender } from "@repo/entity/src/user";
import type { WithChildren } from "@repo/ui/index";
import { createContext, useCallback, useState } from "react";

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  profileImage: string | null;
  gender: Gender | null;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updateConfirmPassword: (confirmPassword: string) => void;
  updateNickname: (nickname: string) => void;
  updateProfileImage: (image: string) => void;
  updateGender: (gender: Gender) => void;
}

const defaultState: State = {
  email: '',  
  password: '',
  confirmPassword: '',
  nickname: '',
  profileImage: null,
  gender: null,
  updateEmail: () => {},
  updatePassword: () => {},
  updateConfirmPassword: () => {},
  updateNickname: () => {},
  updateProfileImage: () => {},
  updateGender: () => {},
};

export const SignUpContext = createContext<State>(defaultState);

export function SignUpProvider({ children }: WithChildren) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const updateEmail = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const updatePassword = useCallback((password: string) => {
    setPassword(password);
  }, []);

  const updateConfirmPassword = useCallback((confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  }, []);

  const updateNickname = useCallback((nickname: string) => {
    setNickname(nickname);
  }, []);

  const updateProfileImage = useCallback((image: string) => {
    setProfileImage(image);
  }, []);

  const updateGender = useCallback((gender: Gender) => {
    setGender(gender);
  }, []);

  return (
    <SignUpContext.Provider value={{
      email,
      updateEmail,
      password,
      updatePassword,
      confirmPassword,
      updateConfirmPassword,
      nickname,
      updateNickname,
      gender,
      updateGender,
      profileImage,
      updateProfileImage,
    }}>
      {children}
    </SignUpContext.Provider>
  );
}
