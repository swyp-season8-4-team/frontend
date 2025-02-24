'use client';

import { HTTPError } from '@repo/api/src/error';
import AuthAPIRespository from '@repo/infrastructures/src/repositories/authAPIRespository';
import SessionStorageRepository from '@repo/infrastructures/src/repositories/SessionStorageRepository';
import { Button } from '@repo/ui/components/button';
import AuthService, { EmailAuthSessionKey, SignUpStep, VerifyEmailPurpose } from '@repo/usecase/src/authService';
import { validateEmail } from '@repo/utility/src/regex';
import { useCallback, useContext, useState } from 'react';
import { SignUpContext } from '../../_contexts/SignUpContext';

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
  storageRepository: new SessionStorageRepository(),
});

interface Props { 
  updateStep: (step: SignUpStep) => void;
}

export default function SignUpEmailForm({ updateStep }: Props) {
  const { updateEmail } = useContext(SignUpContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (error && value && !validateEmail(value)) {
      setError('');
    }
  };

  const handleClick = useCallback(async () => {
    if (!validateEmail(message)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    try {
      const { expirationMinutes } = await authService.verifyEmailRequest({
        email: message,
        purpose: VerifyEmailPurpose.SIGNUP,
      });

      authService.saveEmailAuthSession(EmailAuthSessionKey.SIGNUP, {
        email: message,
        expirationTimes: expirationMinutes * 60,
      });

      updateStep(SignUpStep.EMAIL_CODE);
      updateEmail(message);
    } catch (error) {
      if (error instanceof HTTPError) {
        setError(error.message);
      }
    }
  }, [message, updateEmail, updateStep]);

  return (
    <>
      <h2 className="text-lg font-medium">
        디저비에 오신걸 환영합니다!<br />
        회원가입을 시작해볼까요?
      </h2>
      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <input
            type="email"
            value={message}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            className={`w-full py-[10px] border-b ${
              error ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none placeholder:text-[#BABABA]`}
          />
          {message && (
            <button
              type="button"
              onClick={() => {
                setMessage('');
                setError('');
              }}
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
          {error && (
            <p className="absolute mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>

        <Button
          className={`w-full py-3 text-white rounded-[100px] font-medium transition-colors mt-6
            ${message.trim() && !error
              ? 'bg-[#FFB700] hover:bg-[#FFB700]/90' 
              : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          disabled={!message.trim() || !!error}
          onClick={handleClick}
        >
          계속하기
        </Button>
      </div>
    </>
  );
}