'use client';

import { UserContext } from '@/contexts/UserContext';
import IconChevronDown from '@repo/design-system/components/icons/IconChevronDown';
import type { Mate } from "@repo/entity/src/mate";
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import Image from 'next/image';
import { useContext, useState } from 'react';

import defaultMaleProfileImage from '@/assets/images/image-default-male-profile.png';
import defaultFemaleProfileImage from '@/assets/images/image-default-female-profile.png';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import Modal from '@repo/design-system/components/Modal';
import { Button } from '@repo/ui/components/button';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
});

interface Props {
  waitList: Mate[];
}

export default function CurrentApplyList({ waitList }: Props) {
  const { push, pop } = useContext(PortalContext);
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickReceive = async (mate: Mate) => {
    if (!user) {
      throw new Error('user is not set');
    }

    const closeModal = () => {
      pop('modal');
    }

    const handleAccept = async () => {
      await mateService.acceptMyTeamMember({
        creatorUserId: user.id,
        userId: mate.userId,
        mateId: mate.id,
      });
      closeModal();
    }


    push('modal', {
      component: (
        <Modal
          buttons={
            <>
              <Button
                className="w-full py-3 text-white text-center rounded-[100px] transition-colors bg-[#FFB700] hover:bg-[#FFB700]/90"
                onClick={handleAccept}
              >
                수락하기
              </Button>
              <Button
                className="w-full py-3 text-white text-center rounded-[100px] transition-colors bg-[#898989] hover:bg-[#898989]/90"
                onClick={closeModal}
              >
                돌아가기
              </Button>
            </>
            
          }
          visible={true}
          title="참여 요청을 수락하시겠어요?"
          onClose={closeModal}
        />
      ),
    });

  }

  const handleClickReject = async (mate: Mate) => {
    if (!user) {
      throw new Error('user is not set');
    }

    const closeModal = () => {
      pop('modal');
    }

    const handleReject = async () => {
      await mateService.rejectMyTeamMember({
        creatorUserId: user.id,
        userId: mate.userId,
        mateId: mate.id,
      });
      closeModal();
    }

    push('modal', {
      component: (
        <Modal
          buttons={
            <>
              <Button
                className="w-full py-3 text-white text-center rounded-[100px] font-medium transition-colors bg-[#FFB700] hover:bg-[#FFB700]/90"
                onClick={handleReject}
              >
                거절하기
              </Button>
              <Button
                className="w-full py-3 text-white text-center rounded-[100px] font-medium transition-colors bg-[#898989] hover:bg-[#898989]/90"
                onClick={closeModal}
              >
                돌아가기
              </Button>
            </>
          }
          visible={true}
          title="참여 요청을 거절하시겠어요?"
          onClose={closeModal}
        />
      ),
    });
  }

  const defaultProfileImage = (waitMate: Mate) => {
    return waitMate.gender === 'MALE' ? defaultMaleProfileImage : defaultFemaleProfileImage;
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
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-2">
              <Image
                src={!!wait.profileImage ? wait.profileImage : defaultProfileImage(wait)}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-[#393939] text-[10px] font-semibold leading-normal tracking-[-0.24px]">{wait.nickname}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-1 text-[10px] text-white bg-[#F5B01C] rounded-full"
                onClick={() => handleClickReceive(wait)}
              >
                수락
              </button>
              <button
                className="px-4 py-1 text-[10px] text-white bg-[#CD7F32] rounded-full"
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
