'use client';

import { useState } from 'react';
import { NavBarBtn } from './NavBarBtn';
import { cn } from '@repo/ui/lib/utils';

import IconTalk from './icons/IconTalk';
import IconLocation from './icons/IconLocation';
import IconProfile from './icons/IconProfile';

const ICON_CLASS_NAME = (isSelected?: boolean) =>
  cn(isSelected ? 'text-primary' : 'text-[#cecece]');

const NAVBAR_BUTTON_CONTENT = [
  {
    icon: (isSelected?: boolean) => (
      <IconTalk className={ICON_CLASS_NAME(isSelected)} />
    ),
    text: '커뮤니티',
  },
  {
    icon: (isSelected?: boolean) => (
      <IconLocation className={ICON_CLASS_NAME(isSelected)} />
    ),
    text: '지도',
  },
  {
    icon: (isSelected?: boolean) => (
      <IconProfile className={ICON_CLASS_NAME(isSelected)} />
    ),
    text: '마이',
  },
];

export function NavBar() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleNavBarBtnClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex justify-center bg-transparent w-full">
      <div className="flex justify-around bg-white shadow-base mx-[144px] mb-[15px] rounded-[100px] w-full min-w-[480px] h-[72px]">
        {NAVBAR_BUTTON_CONTENT.map((content, index) => (
          <NavBarBtn
            icon={content.icon}
            text={content.text}
            key={content.text}
            isSelected={selectedIndex === index}
            onClick={() => handleNavBarBtnClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
