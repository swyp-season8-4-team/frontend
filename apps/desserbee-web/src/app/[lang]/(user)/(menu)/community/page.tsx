import { NavigationPathname } from "@repo/entity/src/navigation";
import Link from "next/link";
import CommunityNickName from "./_components/CommunityNickName";

export default async function CommunityIntroPage() {
  return (
    <main className="flex flex-col px-5 py-6 bg-[#F6F6F6] h-[100dvh]">
      <h1 className="text-xl text-gray-600 mb-4">커뮤니티</h1>
      
      <h2 className="text-center text-lg mt-4 mb-8">
        <CommunityNickName />님, 디저비의 커뮤니티<br />
        서비스를 탐색해보세요!
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* 첫 번째 카드 */}
        <div className="bg-white rounded-2xl p-4 flex flex-col justify-between items-center">
          <div className="w-full aspect-square bg-gray-200 rounded-xl mb-4" />
          <p className="text-center text-sm mb-3">
            <CommunityNickName />에게 딱 맞는<br />
            디저트 메이트를 찾아볼까요?
          </p>
          <Link
            href={NavigationPathname.CommunityDessertMate}
            className="w-full py-2 bg-gray-500 text-white rounded-full text-sm text-center"
          >
            바로가기
          </Link>
        </div>

        {/* 두 번째 카드 */}
        <div className="bg-white rounded-2xl p-4 flex flex-col justify-between items-center">
          <div className="w-full aspect-square bg-gray-200 rounded-xl mb-4" />
          <p className="text-center text-sm mb-3">
            다양한 디저트 가게의<br />
            리뷰를 알아볼까요?
          </p>
          <Link
            href={NavigationPathname.CommunityDessertReview}
            className="w-full py-2 bg-gray-500 text-white rounded-full text-sm text-center"
          >
            바로가기
          </Link>
        </div>
      </div>
    </main>
  );
}