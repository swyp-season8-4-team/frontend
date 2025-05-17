'use client';
import { getNotice } from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import type { NoticeResponse } from '@repo/entity/src/store';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NoticeTag from '../_components/Tag';
import { formatDate } from './../../../../../../../../../../packages/utility/src/date';
import IconDirection from '@repo/design-system/components/icons/IconDirection';

export default function NoticeDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const noticeId = Number(params.noticeId);
  const storeUuid = searchParams.get('storeUuid');
  const [notice, setNotice] = useState<NoticeResponse>();

  useEffect(() => {
    if (storeUuid && noticeId) {
      const fetchNotice = async () => {
        try {
          const data = await getNotice({ storeUuid, noticeId });
          setNotice(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNotice();
    }
  }, [storeUuid, noticeId]);

  let convertedTag = notice?.tag;
  if (notice?.tag === 'ALERT') convertedTag = '알림';
  else if (notice?.tag === 'EMERGENCY') convertedTag = '긴급';
  else if (notice?.tag === 'COMMON') convertedTag = '일반';

  if (!notice) return null;
  const { title, content, createdAt } = notice;

  return (
    <div className="relative">
      <div className='relative flex flex-1'>
      <button
        onClick={() => router.back()}
        className="rotate-90 p-2"
      >
        <IconDirection size={28} />
      </button>
      </div>
      <div className="mx-auto w-full px-5 md:w-[768px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[80px]">
              <NoticeTag name={convertedTag || ''} />
            </div>
            <span className="text-lg font-bold">{title}</span>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <p>등록일</p>
          <span>{formatDate(createdAt)}</span>
        </div>
        <hr className="mb-4" />
        <div className="whitespace-pre-line text-base leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}
