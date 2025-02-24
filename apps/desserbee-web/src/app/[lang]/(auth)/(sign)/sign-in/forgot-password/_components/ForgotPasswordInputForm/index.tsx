'use client';

import { Button } from "@repo/ui/components/button";
import { useCallback, useContext, useState } from "react";
import { ForgotPasswordContext } from "../../_contexts/ForgotPasswordContext";
import AuthService from "@repo/usecase/src/authService";
import AuthAPIRespository from "@repo/infrastructures/src/repositories/authAPIRespository";
import { useRouter } from "next/navigation";
import { NavigationPathname } from "@repo/entity/src/navigation";

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
});

export function ForgotPasswordInputForm() {
  const router = useRouter();

  const { email } = useContext(ForgotPasswordContext);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const isValid = password.length >= 8 && 
    /[A-Za-z]/.test(password) && 
    /[0-9]/.test(password) && 
    /[!@#$%^&*]/.test(password) &&
    password === confirmPassword;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  const handleSubmit = useCallback(async () => {
    if (!isValid) {
      setError('비밀번호가 조건에 맞지 않습니다.');
      return;
    }

    try {
      // API 호출 로직 구현 필요
      const { message } = await authService.resetPassword({
        email: email,
        password: password,
      });

      router.replace(NavigationPathname.SignIn);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, [isValid, email, password]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-medium">비밀번호 재설정</h2>
      
      <div className="space-y-6">
        <div className="text-gray-600">{email}</div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">비밀번호 입력</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호 (8자 이상, 영어 소문자, 특수문자 포함)"
                className="w-full text-[12px] font-medium leading-[-0.3px] py-[10px] border-b border-gray-200 focus:outline-none placeholder:text-[#BABABA]"
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setPassword('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#D9D9D9"/>
                    <g transform="translate(7, 7)">
                      <path d="M1 9L9 1" stroke="#393939" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 9L1 1" stroke="#393939" strokeWidth="2" strokeLinecap="round"/>
                    </g>
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">비밀번호 확인</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호 (8자 이상, 영어 소문자, 특수문자 포함) 를 다시 입력해주세요."
                className="w-full text-[10px] font-medium leading-[-0.3px] py-[10px] border-b border-gray-200 focus:outline-none placeholder:text-[#BABABA]"
              />
              {confirmPassword && (
                <button
                  type="button"
                  onClick={() => setConfirmPassword('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#D9D9D9"/>
                    <g transform="translate(7, 7)">
                      <path d="M1 9L9 1" stroke="#393939" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 9L1 1" stroke="#393939" strokeWidth="2" strokeLinecap="round"/>
                    </g>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          className={`w-full py-3 text-white rounded-[100px] font-medium transition-colors
            ${isValid
              ? 'bg-[#FFB700] hover:bg-[#FFB700]/90' 
              : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          변경하기
        </Button>
      </div>
    </div>
  );
}