import { formatDate } from '@/app/[lang]/(user)/store/_utils/date';
import NoticeButton from '../NoticeButton';
import NoticeTag from '../Tag';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CardProps {
  tag: string;
  title: string;
  date: string;
  storeId: string;
  noticeId: number;
}

export default function NoticeCard({
  tag,
  title,
  date,
  storeId,
  noticeId,
}: CardProps) {
  let convertedTag = tag;
  if (tag === 'ALERT') convertedTag = '알림';
  else if (tag === 'EMERGENCY') convertedTag = '긴급';
  else if (tag === 'COMMON') convertedTag = '일반';

  const router = useRouter();

  const handleEdit = () => {
    const url = `/owner/dashboard/notices/${noticeId}/edit?storeUuid=${storeId}`;
    router.push(url);
  };

  return (
    <div className="mb-3 flex w-full items-center justify-between rounded-lg border border-gray-100 p-2 shadow-sm hover:bg-gray-50">
      <Link
        href={{
          pathname: `/owner/dashboard/notices/${noticeId}`,
          query: { storeUuid: storeId },
        }}
        className="flex flex-1 cursor-pointer flex-col w-[80%]"
      >
        {/* 태그와 글 제목 */}
        <div className="flex items-center gap-3">
          <div className="w-[60px]">
            <NoticeTag name={convertedTag} />
          </div>
          <p className="truncate font-semibold">
            {title}
          </p>
        </div>
        {/* 등록일 날짜 */}
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span>등록일</span>
          <span>{formatDate(date)}</span>
        </div>
      </Link>
      {/* 수정 삭제 버튼  */}
      <div className="flex flex-col gap-2 w-[20%]">
        <NoticeButton content="수정" onClick={handleEdit} />
        <NoticeButton content="삭제" />
      </div>
    </div>
  );
}
