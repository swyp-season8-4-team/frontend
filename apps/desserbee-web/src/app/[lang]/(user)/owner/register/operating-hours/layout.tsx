'use client';
import { useRouter } from 'next/navigation';
import StepIndicator from '../_components/StepIndicator';
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
      <StoreRegisterHeader title="운영 시간" onClose={onClose} />
      <StepIndicator />
      <div>{children}</div>
    </div>
  );
}
