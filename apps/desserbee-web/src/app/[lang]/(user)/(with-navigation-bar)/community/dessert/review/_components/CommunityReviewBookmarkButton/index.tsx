'use client';

import { UserContext } from '@/contexts/UserContext';
import { useCallback, useContext, useState } from 'react';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import { cancelSave, saveReview } from './action';
import { cn } from '@repo/ui/lib/utils';

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

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

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
    },
    [isBookmarked, user, reviewId],
  );

  return (
    <button onClick={handleClick}>
      <div className="h-3 w-3 md:h-4 md:w-4">
        <IconBookmark
          className={cn(
            'h-full w-full',
            isBookmarked ? 'text-primary-80' : 'text-neutral-40',
          )}
        />
      </div>
    </button>
  );
}
