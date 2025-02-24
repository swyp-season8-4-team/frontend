import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

export type NavBarMenu = {
  icon: React.ReactNode;
  text: string;
  path?: string;
};

interface Props {
  menuList: NavBarMenu[];
  pathname: string;
}

export default function NavBar({ menuList, pathname }: Props) {
  return (
    <nav className="fixed z-navbar bottom-[25.66px] md:bottom-[10.66px] left-1/2 -translate-x-1/2 inline-flex items-center justify-center bg-white shadow-[1.313px_1.313px_3.281px_0px_rgba(0,0,0,0.05)] rounded-[65.625px] px-[45.281px] py-[10.5px] gap-[60.125px] md:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.05)] md:rounded-[100px] md:px-[74px] md:gap-28">
      {menuList.map(({ icon, text, path }) => (
        <Link key={`navbar-${path}`} href={path ?? ''}>
          <div className="flex flex-col justify-center items-center ">
            <div
              className={cn(
                'mb-2 w-5 h-5 md:w-[23px] md:h-[23px]',
                !!path && pathname.includes(path) ? 'text-[#DE8332]' : 'text-white ',
              )}
            >
              {icon}
            </div>
            <span
              className={cn(
                'whitespace-nowrap text-sm md:text-lg ',
                !!path && pathname.includes(path)
                  ? 'text-[#DE8332] font-semibold'
                  : 'text-[#545454] font-normal',
              )}
            >
              {text}
            </span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
