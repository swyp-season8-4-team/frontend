import type { WithChildren } from '@repo/ui/index';

export default async function SignUpLayout({ children }: WithChildren) {
  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-y-scroll bg-white">
      <header className="fixed top-0 w-full max-w-screen-md border-b border-black/[0.15] py-[14px] text-center font-medium text-[#1D1B20]">
        회원가입
      </header>
      <div className="pt-[50px]">{children}</div>
    </div>
  );
}
