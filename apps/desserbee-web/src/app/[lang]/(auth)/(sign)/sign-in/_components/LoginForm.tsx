'use client';

import { loginAction } from '@/actions/loginAction';
import {
  NavigationLanguageGroup,
  NavigationPathGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';
import type { WithClassName } from '@repo/ui/index';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginButtons from './LoginButtons';
import IconEyeBan from '@repo/design-system/components/icons/IconEyeBan';
import IconEye from '@repo/design-system/components/icons/IconEye';
import { isErrorResponseData } from '@repo/api/src/error';
import type { SignInCodeError } from '@repo/entity/src/signIn';
import AuthConverter from '@repo/infrastructures/src/mappers/authConverter';

// FIXME: 컨버터를 구현체 안에서만 사용할수 있도록 변경
const authConverter = new AuthConverter();

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
      <div className="flex flex-col gap-2">
        <input
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null); // 입력 시 에러 메시지 초기화
          }}
          placeholder="이메일을 입력 해주세요."
          className={`w-full px-4 py-3 rounded-lg border ${error?.code === 'INVALID_EMAIL' ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-400`}
          disabled={isLoading}
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null); // 입력 시 에러 메시지 초기화
            }}
            placeholder="비밀번호를 입력 해주세요."
            className={`w-full px-4 py-3 rounded-lg border ${error?.code === 'INVALID_PASSWORD' ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-400`}
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <button
              type="button"
              tabIndex={-1}
              onClick={togglePasswordVisibility}
              className="text-gray-500"
            >
              {showPassword ? (
                <IconEye
                  size={20}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <IconEyeBan
                  size={20}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </button>
          </div>
        </div>

        {/* 통합된 에러 메시지 영역 - 항상 같은 높이 유지 */}
        <div className="h-3">
          {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="containLogin"
            checked={keepLoggedIn}
            onClick={handleRadioToggle}
            onChange={() => {}}
            className="w-4 h-4 rounded-full border-gray-300"
          />
          <span className="ml-2 text-[11px] text-gray-600">로그인 유지</span>
        </label>
        <div className="flex items-center gap-2">
          <Link
            href={NavigationPathname.SignUp}
            className="text-b-400 text-[11px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font"
          >
            일반 회원가입
          </Link>
          {/* <Link href={NavigationPathname.SignUp} className="text-b-400 text-[10px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font">사장님 회원가입</Link> */}
          <Link
            href={NavigationPathname.ForgotPassword}
            className="text-b-400 text-[11px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>

      <LoginButtons isLoading={isLoading} isFormValid={isFormValid} />
    </form>
  );
}
