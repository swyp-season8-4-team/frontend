import { NavigationPathGroup } from "@repo/entity/src/navigation";
import Link from "next/link";

export default function LoginForm() {
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
      <div className="mt-16">
        <h2 className="text-2xl font-medium text-center mb-8">로그인</h2>
        
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-600">로그인 유지</span>
            </label>
            <a href="#" className="text-sm text-gray-600">비밀번호 찾기</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#FDB813] text-white rounded-lg font-medium mt-8"
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
            <Link href={NavigationPathGroup.OAuthCallback} className="p-4 bg-[#FFE14A] rounded-full">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z"/>
                <path d="M12 8.5a3.5 3.5 0 0 0-3.5 3.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.93-1.57-3.5-3.5-3.5z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}