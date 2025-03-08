'use client';

import type { Review } from "@repo/entity/src/review";
import ReviewAPIRepository from "@repo/infrastructures/src/repositories/reviewAPIRepository";
import ReviewService from "@repo/usecase/src/reviewService";
import type { WithChildren } from "@repo/ui";
import { createContext, useCallback, useState } from "react";
import type { SearchMessageData } from "@/types/postMessage";
import { SearchMessageAction } from "@/types/postMessage";
import type { CommunityDessertReviewCategory } from "@repo/entity/src/community";

interface State {
  reviews: Review[];
  isLast: boolean;
  loadMore: () => Promise<void>;
}

const defaultState: State = {
  reviews: [],
  isLast: false,
  loadMore: async () => {},
};
export const CommunityReviewListContext = createContext<State>(defaultState);

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
});

interface Props extends WithChildren {
  initialIsLast: boolean;
  initialReviews: Review[];
}

export const CommunityReviewListProvider = ({ children, initialIsLast, initialReviews }: Props) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLast, setIsLast] = useState(initialIsLast);
  const [page, setPage] = useState(10);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CommunityDessertReviewCategory | null>(null);

  const loadMore = useCallback(async () => {
    if (isLast) {
      return;
    }
    
    
  }, [isLast]);

  const messageReceiveHandler = useCallback(async ({ action, payload }: SearchMessageData) => {
    if (action === SearchMessageAction.GetCategories) {
      // const response = await reviewService.getReviewList({
      //   ...(payload?.selectedCategory && { from: 0, to: page }),
      //   reviewCategoryId: payload?.selectedCategory
      // });
    }
  }, []);

  return (
    <CommunityReviewListContext.Provider value={{
      reviews,
      isLast,
      loadMore,
    }}>
      {children}
    </CommunityReviewListContext.Provider>
  )
  

}