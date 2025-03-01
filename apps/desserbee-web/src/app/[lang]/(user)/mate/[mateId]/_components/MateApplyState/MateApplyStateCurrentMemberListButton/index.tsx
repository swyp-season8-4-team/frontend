'use client';

import type { Mate } from "@repo/entity/src/mate";

import defaultMaleProfileImage from "@/assets/images/image-default-male-profile.png";
import defaultFemaleProfileImage from "@/assets/images/image-default-female-profile.png";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Image from "next/image";
import { MateDetailContext } from "../../../_contexts/MateDetailContext";

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
});

interface Props {
  myTeamMembers: Mate[];
}

export default function MateApplyStateCurrentMemberListButton({ myTeamMembers }: Props) {
  const { user } = useContext(UserContext);
  const { mate } = useContext(MateDetailContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const defaultProfileImage = (member: Mate) => {
    return member.gender === 'MALE' ? defaultMaleProfileImage : defaultFemaleProfileImage;
  }

  const handleKickMember = async (member: Mate) => {
    if (!user) {
      return;
    }

    await mateService.fireMyTeamMember({
      userId: member.userId,
      mateId: mate.id,
      creatorId: user?.id,
    });
  }

  return (
    <div className="relative" ref={tooltipRef}>
      <button 
        className="px-4 py-1 text-sm text-center text-white bg-[#F5B01C] rounded-full cursor-pointer"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        참여 인원
      </button>
      
      {showTooltip && (
        <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-md p-3 w-64 right-0">
          
          <div className="max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {myTeamMembers.length > 0 ? (
              myTeamMembers.map((myTeamMember) => (
                <div key={myTeamMember.id} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2 w-full">
                    <Image
                      src={!!myTeamMember.profileImage ? myTeamMember.profileImage : defaultProfileImage(myTeamMember)}
                      alt={myTeamMember.nickname}
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8"
                    />
                    <span className="text-[#393939] text-[10px] font-normal leading-[130%] tracking-[-0.3px]">
                      {myTeamMember.nickname}
                    </span>
                  </div>
                  <button
                    className="bg-[#9F9F9F] rounded-[29.663px] w-[54.382px] h-[20.27px] text-white text-[10px] font-normal font-weight-600 leading-[130%] tracking-[-0.27px]"
                    onClick={() => handleKickMember(myTeamMember)}
                  >
                    강퇴하기
                  </button> 
                </div>
                
              ))
            ) : (
              <div className="text-gray-500 text-[10px] py-2">참여 인원이 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}