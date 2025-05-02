'use client';
import { useParams, useSearchParams } from 'next/navigation';

export default function NoticeDetailPage(){
  const params = useParams();
  const searchParams = useSearchParams();
  
  const noticeId = params.noticeId;
  const storeUuid = searchParams.get('storeUuid');
  console.log(noticeId, storeUuid);

  return <div>공지 상세 정보</div>;
}
