'use client';

import { useState } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { ForgotPasswordStep, type ForgotPasswordStepProps } from '../../_types';
import { ForgotPasswordContext } from '../../_contexts/ForgotPasswordContext';
import { validateEmail } from '@repo/utility/src/regex';
import {
  EmailAuthSessionKey,
  VerifyEmailPurpose,
} from '@repo/usecase/src/authService';
import AuthService from '@repo/usecase/src/authService';
import { HTTPError } from '@repo/api/src/error';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import { Button } from '@repo/ui/components/button';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
import { ResetButton } from '@repo/design-system/components/buttons/ResetButton';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

export function ForgotPasswordEmailForm({
  onNextStep,
}: ForgotPasswordStepProps) {
  const { updateEmail } = useContext(ForgotPasswordContext);
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
        purpose: VerifyEmailPurpose.RESET_PASSWORD,
      });

      updateEmail(message);
      onNextStep(ForgotPasswordStep.AuthCode);
      authService.saveEmailAuthSession(EmailAuthSessionKey.RESET_PASSWORD, {
        email: message,
        expirationTimes: expirationMinutes * 60,
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        setError(error.data.message ?? '');
      }
    }
  }, [message, onNextStep, updateEmail]);

  return (
    <>
      <h2 className="text-[18px] font-semibold leading-[130%] tracking-[-0.9px] text-[#393939]">
        가입하셨던 이메일 주소를
        <br />
        알려주세요
      </h2>
      <div className="flex h-full flex-col justify-between">
        <div className="relative">
          <input
            type="email"
            value={message}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요."
            className={`w-full rounded-[6px] border px-4 py-[12.5px] text-sm ${
              error ? 'border-red-500' : 'border-[#CDC8C3]'
            } placeholder:text-[#BABABA] focus:outline-none`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <ResetButton
              isShown={message !== ''}
              onClick={() => {
                setMessage('');
                setError('');
              }}
            />
          </div>

          {error && (
            <p className="absolute mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>

        {/* <Button
          className={`w-full py-3 text-white rounded-[100px] font-medium transition-colors mt-6
            ${
              message.trim() && !error
                ? 'bg-[#FFB700] hover:bg-[#FFB700]/90'
                : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          disabled={!message.trim() || !!error}
          onClick={handleClick}
        >
          계속하기
        </Button> */}
        <HoneyButton
          text="계속하기"
          onClick={handleClick}
          isDisabled={!message.trim() || !!error}
        />
      </div>
    </>
  );
}
