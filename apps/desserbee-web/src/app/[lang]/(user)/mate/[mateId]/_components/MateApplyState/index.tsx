'use client';

import { UserContext } from "@/contexts/UserContext";
import type { Mate } from "@repo/entity/src/mate";
import { useContext } from "react";
import MateApplyButton from "../MateApplyButton";

import { MateDetailContext } from "../../_contexts/MateDetailContext";
import MateApplyStateCurrentMemberListButton from "./MateApplyStateCurrentMemberListButton";

interface Props {
  myTeamMembers: Mate[];
}

export default function MateApplyState({ myTeamMembers }: Props) {
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
    <MateApplyStateCurrentMemberListButton myTeamMembers={myTeamMembers} />
  )
}