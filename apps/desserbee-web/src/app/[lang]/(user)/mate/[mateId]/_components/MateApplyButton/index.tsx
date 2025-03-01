'use client';

import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import { Button } from "@repo/ui/components/button";
import MateService from "@repo/usecase/src/mateService";
import { MateDetailContext } from "../../_contexts/MateDetailContext";
import { useContext, useMemo, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
});

export default function MateApplyButton() {
  const { user } = useContext(UserContext);
  const { mate } = useContext(MateDetailContext);

  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);

      if (mate.applyStatus === 'NONE') {
        await mateService.applyMate({ mateId: mate.id, userId: user.id });
      } else if (mate.applyStatus === 'PENDING') {
        await mateService.cancelApplyMate({ mateId: mate.id, userId: user.id });
      }
    } finally {
      setLoading(false);
    }
  }

  const text = useMemo(() => {
    switch (mate.applyStatus) {
      case 'APPROVED':
        return '참여중';
      case 'NONE':
        return '참여하기';
      case 'PENDING':
        return '취소하기';
      case 'REJECTED':
        return '거절됨';
      default:
        return '';
    }
  }, [mate.applyStatus]);

  return (
    <Button
      className="px-4 py-1 text-sm text-center text-white bg-[#F5B01C] rounded-full"
      isLoading={isLoading}
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}