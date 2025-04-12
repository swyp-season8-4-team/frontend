'use client';

import { UserContext } from '@/contexts/UserContext';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark2';
import { useCallback, useContext, useState } from 'react';
import { saveMateBookmark, cancelMateBookmark } from './action';
import { cn } from '@repo/ui/lib/utils';

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
