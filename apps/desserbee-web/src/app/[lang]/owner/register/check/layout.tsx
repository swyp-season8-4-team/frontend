import StepIndicator from '../_components/StepIndicator';
import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

// 갑자기 상의없이 확인 단계 사라짐.. 후에 또 생길 수 있으니 남겨둡니다.
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
