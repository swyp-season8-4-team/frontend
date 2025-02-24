'use client';

import { useState, useContext, useCallback } from "react";
import { ForgotPasswordStep, type ForgotPasswordStepProps } from "../../_types";
import { ForgotPasswordContext } from "../../_contexts/ForgotPasswordContext";
import { Button } from "@repo/ui/components/button";
import AuthService from "@repo/usecase/src/authService";
import AuthAPIRespository from "@repo/infrastructures/src/repositories/authAPIRespository";
import { VerifyEmailPurpose } from "@repo/usecase/src/authService";
import { verifyTokenAction } from "@/actions/verfiyTokenAction";

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
});

export function ForgotPasswordAuthCodeForm({ onNextStep }: ForgotPasswordStepProps) {
  const { email } = useContext(ForgotPasswordContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);

    if (error) {
      setError('');
    }
  };

  const handleClick = useCallback(async () => {
    // 인증 코드 검증 로직 구현 필요
    try {
      // API 호출 및 검증
      const { verificationToken } = await authService.verifyEmail({
        email: email,
        code: code,
        purpose: VerifyEmailPurpose.RESET_PASSWORD,
      });

      await verifyTokenAction({ token: verificationToken });

      onNextStep(ForgotPasswordStep.NewPassword);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, [code, email, onNextStep]);

  return (
    <>
      <div className="p-4 space-y-6">
        <h2 className="text-lg">
          이메일로 받으신 인증 코드를 입력해주세요.
        </h2>
        
        <div className="space-y-4">
          <div className="text-gray-600">{email}</div>
          
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="인증코드를 입력해주세요"
              className={`w-full py-[10px] border-b ${
                error ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none placeholder:text-[#BABABA]`}
            />
            {code && (
              <button
                type="button"
                onClick={() => {
                  setCode('');
                  setError('');
                }}
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
            {error && (
              <p className="absolute mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>

          <Button
            className={`w-full py-3 text-white rounded-[100px] font-medium transition-colors
              ${code.trim() && !error
                ? 'bg-[#FFB700] hover:bg-[#FFB700]/90' 
                : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            disabled={!code.trim() || !!error}
            onClick={handleClick}
          >
            계속하기
          </Button>
        </div>
      </div>
    </>
  );
}