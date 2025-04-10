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
    <nav className="z-navbar fixed bottom-0 inline-flex w-full max-w-screen-md items-center justify-center gap-14 bg-white py-4 md:gap-28">
      {menuList.map(({ icon, text, path }) => (
        <Link key={`navbar-${path}`} href={path ?? ''}>
          <div className="flex flex-col items-center justify-center">
            <div
              className={cn(
                'mb-2 h-6 w-6',
                !!path && pathname.includes(path)
                  ? 'text-primary-50'
                  : 'text-neutral-10',
              )}
            >
              {icon}
            </div>
            <span
              className={cn(
                'whitespace-nowrap text-xs md:text-lg',
                !!path && pathname.includes(path)
                  ? 'text-primary-50 font-medium'
                  : 'text-neutral-10 font-normal',
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
