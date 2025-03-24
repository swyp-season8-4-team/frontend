'use client';

import StepIndicator from '../_components/StepIndicator';
import { RegisterStep } from '../_contexts/RegisterContext';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function BasicInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="가게 기본 정보" />
      <StepIndicator currentSegment={RegisterStep.BASIC_INFO} />
      <div className="mt-8">{children}</div>
    </div>
  );
}
