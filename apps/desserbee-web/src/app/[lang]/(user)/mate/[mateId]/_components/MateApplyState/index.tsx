'use client';

import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import MateApplyButton from "../MateApplyButton";
import { MateDetailContext } from "../../_contexts/MateDetailContext";


export default function MateApplyState() {
  const { user } = useContext(UserContext);
  const { mate } = useContext(MateDetailContext);

  if (!mate) {
    return null;
  }

  if (user?.id !== mate?.userId) {
    return (
      <MateApplyButton />
    )
  }

  return (
    <span className="px-4 py-1 text-sm text-center text-white bg-[#F5B01C] rounded-full">참여 인원</span>
  );
}