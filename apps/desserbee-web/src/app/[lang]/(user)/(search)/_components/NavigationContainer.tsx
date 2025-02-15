'use client';

import { usePathname, useRouter } from 'next/navigation';
import IconLocationOutline from '@repo/design-system/components/icons/IconLocationOutline';
import IconTalkOutline from '@repo/design-system/components/icons/IconTalkOutline';
import IconProfileOutline from '@repo/design-system/components/icons/IconProfileOutline';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavBar from '@repo/design-system/components/Navbar';

const NAVBAR_BUTTON_CONTENT = [
  {
    icon: <IconLocationOutline />,
    text: '커뮤니티',
    path: NavigationPathname.Community,
  },
  {
    icon: <IconTalkOutline />,
    text: '지도',
    path: NavigationPathname.Map,
  },
  {
    icon: <IconProfileOutline />,
    text: '마이',
    path: NavigationPathname.MyPage,
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
