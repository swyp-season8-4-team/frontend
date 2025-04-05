'use client';

import type { Mate } from '@repo/entity/src/mate';

import defaultMaleProfileImage from '@/assets/images/image-default-male-profile.png';
import defaultFemaleProfileImage from '@/assets/images/image-default-female-profile.png';
import { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import { MateDetailContext } from '../../../_contexts/MateDetailContext';
import { kickMember } from './action';

interface Props {
  myTeamMembers: Mate[];
}

export default function MateApplyStateCurrentMemberListButton({
  myTeamMembers,
}: Props) {
  const { user } = useContext(UserContext);
  const { mate } = useContext(MateDetailContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const defaultProfileImage = (member: Mate) => {
    return member.gender === 'MALE'
      ? defaultMaleProfileImage
      : defaultFemaleProfileImage;
  };

  const handleKickMember = async (member: Mate) => {
    if (!user) {
      return;
    }

    const result = await kickMember({
      userId: member.userId,
      mateId: mate.id,
      creatorId: user.id,
    });

    if (!result.success) {
      console.error('Failed to kick member');
    }
  };

  return (
    <div className="relative" ref={tooltipRef}>
      <button
        className="cursor-pointer rounded-full bg-[#F5B01C] px-4 py-1 text-center text-sm text-white"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        참여 인원
      </button>

      {showTooltip && (
        <div className="absolute right-0 z-10 mt-2 w-64 rounded-lg bg-white p-3 shadow-md">
          <div className="max-h-60 overflow-y-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
            {myTeamMembers.length > 0 ? (
              myTeamMembers.map((myTeamMember) => (
                <div
                  key={myTeamMember.id}
                  className="flex items-center gap-2 border-b border-gray-100 py-2 last:border-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <Image
                      src={
                        !!myTeamMember.profileImage
                          ? myTeamMember.profileImage
                          : defaultProfileImage(myTeamMember)
                      }
                      alt={myTeamMember.nickname}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-[10px] font-normal leading-[130%] tracking-[-0.3px] text-[#393939]">
                      {myTeamMember.nickname}
                    </span>
                  </div>
                  <button
                    className="font-weight-600 h-[20.27px] w-[54.382px] rounded-[29.663px] bg-[#9F9F9F] text-[10px] font-normal leading-[130%] tracking-[-0.27px] text-white"
                    onClick={() => handleKickMember(myTeamMember)}
                  >
                    강퇴하기
                  </button>
                </div>
              ))
            ) : (
              <div className="py-2 text-[10px] text-gray-500">
                참여 인원이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
