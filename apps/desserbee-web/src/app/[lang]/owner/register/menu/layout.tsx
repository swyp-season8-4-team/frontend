import StepIndicator from '../_components/StepIndicator';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';
import { RegisterStep } from '../_contexts/RegisterContext';

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="메뉴 등록" />
      <StepIndicator currentSegment={RegisterStep.MENU} />
      <div className="mt-8">{children}</div>
    </div>
  );
}
