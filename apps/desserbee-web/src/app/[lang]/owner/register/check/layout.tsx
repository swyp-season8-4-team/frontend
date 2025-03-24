import StepIndicator from '../_components/StepIndicator';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';
import { RegisterStep } from '../_contexts/RegisterContext';

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="내용 확인" />
      <StepIndicator currentSegment={RegisterStep.CHECK} />
      <div className="mt-8">{children}</div>
    </div>
  );
}
