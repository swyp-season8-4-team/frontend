'use client';
import IconPerson from '@repo/design-system/components/icons/IconPerson';
import IconHamburger from './../../../../../../../../packages/design-system/src/components/icons/IconHamburger/index';
import { Logo } from '@/app/[lang]/_components/Logo';
import { recipeKorea } from '@/app/fonts';
import { ShopInfo } from './_components/ShopInfo';
import { ShopDetail } from './_components/ShopDetail';
import { Notice } from './_components/Notice';
import { MenuList } from './_components/MenuList';
import { useState } from 'react';
import { HamburgerMenu } from './_components/HamburgerMenu';

export default function DashBoardHomePage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-full bg-[#EBEBEB]">
      <div className="flex h-[56px] w-full items-center">
        <div className="flex h-full w-4/5 items-center gap-2 p-3">
          <Logo width={30} height={30} />
          <div className={`${recipeKorea.className} text-xl`}>디저비</div>
        </div>

        {/* 아이콘 */}
        <div className="flex w-1/5 cursor-pointer items-center justify-end gap-5 pr-3">
          <div className="h-[25px] w-[25px] text-[#9F9F9F]">
            <IconPerson className="h-full w-full" />
          </div>
          <div className="h-[35px] w-[35px]">
            <IconHamburger
              className="h-full w-full text-[#9F9F9F] hover:text-[#7A7A7A]"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
      </div>

      <div className="mb-4 text-center text-[18px] font-bold">
        기본 정보 관리하기
      </div>
      <div className="flex flex-col gap-4">
        <ShopInfo />
        <ShopDetail />
        <MenuList title="메뉴리스트" />
        <Notice
          title="최근 공지"
          content="런던 베이글 뮤지엄 안국점 현장대기 및 원격줄서기는 캐치테이블을 이용부탁드립니다🌼 많은 관심과 이용부탁드립니다💚"
        />
      </div>
      {open && <HamburgerMenu onClose={() => setOpen(false)} />}
    </div>
  );
}
