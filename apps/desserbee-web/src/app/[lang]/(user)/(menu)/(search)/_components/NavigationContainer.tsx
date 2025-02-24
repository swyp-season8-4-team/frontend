'use client';

import { usePathname, useRouter } from 'next/navigation';
import IconLocationOutline from '@repo/design-system/components/icons/IconLocationOutline';
import IconTalkOutline from '@repo/design-system/components/icons/IconTalkOutline';
import IconProfileOutline from '@repo/design-system/components/icons/IconProfileOutline';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavBar from '@/app/[lang]/_components/Navbar';

const NAVBAR_BUTTON_CONTENT = [
  {
    icon: <IconLocationOutline className="w-full h-full" />,
    text: '커뮤니티',
    path: NavigationPathname.Community,
  },
  {
    icon: <IconTalkOutline className="w-full h-full" />,
    text: '지도',
    path: NavigationPathname.Map,
  },
  {
    icon: <IconProfileOutline className="w-full h-full" />,
    text: '마이',
    path: NavigationPathname.My,
  },
];

export default function NavigationContainer() {
  const pathname = usePathname();
  const normalizedPath = pathname.split('/', 3)[2];
  const currentPathName = `/${normalizedPath}`;

  const router = useRouter();

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <NavBar
      menuList={NAVBAR_BUTTON_CONTENT}
      pathname={currentPathName}
      onClick={handleMenuClick}
    />
  );
}
