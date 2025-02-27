'use client';

import IconBookmarkList from '@repo/design-system/components/icons/IconBookmarkList';
import IconCoupon from '@repo/design-system/components/icons/IconCoupon';
import IconPoint from '@repo/design-system/components/icons/IconPoint';
import IconSetting from '@repo/design-system/components/icons/IconSetting';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface IconMenuItem {
  icon: ReactNode;
  label: string;
  href: string;
}

export default function MyIconMenu() {
  const menuItems: IconMenuItem[] = [
    {
      icon: <IconSetting size={18} viewBox={"0 0 18 18"} />,
      label: '프로필 설정',
      href: NavigationPathname.MySetting,
    },
    {
      icon: <IconBookmarkList size={18} viewBox={"0 0 18 18"}/>,
      label: '저장 목록',
      href: NavigationPathname.MyBookmarkList,
    },
    {
      icon: <IconPoint size={18} viewBox={"0 0 18 18"}/>,
      label: '포인트',
      href: NavigationPathname.MyPoints,
    },
    {
      icon: <IconCoupon size={18} viewBox={"0 0 18 18"}/>,
      label: '쿠폰',
      href: NavigationPathname.MyCoupon,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {menuItems.map((item, index) => (
        <Link href={item.href} key={index} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            {item.icon}
          </div>
          <span className="text-[14px] whitespace-nowrap text-gray-700">{item.label}</span>
        </Link>
      ))}
    </div>
  );
} 