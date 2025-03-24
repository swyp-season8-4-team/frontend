import StepIndicator from '../_components/StepIndicator';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function CompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="등록 완료" />
      <StepIndicator />
      <div>{children}</div>
    </div>
  );
}
