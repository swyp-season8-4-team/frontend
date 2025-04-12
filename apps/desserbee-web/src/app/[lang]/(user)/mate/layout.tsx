import type { WithChildren } from '@repo/ui/index';
import BackButton from '../../_components/BackButton';

export default async function MateLayout({ children }: WithChildren) {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-y-scroll bg-[#f6f6f6]">
      <header className="flex h-[52px] items-center justify-between py-[18px]">
        <div className="flex items-center gap-[2px]">
          <BackButton />
          <h1 className="font-pretendard text-[18px] font-semibold leading-[130%] tracking-[-0.42px] text-[#6F6F6F]">
            디저트 메이트
          </h1>
        </div>
      </header>
      {children}
    </div>
  );
}
