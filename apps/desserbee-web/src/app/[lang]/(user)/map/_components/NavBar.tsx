'use client';

import { useState } from 'react';
import { NavBarBtn } from './NavBarBtn';
import { NavBarMapIcon } from './NavBarMapIcon';
import { NavBarCommunityIcon } from './NavBarCommunityIcon';
import { NavBarMyPageIcon } from './NavBarMyPageIcon';

const NAVBAR_BUTTON_CONTENT = [
  { icon: (isSelected?: boolean) => <NavBarCommunityIcon isSelected={isSelected} />, text: '커뮤니티' },
  { icon: (isSelected?: boolean) => <NavBarMapIcon isSelected={isSelected} />, text: '지도' },
  { icon: (isSelected?: boolean) => <NavBarMyPageIcon isSelected={isSelected} />, text: '마이' },
];

export function NavBar() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleNavBarBtnClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex justify-center w-full">
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
