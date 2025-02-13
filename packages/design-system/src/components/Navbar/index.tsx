'use client';

import { cn } from '@repo/ui/lib/utils';
import type { NavBarMenu } from '../../types';

interface Props {
  menuList: NavBarMenu[];
  pathname: string;
  onClick: (path: string) => void;
}

export function NavBar({ menuList, pathname, onClick }: Props) {
  return (
    <div className="w-full">
      <nav className="fixed z-navbar bottom-[25.66px] left-1/2 -translate-x-1/2 inline-flex items-center justify-center bg-white shadow-[1.313px_1.313px_3.281px_0px_rgba(0,0,0,0.05)] rounded-[65.625px] px-[45.281px] py-[10.5px] gap-[76.125px] md:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.05)] md:rounded-[100px] md:px-[74px] md:py-4 md:gap-28">
        {menuList.map(({ icon, text, path }) => (
          <button key={path} onClick={() => onClick(path as string)}>
            <div className="flex flex-col justify-center items-center">
              <div
                className={cn(
                  'mb-2',
                  path === pathname ? 'text-[#DE8332]' : 'text-white ',
                )}
              >
                {icon}
              </div>
              <div
                className={cn(
                  'text-nowrap',
                  path === pathname
                    ? 'text-[#DE8332] font-semibold'
                    : 'text-[#545454] font-normal',
                )}
              >
                {text}
              </div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}
