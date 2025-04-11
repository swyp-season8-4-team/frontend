// import StepIndicator from '../_components/StepIndicator2';
// import { StoreRegisterHeader } from '../_components/StoreRegisterHeader';

export default function CompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-1 flex-col bg-[#F5F2F0]">
      {/* <StoreRegisterHeader title="등록 완료" />
      <StepIndicator /> */}
      <main className="flex flex-1">{children}</main>
    </div>
  );
}
