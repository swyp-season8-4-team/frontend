import type { WithParams } from "@/app";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import { notFound } from "next/navigation";
import Image from "next/image";
import CurrentApplyList from "./_components/CurrentApplyList";
import MateApplyState from "./_components/MateApplyState";
import MyMateDetailSection from "./_components/MyMateDetailSection";
import { MateDetailContext, MateDetailProvider } from "./_contexts/MateDetailContext";
import Link from "next/link";
import { NavigationPathname } from "@repo/entity/src/navigation";
import { formatDate } from "@repo/utility/src/date";
const mateService = new MateService({
  mateRepository: new MateAPIRepository(), 
})

export default async function MateDetailPage({ params }: WithParams) {
  const { mateId } = await params;
  if (!mateId) {
    notFound();
  }

  const [mateResult, waitListResult, myTeamMembersResult] = await Promise.allSettled([
    mateService.getDetails({
      id: mateId,
    }),
    mateService.getWaitList({
      id: mateId,
    }),
    mateService.getMyTeamMembers({
      id: mateId,
    }),
  ]);

  const mate = mateResult.status === 'fulfilled' ? mateResult.value : null;
  const waitList = waitListResult.status === 'fulfilled' ? waitListResult.value : [];
  const myTeamMembers = myTeamMembersResult.status === 'fulfilled' ? myTeamMembersResult.value : [];

  if (!mate) {
    notFound();
  }

  const { mateCategory, mateImage, title, content, place, nickname, updatedAt } = mate;
  
  return (
    <MateDetailProvider mate={mate}>
      <main className="flex flex-col h-full px-4 gap-4 bg-[#f6f6f6]">
        <section className="border rounded-[10px] bg-[#ffffff] px-2 py-2">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#9F9F9F] text-[10px] font-semibold tracking-[-0.3px]" >
                <span className="">{mateCategory}</span>
                <span className="">{'>'}</span>
              </div>
              <span className="text-[#393939] text-[10px] font-semibold leading-normal tracking-[-0.3px]">{title}</span>
            </div>
            <MateApplyState />
          </div>

          {/* 게시글 내용 */}
          <div className="px-4 py-3">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src={!!mateImage ? mateImage : '/default-avatar.png'}
                  alt="profile"
                  width={40}
                  height={40}
                  className="flex-shrink-0 aspect-square rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[#393939] text-[12px] leading-normal tracking-[-0.24px]">{nickname}</span>
                  <span className="text-[#9f9f9f] text-[12px] leading-normal tracking-[-0.24px]">{formatDate(updatedAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-[#393939] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">댓글 2</span>
                <span className="text-[#F5B01C] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">저장</span>
                <button className="p-1">⋮</button>
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-2">장소: {place?.placeName}</p>
              <Link href={`${NavigationPathname.Map}?latitude=${place?.latitude}&longitude=${place?.longitude}`}>이 가게 위치 보러가기</Link>
            </div>
            
            <div className="text-gray-700 mb-6">
              <p className="text-[#393939] text-[12px] leading-normal tracking-[-0.27px]">{content}</p>
            </div>

            {/* 이미지 */}
            <div className="mb-4">
              <Image
                src={!!mateImage ? mateImage : '/default-post-image.png'}
                alt="post image"
                width={800}
                height={400}
                className="w-full rounded-lg"
              />
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-4 items-start">
              <span className="py-2 text-gray-700 rounded-md">수정하기</span>
              <span className="py-2 text-gray-700 rounded-md">삭제하기</span>
            </div>

            <div className="flex items-center gap-2 py-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={!!mateImage ? mateImage : '/default-avatar.png'}
                  alt="profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <Link 
                href={``} 
                className="flex items-center gap-2 w-full text-[#393939] text-[14px]"
              >
                <span>{nickname}님의 게시물 더보기</span>
                <span className="text-gray-400">›</span>
              </Link>
            </div>
          </div>
        </section>
        <MyMateDetailSection mate={mate}>
          {/* 댓글 섹션 */}
          <div className="px-4">
            <CurrentApplyList waitList={waitList} />
          </div>
        </MyMateDetailSection>
        {/* <MyMateDetailSection mate={mate}>
          <div className="space-y-4">
            <div className="flex items-start justify-between py-3 border-t">
              <div className="flex gap-2">
                <Image
                  src="/default-avatar.png"
                  alt="commenter"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">으하하님</p>
                  <p className="text-sm">저희 어디서 모이나요?</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">25.02.10</span>
                <button className="text-sm text-gray-500">답글쓰기</button>
                <button className="p-1">🔒</button>
              </div>
            </div>
          </div>
        </MyMateDetailSection> */}
      </main>
    </MateDetailProvider>
  );
}