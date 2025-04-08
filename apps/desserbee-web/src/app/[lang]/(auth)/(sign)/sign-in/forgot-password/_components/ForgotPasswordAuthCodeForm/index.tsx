'use client';

import { useState, useContext, useCallback } from 'react';
import { ForgotPasswordStep, type ForgotPasswordStepProps } from '../../_types';
import { ForgotPasswordContext } from '../../_contexts/ForgotPasswordContext';

import AuthService from '@repo/usecase/src/authService';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import {
  EmailAuthSessionKey,
  VerifyEmailPurpose,
} from '@repo/usecase/src/authService';
import { verifyTokenAction } from '@/actions/verfiyTokenAction';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
import { ResetButton } from '@repo/design-system/components/buttons/ResetButton';
import IconWarn from '@repo/design-system/components/icons/IconWarn';
import IconCheckRound from '@repo/design-system/components/icons/IconCheckRound';
import { HTTPError } from '@repo/api/src/error';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

export function ForgotPasswordAuthCodeForm({
  onNextStep,
}: ForgotPasswordStepProps) {
  const { email } = useContext(ForgotPasswordContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);

    if (error) {
      setError('');
    }
    if (successMessage) {
      setSuccessMessage('');
      setIsVerified(false);
    }
  };

  const handleResendButtonClick = useCallback(async () => {
    try {
      const { expirationMinutes } = await authService.verifyEmailRequest({
        email: email,
        purpose: VerifyEmailPurpose.RESET_PASSWORD,
      });

      authService.saveEmailAuthSession(EmailAuthSessionKey.RESET_PASSWORD, {
        email: email,
        expirationTimes: expirationMinutes * 60,
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        setError(error.data.message ?? '');
      }
    }
  }, [email]);

  const handleNextButtonClick = useCallback(async () => {
    if (!isVerified) return;
    onNextStep(ForgotPasswordStep.NewPassword);
  }, [onNextStep, isVerified]);

  const handleVerifyButtonClick = useCallback(async () => {
    // 인증 코드 검증 로직 구현 필요
    try {
      setLoading(true);
      setSuccessMessage('');
      setError('');
      // API 호출 및 검증
      const { verificationToken } = await authService.verifyEmail({
        email: email,
        code: code,
        purpose: VerifyEmailPurpose.RESET_PASSWORD,
      });

      await verifyTokenAction({ token: verificationToken });
      setIsVerified(true);
      setSuccessMessage('인증이 완료되었습니다.');
    } catch (error) {
      setIsVerified(false);
      if (error instanceof Error) {
        // setError(error.message);
        setError('인증코드 전송 중 에러가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [code, email]);

  return (
    <>
      <h2 className="pt-[45px] text-[22px] font-medium leading-[130%] tracking-[-0.9px]">
        {/* {email} */}
        <div className="text-primary-60">eepy2.23@gmail.com</div>
        <div className="text-primary-5">인증코드를 보내드렸어요 !</div>
      </h2>
      <div className="flex h-full flex-col justify-between">
        <div className="">
          <div className="mb-[13.5px] w-full">
            <div className="flex w-full gap-[10px]">
              <div className="relative w-full">
                <input
                  type="email"
                  value={code}
                  onChange={handleChange}
                  placeholder="인증코드를 입력해주세요"
                  className={`w-full flex-1 rounded-[6px] border px-4 py-[12.5px] text-sm ${
                    error ? 'border-error-40' : 'border-[#A6A6A6]'
                  } placeholder:text-[#BABABA] focus:outline-none`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <ResetButton
                    isShown={code !== ''}
                    onClick={() => {
                      setCode('');
                      setError('');
                    }}
                  />
                </div>
              </div>
              <OliveButton
                onClick={handleVerifyButtonClick}
                text="중복확인"
                className="max-w-[90px] text-nowrap"
              />
            </div>
          </div>
          {error && (
            <p className="text-error-60 flex items-center gap-[5px] text-sm">
              <div className="h-4 w-4">
                <IconWarn className="h-full w-full" />
              </div>
              {error}
            </p>
          )}
          {successMessage && !error && (
            <p className="text-sucess-60 flex items-center gap-[5px] text-sm">
              <div className="h-4 w-4">
                <IconCheckRound className="h-full w-full" />
              </div>
              {successMessage}
            </p>
          )}
          <div className="text-neutral-30 flex w-full items-center justify-center gap-[11px] py-[34px] text-sm">
            <div>인증코드를 아직 받지 못하셨나요?</div>
            <button
              className="text-secondary-30 text-b-400 font-medium underline decoration-solid decoration-from-font underline-offset-auto"
              onClick={handleVerifyButtonClick}
            >
              재전송
            </button>
          </div>
        </div>
        <HoneyButton
          type="submit"
          text="다음"
          onClick={handleNextButtonClick}
          isDisabled={!code.trim() || !!error || isLoading || !isVerified}
        />
      </div>
    </>
  );
}
