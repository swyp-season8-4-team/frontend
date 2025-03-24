import StepIndicator from '../_components/StepIndicator';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="내용 확인" />
      <StepIndicator />
      <div>{children}</div>
    </div>
  );
}
