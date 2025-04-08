'use client';

import Link from 'next/link';
import { loginAction } from '@/actions/loginAction';
import {
  NavigationLanguageGroup,
  NavigationPathGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';
import type { WithClassName } from '@repo/ui/index';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { isErrorResponseData } from '@repo/api/src/error';
import type { SignInCodeError } from '@repo/entity/src/signIn';
import AuthConverter from '@repo/infrastructures/src/mappers/authConverter';
import NavigationService from '@repo/usecase/src/navigationService';

import LoginButton from './LoginButton';
import IconEyeBan from '@repo/design-system/components/icons/IconEyeBan';
import IconEye from '@repo/design-system/components/icons/IconEye';
import IconWarn from '@repo/design-system/components/icons/IconWarn';

import { ResetButton } from '@repo/design-system/components/buttons/ResetButton';
import { RadioButton } from '@repo/design-system/components/RadioButton';

// FIXME: 컨버터를 구현체 안에서만 사용할수 있도록 변경
const authConverter = new AuthConverter();
const navigationService = new NavigationService({});

interface LoginFormProps extends WithClassName {
  defaultEmail?: string;
}

export default function LoginForm({
  className,
  defaultEmail = '',
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{
    code: SignInCodeError;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // 폼 유효성 상태 업데이트
  useEffect(() => {
    // 이메일과 비밀번호가 모두 입력되었는지 확인
    const isValid = email.trim() !== '' && password.trim() !== '';
    setIsFormValid(isValid);
  }, [email, password]);

  const validateEmail = (email: string) => {
    if (!email) {
      setError({
        code: 'INVALID_EMAIL',
        message: '이메일을 입력해주세요.',
      });
      return false;
    }
    // 간단한 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError({
        code: 'INVALID_EMAIL',
        message: '유효하지 않은 이메일이에요. 다시 입력해주세요.',
      });
      return false;
    }
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setError({
        code: 'INVALID_PASSWORD',
        message: '비밀번호를 입력해주세요.',
      });
      return false;
    }

    // 비밀번호 길이 검증 (최소 8자 이상)
    if (password.length < 8) {
      setError({
        code: 'INVALID_PASSWORD',
        message: '비밀번호는 최소 8자 이상이어야 합니다.',
      });
      return false;
    }

    // 영어 소문자 포함 검증
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(password)) {
      setError({
        code: 'INVALID_PASSWORD',
        message: '비밀번호는 영어 소문자를 포함해야 합니다.',
      });
      return false;
    }

    // 특수문자 포함 검증
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharRegex.test(password)) {
      setError({
        code: 'INVALID_PASSWORD',
        message: '비밀번호는 특수문자를 포함해야 합니다.',
      });
      return false;
    }

    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 제출 시 이전 에러 메시지 초기화
    setError(null);

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) return;

    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await loginAction(formData);

      if (!response) {
        // 로그인 실패 시 일반적인 오류 처리
        setError({
          code: 'INVALID_PASSWORD',
          message: '로그인에 실패했습니다',
        });
        return;
      }

      if (isErrorResponseData(response)) {
        setError({
          code: authConverter.convertCodeToErrorMessage(response.code),
          message: response.message ?? '',
        });
        return;
      }

      const pathname = !response.isPreferenceSet
        ? `${NavigationLanguageGroup.ko}${NavigationPathGroup.Preference}${response.userId}`
        : `${NavigationLanguageGroup.ko}${NavigationPathname.Map}`;
      router.replace(pathname);
    } finally {
      setIsLoading(false);
    }
  };

  // 라디오 버튼 토글 핸들러
  const handleRadioToggle = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-[12px]">
        <div className="relative">
          <input
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null); // 입력 시 에러 메시지 초기화
            }}
            placeholder="이메일을 입력 해주세요"
            className={`w-full rounded-lg border px-4 py-3 ${error?.code === 'INVALID_EMAIL' ? 'border-error-40' : 'border-[#A6A6A6]'} focus:border-gray-400 focus:outline-none`}
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-[11.5px]">
            <ResetButton
              isShown={email.length > 0}
              onClick={() => setEmail('')}
            />
          </div>
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null); // 입력 시 에러 메시지 초기화
            }}
            placeholder="비밀번호를 입력 해주세요"
            className={`w-full rounded-lg border px-4 py-3 ${error?.code === 'INVALID_PASSWORD' ? 'border-error-40' : 'border-[#A6A6A6]'} focus:border-gray-400 focus:outline-none`}
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-[11.5px]">
            <ResetButton
              isShown={password.length > 0}
              onClick={() => setPassword('')}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={togglePasswordVisibility}
              className="text-neutral-30"
            >
              {showPassword ? <IconEye /> : <IconEyeBan />}
            </button>
          </div>
        </div>

        {/* 통합된 에러 메시지 영역 - 항상 같은 높이 유지 */}
        <div className="mb-[25px] h-3">
          {error && (
            <p className="text-error-60 flex gap-[5px] text-xs">
              <div className="h-4 w-4">
                <IconWarn className="h-full w-full" />
              </div>
              {error.message}
            </p>
          )}
        </div>
      </div>
      {/* 왠지 모르겠는데.. mt-4가 자동으로 생겨서 inline style로 수정. (이전 개발자가 한 거라 파악이 안됨) */}
      <div className="flex items-center justify-between" style={{ margin: 0 }}>
        <div
          className="flex cursor-pointer items-center"
          onClick={handleRadioToggle}
        >
          <RadioButton
            onClick={handleRadioToggle}
            isChecked={keepLoggedIn}
            name="containLogin"
            outerSize={14.17}
            innerSize={7}
          />
          <span className="text-neutral-30 ml-[11.92px] text-sm font-medium">
            로그인 유지
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={navigationService.getHref(NavigationPathname.ForgotPassword)}
            className="text-neutral-30 cursor-pointer text-sm font-medium"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>
      <LoginButton isLoading={isLoading} isFormValid={isFormValid} />{' '}
    </form>
  );
}
