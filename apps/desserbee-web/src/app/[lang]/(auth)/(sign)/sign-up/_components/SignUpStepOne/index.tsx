'use client';

import { useForm } from 'react-hook-form';
import { HTTPError } from '@repo/api/src/error';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import SessionStorageRepository from '@repo/infrastructures/src/repositories/sessionStorageRepository';
import AuthService, {
  EmailAuthSessionKey,
  SignUpStep,
  VerifyEmailPurpose,
} from '@repo/usecase/src/authService';
import { validateEmail } from '@repo/utility/src/regex';
import { useCallback, useContext, useState } from 'react';
import { SignUpContext } from '../../_contexts/SignUpContext';
import SignUpTimer from '../SignUpTimer';
import { verifyTokenAction } from '@/actions/verfiyTokenAction';
import { TextField } from '@repo/design-system/components/inputs/TextField';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
import { WhiteButton } from '@repo/design-system/components/buttons/FillButtons/White';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
  storageRepository: new SessionStorageRepository(),
});

interface Step0neFormData {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  updateStep: (step: SignUpStep) => void;
}

export default function SignUpStepOne({ updateStep }: Props) {
  const router = useRouter();

  const { updateEmail } = useContext(SignUpContext);
  const [isLoading, setLoading] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [isCodeVerified, setCodeVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [successMessages, setSuccessMessages] = useState({
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });
  const [expirationTime, setExpirationTime] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm<Step0neFormData>({
    mode: 'onChange',
  });

  // 비밀번호 유효성 검사 정규식
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleCodeSend = async () => {
    if (!validateEmail(watch('email'))) {
      setError('email', { message: '올바른 이메일 형식이 아닙니다.' });
      return;
    }

    try {
      setLoading(true);
      const { expirationMinutes } = await authService.verifyEmailRequest({
        email: watch('email'),
        purpose: VerifyEmailPurpose.SIGNUP,
      });

      authService.saveEmailAuthSession(EmailAuthSessionKey.SIGNUP, {
        email: watch('email'),
        expirationTimes: expirationMinutes * 60,
      });

      updateEmail(watch('email'));
      setEmailVerified(true);
      setShowTimer(true);
      setExpirationTime(expirationMinutes * 60);
      setSuccessMessages((prev) => ({
        ...prev,
        email: '인증 코드가 이메일로 전송되었습니다.',
      }));
    } catch (error) {
      setSuccessMessages((prev) => ({ ...prev, email: '' }));
      if (error instanceof HTTPError) {
        setError('email', { message: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCodeVerification = async () => {
    const email = watch('email');
    const code = watch('verificationCode');

    if (!code || code.length !== 6) {
      setError('verificationCode', { message: '인증번호는 6자리여야 합니다.' });
      return;
    }

    try {
      setLoading(true);
      const { verificationToken } = await authService.verifyEmail({
        email,
        code,
        purpose: VerifyEmailPurpose.SIGNUP,
      });

      await verifyTokenAction({ token: verificationToken });
      authService.clearEmailAuthSession(EmailAuthSessionKey.SIGNUP);
      setCodeVerified(true);
      setSuccessMessages((prev) => ({
        ...prev,
        verificationCode: '인증이 완료되었습니다.',
      }));
    } catch (error) {
      setSuccessMessages((prev) => ({ ...prev, verificationCode: '' }));
      if (error instanceof Error) {
        setError('verificationCode', { message: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password: string): true | string => {
    if (!password) return '비밀번호를 입력해주세요.';
    if (!passwordRegex.test(password)) {
      return '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    return true;
  };

  const handlePrevClick = () => {
    const result = confirm('회원가입을 취소하시겠습니까?');
    if (result) {
      router.replace(NavigationPathname.SignIn);
    }
  };

  const onSubmit = async (data: Step0neFormData) => {
    if (!isEmailVerified || !isCodeVerified) {
      return;
    }

    const passwordValidation = validatePassword(data.password);
    if (passwordValidation !== true) {
      setError('password', { message: passwordValidation });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    updateStep(SignUpStep.TWO);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-base mt-[106px] flex h-[calc(100dvh-110px)] flex-col justify-between pb-4"
    >
      <div className="flex flex-col gap-[54px]">
        {/* 이메일 주소 */}
        <div className="flex flex-col gap-[5px]">
          <label className="text-sm text-[#635F59]">이메일 주소</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <TextField
                {...register('email')}
                placeholder="이메일을 입력해주세요"
                error={!!errors.email}
                errorMessage={errors.email?.message}
                disabled={isEmailVerified}
                showReset={!!watch('email') && !isEmailVerified}
                onReset={() => setValue('email', '')}
                successMessage={successMessages.email}
              />
            </div>
            <OliveButton
              type="button"
              onClick={handleCodeSend}
              isDisabled={
                !watch('email') ||
                !!errors.email ||
                isEmailVerified ||
                isLoading
              }
              className="w-24 text-sm"
              text="코드전송"
            />
          </div>
        </div>

        {/* 인증 코드 */}
        <div className="flex flex-col gap-[5px]">
          <label className="text-sm text-[#635F59]">인증 코드</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <TextField
                {...register('verificationCode')}
                placeholder="인증번호를 입력해주세요"
                maxLength={6}
                error={!!errors.verificationCode}
                errorMessage={errors.verificationCode?.message}
                disabled={!isEmailVerified}
                showReset={!!watch('verificationCode') && !isCodeVerified}
                onReset={() => setValue('verificationCode', '')}
                successMessage={successMessages.verificationCode}
              />
              {showTimer && (
                <div className="absolute right-11 top-1/2 -translate-y-1/2">
                  <SignUpTimer
                    expirationTime={expirationTime}
                    onExpire={() => {
                      authService.clearEmailAuthSession(
                        EmailAuthSessionKey.SIGNUP,
                      );
                      setShowTimer(false);
                    }}
                  />
                </div>
              )}
            </div>
            <OliveButton
              type="button"
              onClick={handleCodeVerification}
              isDisabled={
                !watch('verificationCode') ||
                !!errors.verificationCode ||
                !isEmailVerified ||
                isCodeVerified ||
                isLoading
              }
              className="w-24 text-sm"
              text="인증확인"
            />
          </div>
          <div className="flex gap-[10px] text-sm text-[#595959]">
            <div>인증 코드를 아직 받지 못하셨나요?</div>
            <button onClick={handleCodeSend} className="underline">
              재전송
            </button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-[5px]">
          <label className="text-sm text-[#635F59]">비밀 번호</label>
          <div className="flex flex-col gap-[7px]">
            <TextField
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: passwordRegex,
                  message:
                    '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
                },
              })}
              placeholder="비밀번호 (8자 이상, 영문, 숫자, 특수문자 포함)"
              error={!!errors.password}
              errorMessage={errors.password?.message}
              showReset={!!watch('password')}
              onReset={() => setValue('password', '')}
              showPasswordToggle={true}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              isPasswordVisible={showPassword}
              containerClassName="flex-1"
              successMessage={successMessages.password}
            />
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: '비밀번호를 다시 입력해주세요.',
                validate: (value) =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
              placeholder="비밀번호를 다시 입력해주세요"
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              showReset={!!watch('confirmPassword')}
              onReset={() => setValue('confirmPassword', '')}
              showPasswordToggle={true}
              onPasswordToggle={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              isPasswordVisible={showConfirmPassword}
              containerClassName="flex-1"
              successMessage={successMessages.confirmPassword}
            />
          </div>
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      <div className="flex gap-[10px]">
        <WhiteButton
          onClick={handlePrevClick}
          type="button"
          className="text-lg"
          // isDisabled={true}
          text="이전"
        />
        <HoneyButton
          type="submit"
          className="text-lg"
          isDisabled={
            !isEmailVerified ||
            !isCodeVerified ||
            !watch('password') ||
            !watch('confirmPassword') ||
            !!errors.password ||
            !!errors.confirmPassword ||
            isLoading
          }
          text="다음"
        />
      </div>
    </form>
  );
}
