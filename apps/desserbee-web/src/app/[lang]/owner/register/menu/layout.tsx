'use client';
import { useRouter } from 'next/navigation';
import StepIndicator from '../_components/StepIndicator2';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function MenuLayout({
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
      <StoreRegisterHeader title="메뉴 등록" onClose={onClose} />
      <StepIndicator />
      <div>{children}</div>
    </div>
  );
}
