'use client';

import IconButton from '@repo/design-system/components/buttons/IconButton';
import { IconSize } from '@repo/design-system/components/icons';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import { useCallback, useState } from 'react';

// const 

export default function CommunityMateCardHeartButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = useCallback(() => {
    setIsBookmarked(!isBookmarked);
    // api
  }, [isBookmarked]);
  
  return (
    <IconButton size={IconSize.s} className={isBookmarked ? 'text-[#714115]' : 'text-white'} onClick={handleClick}>
      <IconBookmark />
    </IconButton>
  )
}