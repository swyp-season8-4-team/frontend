'use client';

import { NavBar } from "@repo/design-system/components/NavBar";
import { usePathname, useRouter } from "next/navigation";
import IconLocation from "@repo/design-system/components/icons/IconLocation";
import IconTalk from "@repo/design-system/components/icons/IconTalk";
import IconProfile from "@repo/design-system/components/icons/IconProfile";
import { NavigationPathname } from "@repo/entity/src/navigation";

const NAVBAR_BUTTON_CONTENT = [
  {
    icon: <IconTalk />,
    text: '커뮤니티',
    path: NavigationPathname.Community,
  },
  {
    icon: <IconLocation />,
    text: '지도',
    path: NavigationPathname.Map,
  },
  {
    icon: <IconProfile />,
    text: '마이',
    path: NavigationPathname.MyPage,
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