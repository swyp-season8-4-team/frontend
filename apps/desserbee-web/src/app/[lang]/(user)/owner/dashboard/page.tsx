import IconPerson from '@repo/design-system/components/icons/IconPerson';
import IconHamburger from './../../../../../../../../packages/design-system/src/components/icons/IconHamburger/index';
import { Logo } from '@/app/[lang]/_components/Logo';
import { recipeKorea } from '@/app/fonts';
import { ShopInfo } from './_components/ShopInfo';
import { ShopDetail } from './_components/ShopDetail';

export default function DashBoardHomePage() {
  return (
    <div className="h-full bg-[#EBEBEB]">
      <div className="flex h-[56px] w-full items-center">
        <div className="flex w-4/5 h-full items-center gap-2 p-3">
          <Logo width={30} height={30} />
          <div className={`${recipeKorea.className} text-xl`}>디저비</div>
        </div>

        {/* 아이콘 */}
        <div className="flex w-1/5 cursor-pointer items-center justify-end gap-5 pr-3">
          <div className="h-[25px] w-[25px] text-[#9F9F9F]">
            <IconPerson className="h-full w-full" />
          </div>
          <div className="h-[35px] w-[35px]">
            <IconHamburger className="h-full w-full text-red-500" />
          </div>
        </div>
      </div>

      <div className="mb-4 text-center text-[18px] font-bold">
        기본 정보 관리하기
      </div>
      <div className="flex flex-col gap-4">
        <ShopInfo />
        <ShopDetail />
      </div>
    </div>
  );
}
