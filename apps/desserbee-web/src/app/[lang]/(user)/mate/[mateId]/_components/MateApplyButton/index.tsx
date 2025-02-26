'use client';

import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import { Button } from "@repo/ui/components/button";
import MateService from "@repo/usecase/src/mateService";
import { MateDetailContext } from "../../_contexts/MateDetailContext";
import { useContext } from "react";

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
});

interface Props {
  mateId: string;
}

export default function MateApplyButton() {
  const { mate } = useContext(MateDetailContext);

  const handleClick = async () => {
    await mateService.applyMate({ mateId: mate.id, userId: mate.userId })
  }

  return (
    <Button
      className="px-4 py-1 text-sm text-center text-white bg-[#F5B01C] rounded-full"
      onClick={handleClick}
    >
      참여하기
    </Button>
  )
}