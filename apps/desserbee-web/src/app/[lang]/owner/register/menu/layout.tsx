import StepIndicator from '../_components/StepIndicator2';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StoreRegisterHeader title="메뉴 등록" />
      <StepIndicator />
      <div>{children}</div>
    </div>
  );
}
