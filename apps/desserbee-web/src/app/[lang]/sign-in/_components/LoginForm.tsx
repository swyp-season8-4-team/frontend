import { loginAction } from '@/actions/loginAction';
import { OAuthSocialProvider } from '@repo/entity/src/auth';
import AuthService from '@repo/usecase/src/authService';
import Link from 'next/link';

const authService = new AuthService({});

interface Props {
  state?: string;
}

export default function LoginForm({ state }: Props) {

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 로고 */}
      <div className="p-6">
        <h1 className="text-xl font-medium text-gray-900">디저비</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-8 text-center text-2xl font-medium text-gray-900">
            로그인
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={loginAction}>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="이메일을 입력하세요"
                required
                className="block w-full rounded-full border-0 px-4 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                required
                className="block w-full rounded-full border-0 px-4 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  로그인 유지
                </label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="text-gray-600">
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-gray-600 px-4 py-4 text-base font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                회원가입
              </button>
            </div>
          </form>

          {/* 구분선 */}
          <div className="mt-10 mb-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">간편 로그인</span>
              </div>
            </div>
          </div>

          {/* 카카오톡 로그인 버튼 */}
          <div className="flex justify-center">
            <Link
              href={authService.getServerSideUrl(OAuthSocialProvider.KAKAO, state)}
              className="rounded-full bg-yellow-400 p-4"
            >
              <span className="sr-only">카카오톡으로 로그인</span>
              {/* 카카오톡 아이콘 - 실제 아이콘으로 교체 필요 */}
              <svg className="h-6 w-6 text-black" viewBox="0 0 24 24">
                <path d="M12 3c5.523 0 10 3.582 10 8s-4.477 8-10 8c-.555 0-1.1-.036-1.63-.107L6 21l.76-4.455C4.965 15.227 2 13.305 2 11c0-4.418 4.477-8 10-8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}