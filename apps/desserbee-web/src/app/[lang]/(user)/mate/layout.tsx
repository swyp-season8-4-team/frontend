import type { WithChildren } from "@repo/ui/index";
import BackButton from "../../_components/BackButton";

export default async function MateLayout({ children }: WithChildren) {
  return (
    <div className="flex flex-col h-[100dvh] gap-[21px] bg-[#f6f6f6]">
      <header className="flex items-center justify-between h-[52px] py-[18px]">
        <div className="flex items-center gap-[2px]">
          <BackButton />
          <h1 className="text-[#6F6F6F] font-pretendard text-[18px] font-semibold leading-[130%] tracking-[-0.42px]">디저트 메이트</h1>
        </div>
      </header>
      {children}
    </div>
  );
}
  