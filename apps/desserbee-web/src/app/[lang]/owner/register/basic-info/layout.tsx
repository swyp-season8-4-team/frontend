'use client';

import StepIndicator from '../_components/StepIndicator2';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function BasicInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="가게 기본 정보" />
      <StepIndicator />
      <div>{children}</div>
    </div>
  );
}
