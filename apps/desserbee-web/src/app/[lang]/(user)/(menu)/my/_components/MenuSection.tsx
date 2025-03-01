'use client';

import { NavigationPathname } from '@repo/entity/src/navigation';
import MyMenuPanel from './MyMenuPanel';

interface MenuItem {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function MenuSection() {
  
  const menuItems: MenuItem[] = [
    {
      label: '약관보기',
      href: NavigationPathname.PrivacyPolicy,
    },
    {
      label: '로그아웃',
      href: NavigationPathname.SignOut,
    },
  ];
  
  return (
    <div className="space-y-4">
      {menuItems.map((item) => (
        <MyMenuPanel key={item.label} item={item} />
      ))}
    </div>
  );
} 