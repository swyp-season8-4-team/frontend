import type { WithChildren } from '@repo/ui/index';

export default async function SignUpLayout({ children }: WithChildren) {
  return (
    <div className="flex h-full min-h-[100dvh] flex-col overflow-y-scroll bg-white">
      <header className="z-modal fixed top-0 w-full max-w-screen-md bg-[#FAFAFA] py-[14px] text-center font-medium text-[#1D1B20]">
        회원가입
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
