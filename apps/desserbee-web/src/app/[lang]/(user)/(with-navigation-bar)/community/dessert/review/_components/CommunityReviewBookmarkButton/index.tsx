'use client';

import { UserContext } from '@/contexts/UserContext';
import { useCallback, useContext, useState } from 'react';
import { IconSize } from '@repo/design-system/components/icons';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import IconButton from '@repo/design-system/components/buttons/IconButton';
import { cancelSave, saveReview } from './action';

interface Props {
  saved: boolean;
  reviewId: string;
}

export default function CommunityReviewBookmarkButton({
  saved,
  reviewId,
}: Props) {
  const { user } = useContext(UserContext);
  const [isBookmarked, setIsBookmarked] = useState(saved);

  const handleClick = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsBookmarked((prev) => !prev);
    // api
    if (!isBookmarked) {
      await saveReview({ reviewUuid: reviewId });
    } else {
      await cancelSave({ reviewUuid: reviewId });
    }
  }, [isBookmarked, user, reviewId]);

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
