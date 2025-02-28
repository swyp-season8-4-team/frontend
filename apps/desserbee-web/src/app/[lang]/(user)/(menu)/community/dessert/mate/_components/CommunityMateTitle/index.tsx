'use client';

import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function CommunityMateTitle() {
  const { user } = useContext(UserContext);
  
  return (
    <h2 className="text-[#6F6F6F] text-[12px] font-semibold tracking-[-0.36px] leading-normal">
      {user?.nickname}님에게 딱 맞는 디저트 메이트를 찾아보세요!
    </h2>
  )
}
