'use client';

import { UserContext } from '@/contexts/UserContext';
import IconChevronDown from '@repo/design-system/components/icons/IconChevronDown';
import type { Mate } from '@repo/entity/src/mate';
import Image from 'next/image';
import { useContext, useState } from 'react';

import defaultMaleProfileImage from '@/assets/images/image-default-male-profile.png';
import defaultFemaleProfileImage from '@/assets/images/image-default-female-profile.png';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import Modal from '@repo/design-system/components/Modal';
import { Button } from '@repo/ui/components/button';
import { MateDetailContext } from '../../_contexts/MateDetailContext';
import { acceptMateRequest, rejectMateRequest } from './action';

interface Props {
  waitList: Mate[];
}

export default function CurrentApplyList({ waitList }: Props) {
  const { mate: ownerMate } = useContext(MateDetailContext);
  const { push, pop } = useContext(PortalContext);
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickReceive = async (mate: Mate) => {
    if (!user) {
      throw new Error('user is not set');
    }

    const closeModal = () => {
      pop('modal');
    };

    const handleAccept = async () => {
      const result = await acceptMateRequest({
        creatorUserId: user.id,
        userId: mate.userId,
        mateId: ownerMate.id,
      });

      if (result.success) {
        closeModal();
      } else {
        console.error('Failed to accept mate request');
      }
    };

    push('modal', {
      component: (
        <Modal
          buttons={
            <>
              <Button
                className="w-full rounded-[100px] bg-[#FFB700] py-3 text-center text-white transition-colors hover:bg-[#FFB700]/90"
                onClick={handleAccept}
              >
                수락하기
              </Button>
              <Button
                className="w-full rounded-[100px] bg-[#898989] py-3 text-center text-white transition-colors hover:bg-[#898989]/90"
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
  };

  const handleClickReject = async (mate: Mate) => {
    if (!user) {
      throw new Error('user is not set');
    }

    const closeModal = () => {
      pop('modal');
    };

    const handleReject = async () => {
      const result = await rejectMateRequest({
        creatorUserId: user.id,
        userId: mate.userId,
        mateId: ownerMate.id,
      });

      if (result.success) {
        closeModal();
      } else {
        console.error('Failed to reject mate request');
      }
    };

    push('modal', {
      component: (
        <Modal
          buttons={
            <>
              <Button
                className="w-full rounded-[100px] bg-[#FFB700] py-3 text-center font-medium text-white transition-colors hover:bg-[#FFB700]/90"
                onClick={handleReject}
              >
                거절하기
              </Button>
              <Button
                className="w-full rounded-[100px] bg-[#898989] py-3 text-center font-medium text-white transition-colors hover:bg-[#898989]/90"
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
  };

  const defaultProfileImage = (waitMate: Mate) => {
    return waitMate.gender === 'MALE'
      ? defaultMaleProfileImage
      : defaultFemaleProfileImage;
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-between py-4"
        onClick={handleClick}
      >
        <span className="font-semibold">요청 현황</span>
        <IconChevronDown
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-[-90deg]' : ''
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {waitList.map((wait) => (
          <div key={wait.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Image
                src={
                  wait.profileImage
                    ? wait.profileImage
                    : defaultProfileImage(wait)
                }
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-[10px] font-semibold leading-normal tracking-[-0.24px] text-[#393939]">
                {wait.nickname}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-full bg-[#F5B01C] px-4 py-1 text-[10px] text-white"
                onClick={() => handleClickReceive(wait)}
              >
                수락
              </button>
              <button
                className="rounded-full bg-[#CD7F32] px-4 py-1 text-[10px] text-white"
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
