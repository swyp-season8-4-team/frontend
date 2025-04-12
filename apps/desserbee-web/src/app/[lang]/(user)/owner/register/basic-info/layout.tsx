'use client';

import { useRouter } from 'next/navigation';
import StepIndicator from '../_components/StepIndicator';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function BasicInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <div>
      <StoreRegisterHeader title="내 가게 등록" onClose={onClose} />
      <StepIndicator />
      <div>{children}</div>
    </div>
  );
}
