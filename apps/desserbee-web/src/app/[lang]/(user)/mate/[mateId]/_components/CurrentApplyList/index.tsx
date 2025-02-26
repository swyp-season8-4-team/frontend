'use client';

import { UserContext } from '@/contexts/UserContext';
import IconChevronDown from '@repo/design-system/components/icons/IconChevronDown';
import type { Mate } from "@repo/entity/src/mate";
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import Image from 'next/image';
import { useContext, useState } from 'react';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
});

interface Props {
  waitList: Mate[];
}

export default function CurrentApplyList({ waitList }: Props) {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickReceive = async (mate: Mate) => {
    if (!user) {
      throw new Error('user is not set');
    }

    await mateService.acceptMyTeamMember({
      creatorUserId: user.id,
      userId: mate.userId,
      mateId: mate.id,
    });
  }

  const handleClickReject = async (mate: Mate) => {
    if (!user) {
      throw new Error('user is not set');
    }

    await mateService.rejectMyTeamMember({
      creatorUserId: user.id,
      userId: mate.userId,
      mateId: mate.id,
    });
  }

  return (
    <>
      <div 
        className="flex items-center justify-between py-4 cursor-pointer" 
        onClick={handleClick}
      >
        <span className="font-semibold">요청 현황</span>
        <IconChevronDown className={`transform transition-transform duration-200 ${isOpen ? 'rotate-[-90deg]' : ''}`} />
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
              <button
                className="px-4 py-1 text-sm text-white bg-[#F5B01C] rounded-full"
                onClick={() => handleClickReceive(wait)}
              >
                수락
              </button>
              <button
                className="px-4 py-1 text-sm text-white bg-[#CD7F32] rounded-full"
                onClick={() => handleClickReject(wait)}
              >
                거절
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
