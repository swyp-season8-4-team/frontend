'use client';

import { commonErrorHandler } from '@/error/commonErrorHandler';
import type { SearchMessageData } from '@/types/postMessage';
import { SearchMessageAction } from '@/types/postMessage';
import type { CommunityCategory } from '@repo/entity/src/community';
import type { Review } from '@repo/entity/src/review';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import type { WithChildren } from '@repo/ui';
import useMessageEvent from '@repo/ui/hooks/useMessageEvent';
import ReviewService from '@repo/usecase/src/reviewService';
import { createContext, useCallback, useState } from 'react';

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

export const CommunityReviewListProvider = ({
  children,
  initialIsLast,
  initialReviews,
}: Props) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLast, setIsLast] = useState(initialIsLast);
  const [page, setPage] = useState(10);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategory | null>(null);

  const loadMore = useCallback(async () => {
    if (isLast) {
      return;
    }

    const response = await commonErrorHandler(
      reviewService.getAll({
        from: page,
        to: page + 9,
        ...(!!selectedCategory && { categoryId: selectedCategory }),
        ...(!!keyword && { keyword }),
      }),
    );

    setReviews((prev) => [...prev, ...response.reviews]);
    setIsLast(response.isLast);
    setPage(page + 10);
  }, [isLast, keyword, page, selectedCategory]);

  const messageReceiveHandler = useCallback(
    async ({ action, payload }: SearchMessageData) => {
      if (action === SearchMessageAction.GetCategories) {
        const response = await commonErrorHandler(
          reviewService.getAll({
            ...(payload?.selectedCategory && {
              from: 0,
              to: page,
              categoryId: payload?.selectedCategory,
            }),
          }),
        );

        if (payload?.selectedCategory) {
          setSelectedCategory(payload?.selectedCategory);
        }

        setReviews((prev) =>
          response.reviews.filter(
            (review) => !prev.some((prevReview) => prevReview.id === review.id),
          ),
        );
        setIsLast(response.isLast);
        return;
      }

      if (action === SearchMessageAction.GetSearch) {
        const response = await commonErrorHandler(
          reviewService.getAll({
            ...(payload?.keyword && {
              from: 0,
              to: page,
              keyword: payload?.keyword,
            }),
          }),
        );

        if (payload?.keyword) {
          setKeyword(payload?.keyword);
        }

        setReviews((prev) =>
          response.reviews.filter(
            (review) => !prev.some((prevReview) => prevReview.id === review.id),
          ),
        );
        setIsLast(response.isLast);
        return;
      }
    },
    [page],
  );

  useMessageEvent(messageReceiveHandler);

  return (
    <CommunityReviewListContext.Provider
      value={{
        reviews,
        isLast,
        loadMore,
      }}
    >
      {children}
    </CommunityReviewListContext.Provider>
  );
};
