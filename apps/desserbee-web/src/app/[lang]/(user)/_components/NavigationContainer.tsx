'use client';

import NavBar from '@/app/[lang]/_components/Navbar';
import IconDonut from '@repo/design-system/components/icons/IconDonut';
import IconMap from '@repo/design-system/components/icons/IconMap';
import IconPerson from '@repo/design-system/components/icons/IconPerson';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function NavigationContainer() {
  const pathname = usePathname();
  const normalizedPath = pathname.split('/', 3)[2];
  const currentPathName = `/${normalizedPath}`;

  const NAVBAR_BUTTON_CONTENT = useMemo(
    () => [
      {
        icon: <IconDonut className="h-full w-full" />,
        text: '커뮤니티',
        path: NavigationPathname.Community,
      },
      {
        icon: <IconMap className="h-full w-full" />,
        text: '지도',
        path: NavigationPathname.Map,
      },
      {
        icon: <IconPerson className="h-full w-full" />,
        text: '마이',
        path: NavigationPathname.My,
      },
    ],
    [],
  );

  return <NavBar menuList={NAVBAR_BUTTON_CONTENT} pathname={currentPathName} />;
}
