import type { WithParams } from "@/app";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import { notFound } from "next/navigation";
import Image from "next/image";
import CurrentApplyList from "./_components/CurrentApplyList";

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

  const { mateCategory, mateImage, title, content, place, nickname } = mate;

  return (
    <main className="flex flex-col h-full px-4 gap-4">
      <section className="border rounded-[10px] bg-[#ffffff] px-2 py-2">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#9F9F9F] text-[12px] font-semibold leading-normal tracking-[-0.24px]" >
              <span className="">{mateCategory}</span>
              <span className="">{'>'}</span>
            </div>
            <span className="text-lg font-bold">{title}</span>
          </div>
          <span className="px-4 py-1 text-sm text-center text-white bg-[#F5B01C] rounded-full">참여 인원</span>
        </div>

        {/* 게시글 내용 */}
        <div className="px-4 py-3">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src={mateImage[0] || '/default-avatar.png'}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{nickname}</p>
                <p className="text-sm text-gray-500">2025.01.28 14:36</p>
              </div>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-sm text-gray-500">공감 5</span>
              <span className="text-sm text-gray-500">댓글 2</span>
              <span className="text-sm text-[#F5B01C]">저장</span>
              <button className="p-1">⋮</button>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2">장소: 키토빵있갈</p>
            <p>[이 가게 위치 보러가기]</p>
          </div>
          
          <div className="text-gray-700 mb-6">
            <p>{content}</p>
            {/* <p>2월 2일 (일요일) 망원동 비건 빵지순례 함께 해요!</p>
            <p>망원역에서 만나 키토빵있갈부터 평행 카페까지!</p>
            <p className="mt-4">👑 비건을 사랑하는 분, 건강한 디저트를 즐기고 싶은 분 모두 환영해요!</p>
            <p>같이 맛있는 디저트 먹으면서 이야기 나눠요.💚</p> */}
          </div>

          {/* 이미지 */}
          <div className="mb-4">
            <Image
              src={mateImage[0] || '/default-post-image.png'}
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
        </div>
      </section>
      <section className="border rounded-[10px] bg-white px-2 py-2">
        {/* 댓글 섹션 */}
        <div className="mt-4 px-4">
          <CurrentApplyList waitList={waitList} />
        </div>
      </section>
      <section className="border rounded-[10px] bg-white px-2 py-2">
        {/* 댓글 목록 */}
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
          {/* 추가 댓글들... */}
        </div>
      </section>
    </main>
  );
}