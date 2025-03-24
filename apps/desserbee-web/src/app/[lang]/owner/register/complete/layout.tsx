import StepIndicator from '../_components/StepIndicator';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';
import { RegisterStep } from '../_contexts/RegisterContext';

export default function CompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="등록 완료" />
      <StepIndicator currentSegment={RegisterStep.COMPLETE} />
      <div className="mt-8">{children}</div>
    </div>
  );
}
