'use client';

import { useState } from 'react';
import type { Mate } from "@repo/entity/src/mate";
import Image from 'next/image';

interface Props {
  waitList: Mate[];
}

export default function CurrentApplyList({ waitList }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <div 
        className="flex items-center justify-between py-4 cursor-pointer" 
        onClick={handleClick}
      >
        <span className="font-semibold">요청 현황</span>
        <button 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▲
        </button>
      </div>

      <div 
        className={`transition-all duration-200 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {waitList.map((wait) => (
          <div 
            key={wait.id} 
            className="flex items-center justify-between py-3 border-t border-gray-100"
          >
            <div className="flex items-center gap-2">
              <Image
                src={wait.profileImage || "/default-avatar.png"}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium">{wait.nickname}</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1 text-sm text-white bg-[#F5B01C] rounded-full">
                수락
              </button>
              <button className="px-4 py-1 text-sm text-white bg-[#CD7F32] rounded-full">
                거절
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
