import type { WithParams } from "@/app";
import { NavigationPathname } from "@repo/entity/src/navigation";
import Link from "next/link";
import KakaoLogo from "./_components/KakaoLogo";
import LoginForm from "./_components/LoginForm";
import LoginButtons from "./_components/LoginButtons";

interface Props extends WithParams {}

export default async function SignInPage() {
  return (
    <>
      {/* 메인 컨텐츠 */}
      <main className="flex flex-col justify-center px-4 mt-16 h-full gap-2">
        <h2 className="text-2xl font-medium text-center mb-8">로그인</h2>
        
        <LoginForm className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="radio" name="containLogin" className="w-4 h-4 rounded-full border-gray-300" />
              <span className="ml-2 text-[10px] text-gray-600">로그인 유지</span>
            </label>
            <div className="flex items-center gap-2">
              <Link href={NavigationPathname.SignUp} className="text-b-400 text-[10px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font">일반 회원가입</Link>
              <Link href={NavigationPathname.SignUp} className="text-b-400 text-[10px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font">사장님 회원가입</Link>
              <Link href={NavigationPathname.ForgotPassword} className="text-b-400 text-[10px] text-gray-600 underline decoration-solid underline-offset-auto decoration-from-font">비밀번호 찾기</Link>
            </div>
          </div>
          <LoginButtons />
        </LoginForm>

        {/* 간편 로그인 섹션 */}
        <section className="mt-12">
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
        </section>
      </main>
    </>
  );
}
