import Link from "next/link";
import KakaoLogo from "./_components/KakaoLogo";
import type { WithParams, WithSearchParams } from "@/app";
import AuthService from "@repo/usecase/src/authService";
import { NavigationPathname } from "@repo/entity/src/navigation";
import { OAuthSocialProvider } from "@repo/entity/src/auth";
import { encrypt } from "@/utils/crypto";
import { loginAction } from "@/actions/loginAction";

const authService = new AuthService({});

interface Props extends WithParams, WithSearchParams {}

export default async function SignInPage({ searchParams }: Props) {
  const { next } = await searchParams;

  const state = encrypt(`${next}:${Date.now()}`);

  return (
    <div className="min-h-screen bg-white px-4">
      {/* 헤더 */}
      <header className="flex items-center h-14">
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-medium ml-2">디저비</h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-col justify-center mt-16 h-full">
        <h2 className="text-2xl font-medium text-center mb-8">로그인</h2>
        
        <form className="space-y-4" action={loginAction}>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
          />
        
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-600">로그인 유지</span>
            </label>
            <Link href={NavigationPathname.ForgotPassword} className="text-sm text-gray-600">비밀번호 찾기</Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#FDB813] text-white rounded-100 font-medium mt-8"
          >
            로그인
          </button>

          <button
            // href={NavigationPathname.SignUp}
            className="w-full py-3 bg-[#FDB813] text-white rounded-100 font-medium mt-8"
          >
            회원가입
          </button>
        </form>

        {/* 간편 로그인 섹션 */}
        <div className="mt-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">간편 로그인</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <KakaoLogo />
          </div>
        </div>
      </main>
    </div>
  );
}
