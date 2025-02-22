import CommunityMateSection from "./_components/CommunityMateSection";
import CommunityMateTitle from "./_components/CommunityMateTitle";

export const dynamic = 'force-dynamic';

export default async function CommunityMatePage() {
  
  const categories = ['친목도모', '인생샷찍', '카공모임', '건강맛집', '빵지순례', '모집중만 보기', '전체 보기'];

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6 h-[calc(100dvh-174.5px)] overflow-hidden flex flex-col">
      {/* 검색바 */}
      <div className="relative mb-8">
        <CommunityMateTitle />
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 overflow-x-auto mb-6 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {categories.map((category) => (
          <button
            key={`${category}-chip`}
            className="px-4 py-2 rounded-full bg-white text-sm whitespace-nowrap hover:bg-gray-50"
          >
            {category}
          </button>
        ))}
      </div>

      {/* 게시글 목록 - 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <CommunityMateSection />
        <div className="sticky left-0 bottom-0 w-full h-[100px] bg-gradient-to-b from-[#F9FAFC]/0 to-[#F9FAFC] to-[84.75%]" />

      </div>
    </main>
  );
}