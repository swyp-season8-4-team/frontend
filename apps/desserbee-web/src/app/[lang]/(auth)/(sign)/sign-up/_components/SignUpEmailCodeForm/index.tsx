'use client';

import { Button } from "@repo/ui/components/button";
import { useContext, useState } from "react";
import { SignUpContext } from "../../_contexts/SignUpContext";
import AuthService, { SignUpStep, VerifyEmailPurpose } from "@repo/usecase/src/authService";
import SignUpTimer from "../SignUpTimer";
import SessionStorageRepository from "@repo/infrastructures/src/repositories/SessionStorageRepository";
import { validateEmailCode } from "@repo/utility/src/regex";
import AuthAPIRespository from "@repo/infrastructures/src/repositories/authAPIRespository";
import { PortalContext } from "@repo/ui/contexts/PortalContext";
import dynamic from "next/dynamic";
import { verifyTokenAction } from "@/actions/verfiyTokenAction";

const Modal = dynamic(() => import('@repo/design-system/components/Modal'));

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
  storageRepository: new SessionStorageRepository(),
});

interface Props {
  updateStep: (step: SignUpStep) => void;
}

export default function SignUpEmailCodeForm({ updateStep }: Props) {
  const { push, pop } = useContext(PortalContext); 
  const { email } = useContext(SignUpContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleConfirmClick = async () => {
    if (!validateEmailCode(message)) {
      setError('인증번호를 올바르게 입력해주세요.');
      return;
    }

    try {
      const { verificationToken } = await authService.verifyEmail({
        email,
        code: message,
        purpose: VerifyEmailPurpose.SIGNUP,
      });

      await verifyTokenAction({ token: verificationToken });

      authService.clearEmailAuthSession();

      setDisabled(false);

      const closeModal = () => {
        pop('modal');
      }

      push('modal', {
        component: (
          <Modal
            buttons={
              <Button
                className="flex w-[274px] px-[60px] py-2 justify-between items-center rounded-full bg-[#FFB700]"
                size="lg"
                onClick={closeModal}
              >
                확인
              </Button>
            }
            visible={true}
            title="인증이 완료되었습니다!"
            onClose={closeModal}
          />
        ),
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleContinueClick = () => {
    updateStep(SignUpStep.PASSWORD);
  }

  const handleExpire = () => {
    authService.clearEmailAuthSession();
  }

  return (
    <>
      <h2 className="text-2xl font-bold"></h2>
      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="인증번호를 입력해주세요"
            className={`w-full py-[10px] border-b ${
              error ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none placeholder:text-[#BABABA]`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <SignUpTimer onExpire={handleExpire} />
            {message && isDisabled && (
              <button
                type="button"
                onClick={handleConfirmClick}
                className="text-gray-400"
              >
                확인
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-gray-500 mt-2">
            인증번호는 5분 이내 입력하여 해요.<br />
            제한 시간이 지났을 경우 인증번호를 다시 받아주세요.
          </p>

          <div className="text-right mt-2">
            <button className="text-sm text-gray-500">이메일을 받지 못하셨나요?</button>
          </div>
        </div>
        
        <Button
          className={`w-full py-3 text-white rounded-[100px] font-medium transition-colors mt-6
            ${message.trim() && !error
              ? 'bg-[#FFB700] hover:bg-[#FFB700]/90' 
              : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          disabled={isDisabled}
          onClick={handleContinueClick}
        >
          계속하기
        </Button>
      </div>
    </>
  );
}
