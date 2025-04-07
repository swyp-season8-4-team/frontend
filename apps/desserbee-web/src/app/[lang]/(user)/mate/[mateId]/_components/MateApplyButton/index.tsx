'use client';

import { Button } from '@repo/ui/components/button';
import { MateDetailContext } from '../../_contexts/MateDetailContext';
import { useContext, useMemo, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { applyMate, cancelApplyMate } from './action';
import { cn } from '@repo/ui/lib/utils';

export default function MateApplyButton() {
  const { user } = useContext(UserContext);
  const { mate, updateMateStatus } = useContext(MateDetailContext);

  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);

      if (mate.applyStatus === 'NONE') {
        const result = await applyMate(mate.id, user.id);
        if (result.success) {
          updateMateStatus('PENDING');
        } else {
          console.error('Failed to apply mate');
        }
      } else if (mate.applyStatus === 'PENDING') {
        const result = await cancelApplyMate(mate.id, user.id);
        if (result.success) {
          updateMateStatus('NONE');
        } else {
          console.error('Failed to cancel apply mate');
        }
      }
    } finally {
      setLoading(false);
    }
  };

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

  const isDisabled =
    !mate.recruit ||
    mate.applyStatus === 'APPROVED' ||
    mate.applyStatus === 'REJECTED';

  return (
    <Button
      className={cn(
        'rounded-full px-4 py-1 text-center text-sm text-white',
        mate.recruit ? 'bg-[#F5B01C]' : 'cursor-not-allowed bg-[#545454]',
      )}
      isLoading={isLoading}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {mate.recruit ? text : '모집완료'}
    </Button>
  );
}
