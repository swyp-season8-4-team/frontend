'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ModalHeader } from '../../../../_components/ModalHeader';
import NoticeForm from '../../_components/NoticeForm';
import {
  editNotice,
  getNotice,
} from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { useEffect, useState } from 'react';
import type { NoticeResponse } from '@repo/entity/src/store';

export default function EditNoticePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
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

  const handleEdit = async (data: {
    tag: string;
    title: string;
    content: string;
  }) => {
    if (!storeUuid || !noticeId) {
      return;
    }
    try {
      await editNotice({
        storeUuid,
        noticeId,
        ...data,
      });
      alert('공지 수정이 완료되었습니다');
      router.back();
    } catch (error) {
      console.log(error);
      alert('공지 수정에 실패했습니다');
    }
  };
  return (
    <div>
      <ModalHeader
        title="공지 수정하기"
        isSub={true}
        onClose={() => router.back()}
      />
      <hr />
      {notice && (
        <NoticeForm
          mode="edit"
          defaultValues={{
            tag: notice.tag,
            title: notice.title,
            content: notice.content,
          }}
          onSubmitNotice={handleEdit}
        />
      )}
    </div>
  );
}
