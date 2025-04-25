import NoticeButton from '../NoticeButton';
import NoticeTag from '../Tag';

interface CardProps {
  tag: string;
  title: string;
  date: string;
}

export default function NoticeCard({ tag, title, date }: CardProps) {
  return (
    <div className="flex w-full items-center justify-between cursor-pointer">
      <div className="w-[80%]">
        {/* 태그와 글 제목 */}
        <div className="flex gap-3">
          <div className="w-[20%]">
            <NoticeTag name={tag} />
          </div>
          <p className="w-[80%] font-semibold">{title}</p>
        </div>
        {/* 등록일 날짜 */}
        <div className="ml-[21%] mt-1 flex gap-5">
          <p className="text-[#121212]">등록일</p>
          <p>{date}</p>
        </div>
      </div>
      {/* 수정 삭제 버튼  */}
      <div className="flex w-[20%] flex-col gap-3 py-2">
        <NoticeButton content="수정" />
        <NoticeButton content="삭제" />
      </div>
    </div>
  );
}
