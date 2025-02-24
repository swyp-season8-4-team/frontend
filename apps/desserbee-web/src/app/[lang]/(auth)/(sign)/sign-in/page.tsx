import type { WithParams } from "@/app";
import { NavigationPathname } from "@repo/entity/src/navigation";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import KakaoLogo from "./_components/KakaoLogo";
import LoginForm from "./_components/LoginForm";

interface Props extends WithParams {}

export default async function SignInPage() {
  // const { next } = await searchParams;

  return (
    <>
      {/* 메인 컨텐츠 */}
      <main className="flex flex-col justify-center px-4 mt-16 h-full">
        <h2 className="text-2xl font-medium text-center mb-8">로그인</h2>
        
        <LoginForm className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력 해주세요."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
          />
        
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력 해주세요."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
          />

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
          <div className="flex flex-col gap-2 ">
            <Button
              type="submit"
              className="w-full py-[15px] py-3 bg-[#FDB813] text-white rounded-[100px] font-medium text-center font-bold leading-[130%] tracking-[-0.334px]"
            >
              로그인
            </Button>
            <Button
              type="submit"
              className="w-full py-[15px] py-3 bg-[#DE8332] text-white rounded-[100px] font-medium text-center font-bold leading-[130%] tracking-[-0.334px]"
            >
              사장님 로그인
            </Button>
          </div>
          
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
