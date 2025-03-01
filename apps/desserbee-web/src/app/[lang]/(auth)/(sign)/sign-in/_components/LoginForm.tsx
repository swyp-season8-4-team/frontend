'use client';

import { loginAction } from "@/actions/loginAction";
import { NavigationLanguageGroup, NavigationPathGroup, NavigationPathname } from "@repo/entity/src/navigation";
import type { WithChildren, WithClassName } from "@repo/ui/index";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoginButtons from "./LoginButtons";
import Link from "next/link";

interface LoginFormProps extends WithChildren, WithClassName {
  defaultEmail?: string;
}

export default function LoginForm({ className, children, defaultEmail = '' }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // 폼 유효성 상태 업데이트
  useEffect(() => {
    // 이메일과 비밀번호가 모두 입력되었는지 확인
    const isValid = email.trim() !== '' && password.trim() !== '';
    setIsFormValid(isValid);
  }, [email, password]);

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('유효하지 않은 이메일이에요. 회원가입 후 이용해주세요.');
      return false;
    }
    // 간단한 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('유효하지 않은 이메일이에요. 회원가입 후 이용해주세요.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('잘못된 비밀 번호에요. 비밀번호 찾기를 해주세요.');
      return false;
    }
    
    // 비밀번호 길이 검증 (최소 8자 이상)
    if (password.length < 8) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 합니다.');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await loginAction(formData);
      
      if (!response) {
        // 로그인 실패 시 일반적인 오류 처리
        setPasswordError('잘못된 비밀 번호에요. 비밀번호 찾기를 해주세요.');
        return;
      }

      const pathname = !response.isPreferenceSet
        ? `${NavigationLanguageGroup.ko}${NavigationPathGroup.Preference}${response.userId}`
        : `${NavigationLanguageGroup.ko}${NavigationPathname.Map}`;
      router.replace(pathname);
    } catch (error) {
      console.error('Login error:', error);
      setPasswordError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력 해주세요."
            className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-400`}
            disabled={isLoading}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력 해주세요."
            className={`w-full px-4 py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-400`}
            disabled={isLoading}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center">
          <input type="radio" name="containLogin" className="w-4 h-4 rounded-full border-gray-300" />
          <span className="ml-2 text-[10px] text-gray-600">로그인 유지</span>
        </label>
        <div className="flex items-center gap-2">
          <Link href={NavigationPathname.SignUp} className="text-b-400 text-[10px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font">일반 회원가입</Link>
          {/* <Link href={NavigationPathname.SignUp} className="text-b-400 text-[10px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font">사장님 회원가입</Link> */}
          <Link href={NavigationPathname.ForgotPassword} className="text-b-400 text-[10px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font">비밀번호 찾기</Link>
        </div>
      </div>
      
      <LoginButtons isLoading={isLoading} isFormValid={isFormValid} />
    </form>
  )
}