'use client';

import { NavBar } from "@repo/design-system/components/NavBar";
import { usePathname, useRouter } from "next/navigation";
import IconLocation from "@repo/design-system/components/icons/IconLocation";
import IconTalk from "@repo/design-system/components/icons/IconTalk";
import IconProfile from "@repo/design-system/components/icons/IconProfile";

const NAVBAR_BUTTON_CONTENT = [
  {
    icon: <IconTalk />,
    text: '커뮤니티',
    path: '/community',
  },
  {
    icon: <IconLocation />,
    text: '지도',
    path: '/map',
  },
  {
    icon: <IconProfile />,
    text: '마이',
    path: '/my-page',
  },
];

export default function NavigationContainer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuClick = (path: string) => {
    router.push(path);
  }

  return (
    <NavBar menuList={NAVBAR_BUTTON_CONTENT} pathname={pathname} onClick={handleMenuClick} />
  )
}