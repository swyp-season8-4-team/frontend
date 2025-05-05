'use client';
import { formatDate } from '@/app/[lang]/(user)/store/_utils/date';
import NoticeButton from '../NoticeButton';
import NoticeTag from '../Tag';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteNotice } from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import DeleteModal from '../DeleteModal';

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    const url = `/owner/dashboard/notices/${noticeId}/edit?storeUuid=${storeId}`;
    router.push(url);
  };

  const handleDelete = async () => {
    try {
      await deleteNotice({ storeUuid: storeId, noticeId });
      setShowDeleteModal(false);
      alert("공지가 삭제되었습니다.");
      window.location.reload();
    }
    catch(error){
      console.log(error);
      alert("공지를 삭제하는데 실패했습니다.");
    }
  };

  return (
    <>
      <div className="mb-3 flex w-full items-center justify-between rounded-lg border border-gray-100 p-2 shadow-sm hover:bg-gray-50">
        <Link
          href={{
            pathname: `/owner/dashboard/notices/${noticeId}`,
            query: { storeUuid: storeId },
          }}
          className="flex w-[80%] flex-1 cursor-pointer flex-col"
        >
          {/* 태그와 글 제목 */}
          <div className="flex items-center gap-3">
            <div className="w-[60px]">
              <NoticeTag name={convertedTag} />
            </div>
            <p className="truncate font-semibold">{title}</p>
          </div>
          {/* 등록일 날짜 */}
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <span>등록일</span>
            <span>{formatDate(date)}</span>
          </div>
        </Link>
        {/* 수정 삭제 버튼  */}
        <div className="flex w-[20%] flex-col gap-2">
          <NoticeButton content="수정" onClick={handleEdit} />
          <NoticeButton content="삭제" onClick={() => setShowDeleteModal(true)} />
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        content="공지를 삭제하시겠어요?"
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
