import BackButton from "@/app/[lang]/_components/BackButton";
import SearchBar from "../_components/SearchBar";
import { NavigationPathname } from "@repo/entity/src/navigation";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <main className="max-w-screen-md mx-auto h-[calc(100dvh-174.5px)] overflow-hidden flex flex-col">
      {/* 검색 헤더 */}
      <div className="flex items-center p-4 gap-3">
        <BackButton />
        <div className="flex-1">
          <Suspense fallback={<div className="h-10 bg-gray-100 rounded-full animate-pulse"></div>}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
      
      {/* 검색 결과 영역 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 검색 결과가 여기에 표시됩니다 */}
        <div className="text-center text-gray-400 mt-10">
          검색어를 입력하세요
        </div>
      </div>
    </main>
  );
} 