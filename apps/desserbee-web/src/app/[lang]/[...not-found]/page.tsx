'use client';

import { NavigationLanguageGroup, NavigationPathname } from "@repo/entity/src/navigation";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-6">
        {/* 느낌표 아이콘 */}
        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
          <span className="text-3xl font-bold">!</span>
        </div>
        
        {/* 메시지 텍스트 */}
        <div className="text-center space-y-4">
          <p className="text-xl font-medium">다시 한번 확인해주세요!</p>
          <p className="text-gray-600">
            지금 입력하신 주소의 페이지는 사라졌거나<br />
            다른 페이지로 변경되었습니다.<br />
            주소를 다시 확인해주세요.
          </p>
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button className="w-full py-3 px-6 bg-gray-600 text-white rounded-full" onClick={() => router.back()}>
            이전 페이지로 돌아가기
          </button>
          <button className="w-full py-3 px-6 bg-gray-600 text-white rounded-full" onClick={() => router.push(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`)}>
            홈으로 가기
          </button>
        </div>
      </div>
    </main>
  )
}