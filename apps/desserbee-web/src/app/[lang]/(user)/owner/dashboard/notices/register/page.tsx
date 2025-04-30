'use client';
import { useRouter } from 'next/navigation'; // 여기서 가져와야 함
import { ModalHeader } from '../../../_components/ModalHeader';
import NoticeForm from '../_components/NoticeForm';

export default function RegisterNotice() {
  const router = useRouter();
  return (
    <div>
      <ModalHeader
        title="공지 추가하기"
        isSub={true}
        onClose={() => router.back()}
      />
      <hr />
      <NoticeForm />
    </div>
  );
}
