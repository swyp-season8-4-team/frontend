'use client';

import { useCallback, useContext, useState } from 'react';
import { ForgotPasswordContext } from '../../_contexts/ForgotPasswordContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
import { ResetButton } from '@repo/design-system/components/buttons/ResetButton';
import IconEye from '@repo/design-system/components/icons/IconEye';
import IconEyeBan from '@repo/design-system/components/icons/IconEyeBan';
import IconWarn from '@repo/design-system/components/icons/IconWarn';
import { resetPasswordAction } from './action';

export function ForgotPasswordInputForm() {
  const router = useRouter();
  const { email } = useContext(ForgotPasswordContext);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const isValid =
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password) &&
    password === confirmPassword;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  const handleSubmit = useCallback(async () => {
    if (!isValid) {
      setError('비밀번호가 조건에 맞지 않습니다.');
      return;
    }

    const result = await resetPasswordAction({
      email,
      newPassword: password,
      confirmNewPassword: confirmPassword,
    });

    if (result.success) {
      alert('비밀번호가 변경되었습니다.');
      router.replace(NavigationPathname.SignIn);
    } else {
      setError(result.message);
    }
  }, [isValid, email, password, confirmPassword, router]);

  return (
    <div className="h-full space-y-2 px-4 py-[45px]">
      <h2 className="text-[22px] font-medium">새 비밀번호를 입력해주세요</h2>
      <div className="text-neutral-30 text-sm">
        최소 8자, 영문 소문자, 숫자, 특수문자 조합
      </div>

      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호"
                className={`w-full flex-1 rounded-[6px] border px-4 py-[12.5px] text-sm ${
                  error ? 'border-error-40' : 'border-[#A6A6A6]'
                } placeholder:text-[#BABABA] focus:outline-none`}
              />
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-gray-400">
                <ResetButton
                  isShown={password !== ''}
                  onClick={() => {
                    setPassword('');
                    setError('');
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={togglePasswordVisibility}
                  className="text-neutral-30"
                >
                  {showPassword ? (
                    <IconEye size={18} />
                  ) : (
                    <IconEyeBan size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="">
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호 확인"
                className={`w-full flex-1 rounded-[6px] border px-4 py-[12.5px] text-sm ${
                  error ? 'border-error-40' : 'border-[#A6A6A6]'
                } placeholder:text-[#BABABA] focus:outline-none`}
              />
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-gray-400">
                <ResetButton
                  isShown={confirmPassword !== ''}
                  onClick={() => {
                    setConfirmPassword('');
                    setError('');
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-neutral-30"
                >
                  {showConfirmPassword ? (
                    <IconEye size={18} />
                  ) : (
                    <IconEyeBan size={18} />
                  )}
                </button>
              </div>
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
        </div>
        <HoneyButton
          text="변경하기"
          isDisabled={!isValid}
          onClick={handleSubmit}
          className="mb-4"
        />
      </div>
    </div>
  );
}
