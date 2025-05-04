'use client';
import { useRouter, useSearchParams } from 'next/navigation'; // 여기서 가져와야 함
import { ModalHeader } from '../../../_components/ModalHeader';
import NoticeForm from '../_components/NoticeForm';
import { createNotice } from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';

export default function RegisterNotice() {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const router = useRouter();

  const handleCreate = async (data: {
    tag: string;
    title: string;
    content: string;
  }) => {
    if (!storeUuid) {
      alert('가게 정보가 없습니다.');
      return;
    }
    try {
      await createNotice({
        storeUuid,
        ...data,
      });
      alert('공지 등록이 완료되었습니다');
      router.back();
    } catch (error) {
      console.log(error);
      alert('공지 등록에 실패했습니다');
    }
  };

  return (
    <div>
      <ModalHeader
        title="공지 추가하기"
        isSub={true}
        onClose={() => router.back()}
      />
      <hr />
      <NoticeForm mode="create" onSubmitNotice={handleCreate} />
    </div>
  );
}
