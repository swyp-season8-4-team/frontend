'use client';

import signOutAction from '@/actions/signOutAction';
import { NavigationPathname } from '@repo/entity/src/navigation';
import MyMenuPanel from './MyMenuPanel';

interface MenuItem {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function MenuSection() {
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    await signOutAction();
  };
  
  const menuItems: MenuItem[] = [
    {
      label: '약관보기',
      href: NavigationPathname.PrivacyPolicy,
    },
    {
      label: '로그아웃',
      href: NavigationPathname.SignIn,
      onClick: handleLogout,
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