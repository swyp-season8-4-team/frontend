'use client';

import { UserContext } from '@/contexts/UserContext';
import IconButton from '@repo/design-system/components/buttons/IconButton';
import { IconSize } from '@repo/design-system/components/icons';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import { useCallback, useContext, useState } from 'react';
import { saveMateBookmark, cancelMateBookmark } from './action';

interface Props {
  mateId: string;
}

export default function CommunityMateCardBookmarkButton({ mateId }: Props) {
  const { user } = useContext(UserContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!user) {
        return;
      }

      setIsBookmarked((prev) => !prev);

      const result = !isBookmarked
        ? await saveMateBookmark({ id: mateId, userId: user.id })
        : await cancelMateBookmark({ id: mateId, userId: user.id });

      if (!result.success) {
        // 실패 시 상태 되돌리기
        setIsBookmarked((prev) => !prev);
        console.error('Failed to update bookmark');
      }
    },
    [isBookmarked, mateId, user],
  );

  return (
    <IconButton
      size={IconSize.s}
      className={isBookmarked ? 'text-[#714115]' : 'text-white'}
      onClick={handleClick}
    >
      <IconBookmark />
    </IconButton>
  );
}
