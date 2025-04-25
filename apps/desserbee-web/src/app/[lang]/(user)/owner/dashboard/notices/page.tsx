import { DashBoardHeader } from '../_components/DashBoardHeader';
import NoticeCard from './_components/NoticeCard';
export default function notices() {
  return (
    <div className="min-h-screen w-full bg-[#EBEBEB]">
      <DashBoardHeader title="공지 관리하기" />
      <button className="mx-auto mb-[5px] block w-[95%] rounded-[10px] border border-solid border-[#949494] bg-[#F5F5F5] px-4 py-2">
        + 새 공지 추가하기
      </button>

      <div className="m-auto flex h-full w-[95%] flex-col items-center justify-center rounded-md bg-white">
        <div className="flex w-full justify-between rounded-t-md bg-[#F5F5F5] p-2">
          <div className="flex gap-[6px]">
            <p className="font-bold">공지사항</p>
            <p className="font-bold">7개</p>
          </div>
          <p className="text-[#767676]">최신순</p>
        </div>
        <div className="w-full px-2">
          <NoticeCard
            tag="알림"
            title="📌 런던 베이글 뮤지엄 대기등록은 캐치테이블을 이용 부탁드립니다💚"
            date="2024.12.10"
          />
        </div>
      </div>
    </div>
  );
}
