'use client';

import { UserContext } from "@/contexts/UserContext";
import ReviewService from "@repo/usecase/src/reviewService";
import ReviewAPIRepository from "@repo/infrastructures/src/repositories/reviewAPIRepository";
import { useCallback, useContext, useState } from "react";
import { IconSize } from "@repo/design-system/components/icons";
import IconBookmark from "@repo/design-system/components/icons/IconBookmark";
import IconButton from "@repo/design-system/components/buttons/IconButton";

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
});

interface Props {
  reviewId: string;
}

export default function CommunityReviewBookmarkButton({ reviewId }: Props) {
  const { user } = useContext(UserContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsBookmarked((prev) => !prev);
    // api
    if (!isBookmarked) {
      // await reviewService.save({ id: reviewId, userId: user.id });
    } else {
      // await reviewService.cancelSave({ id: reviewId, userId: user.id });
    }
  }, [isBookmarked, user, reviewId]);

  return (
    <IconButton size={IconSize.s} className={isBookmarked ? 'text-[#714115]' : 'text-white'} onClick={handleClick}>
      <IconBookmark />
    </IconButton>
  )
}