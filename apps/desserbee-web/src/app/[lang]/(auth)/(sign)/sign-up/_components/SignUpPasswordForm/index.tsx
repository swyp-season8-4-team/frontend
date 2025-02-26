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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    
    setIsLoading(true);
    // 실제 API 호출이 있다면 여기에 추가
    
    // 다음 단계로 이동 로직
    setTimeout(() => {
      setIsLoading(false);
      updateStep(SignUpStep.GENDER);
    }, 500); // 데모용 지연
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">비밀번호 입력</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호 (8자 이상, 영어 소문자, 특수문자 포함)"
              className={`w-full text-[10px] font-medium leading-[-0.3px] py-[10px] border-b ${
                error ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none placeholder:text-[#BABABA]`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                tabIndex={-1}
                onClick={togglePasswordVisibility}
                className="text-gray-500"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="비밀번호 (8자 이상, 영어 소문자, 특수문자 포함) 를 다시 입력해주세요."
              className={`w-full text-[10px] font-medium leading-[-0.3px] py-[10px] border-b ${
                error ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none placeholder:text-[#BABABA]`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                tabIndex={-1}
                onClick={toggleConfirmPasswordVisibility}
                className="text-gray-500"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
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
        isLoading={isLoading}
      >
        계속하기
      </Button>
    </div>
  );
}