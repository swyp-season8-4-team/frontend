'use client';

import { Button } from '@repo/ui/components/button';
import { useContext, useState } from 'react';
import { SignUpStep } from '@repo/usecase/src/authService';
import { SignUpContext } from '../../_contexts/SignUpContext';

interface Props {
  updateStep: (step: SignUpStep) => void;
}

export default function SignUpPasswordForm({ updateStep }: Props) {
  const { password, updatePassword, confirmPassword, updateConfirmPassword } = useContext(SignUpContext); 
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePassword(e.target.value);
    if (error) setError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfirmPassword(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 다음 단계로 이동 로직
    updateStep(SignUpStep.GENDER);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">비밀번호 입력</h2>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주세요."
            className={`w-full py-[10px] border-b ${
              error ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none placeholder:text-[#BABABA]`}
          />
          {password && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => updatePassword('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
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

        <div className="relative">
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="비밀번호를 확인해 주세요."
            className={`w-full py-[10px] border-b ${
              error ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none placeholder:text-[#BABABA]`}
          />
          {confirmPassword && (
            <button
              type="button"
              onClick={() => updateConfirmPassword('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
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

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      <Button
        className={`w-full py-3 text-white rounded-lg font-medium transition-colors
          ${password && confirmPassword && !error
            ? 'bg-[#FFB700] hover:bg-[#FFB700]/90' 
            : 'bg-gray-400 cursor-not-allowed opacity-50'
          }`}
        disabled={!password || !confirmPassword || !!error}
        onClick={handleSubmit}
      >
        계속하기
      </Button>
    </div>
  );
}