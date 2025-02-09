'use client';

import type { NavBarMenu } from '../types';
import { NavBarBtn } from './NavBarBtn';

interface Props {
  menuList: NavBarMenu[];
  pathname?: string;
  onClick: (path: string) => void;
}

export function NavBar({ menuList, pathname, onClick }: Props) {

  return (
    <nav className="fixed bottom-[25.66px] left-1/2 -translate-x-1/2 inline-flex items-center justify-center bg-white shadow-[1.313px_1.313px_3.281px_0px_rgba(0,0,0,0.05)] rounded-[65.625px] px-[45.281px] py-[10.5px] gap-[76.125px] md:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.05)] md:rounded-[100px] md:px-[74px] md:py-4 md:gap-28">
      {menuList.map(({ icon, text, path }) => (
        <NavBarBtn
          icon={icon}
          text={text}
          key={text}
          isSelected={path === pathname}
          onClick={path ? () => onClick(path) : undefined}
        />
      ))}
    </nav>
  );
}
