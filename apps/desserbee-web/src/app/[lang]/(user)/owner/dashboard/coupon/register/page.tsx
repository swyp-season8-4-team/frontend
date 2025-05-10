'use client'
import { useRouter } from 'next/navigation';
import { ModalHeader } from '../../../_components/ModalHeader';
import CouponForm from '../_components/CouponForm';

export default function CouponRegisterPage() {
  const router= useRouter();
  return (
    <div>
      <ModalHeader
        title="쿠폰 등록하기"
        isSub={true}
        onClose={() => router.back()}
      />
      <hr/>
      <CouponForm />
    </div>
  );
}
