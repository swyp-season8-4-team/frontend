'use client';

import { UserContext } from '@/contexts/UserContext';
import IconButton from '@repo/design-system/components/buttons/IconButton';
import { IconSize } from '@repo/design-system/components/icons';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { useCallback, useContext, useState } from 'react';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
})

interface Props {
  mateId: string;
}

export default function CommunityMateCardHeartButton({ mateId }: Props) {
  const { user } = useContext(UserContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsBookmarked((prev) => !prev);
    // api
    if (!isBookmarked) {
      await mateService.save({ id: mateId, userId: user.id });
    } else {
      await mateService.cancelSave({ id: mateId, userId: user.id });
    }
    
  }, [isBookmarked, mateId, user]);
  
  return (
    <IconButton size={IconSize.s} className={isBookmarked ? 'text-[#714115]' : 'text-white'} onClick={handleClick}>
      <IconBookmark />
    </IconButton>
  )
}