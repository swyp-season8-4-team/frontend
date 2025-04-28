'use client';
import IconPerson from '@repo/design-system/components/icons/IconPerson';
import { Logo } from '@/app/[lang]/_components/Logo';
import { recipeKorea } from '@/app/fonts';
import IconHamburger from '@repo/design-system/components/icons/IconHamburger';
import { useState } from 'react';
import { HamburgerMenu } from '../HamburgerMenu';

interface HeaderProps {
  title: string;
  num?: string;
}

export function DashBoardHeader({ title, num }: HeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
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
        {open && <HamburgerMenu onClose={() => setOpen(false)} />}
      </div>
      <div className="mb-4 flex w-full items-center justify-center gap-3">
        <p className="text-center text-[18px] font-bold">{title}</p>
        <p className="text-[18px] font-bold text-[#2FB350]">{num}</p>
      </div>
    </>
  );
}
