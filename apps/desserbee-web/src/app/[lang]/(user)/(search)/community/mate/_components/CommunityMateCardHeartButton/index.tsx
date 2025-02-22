'use client';

import IconButton from '@repo/design-system/components/buttons/IconButton';
import IconHeart from '@repo/design-system/components/icons/IconHeart';
import { useCallback } from 'react';

export default function CommunityMateCardHeartButton() {
  
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  
  return (
    <IconButton onClick={handleClick}>
      <IconHeart />
    </IconButton>
  )
}