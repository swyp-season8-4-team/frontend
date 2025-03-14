'use client';

import type { ReviewReply } from '@repo/entity/src/review';
import type { WithChildren } from '@repo/ui';
import { createContext, useCallback, useState } from 'react';

interface State {
  replyList: ReviewReply[];
  isLast: boolean;
  sortLatestReplyList: () => void;
  sortRegisterReplyList: () => void;
}

const defaultState: State = {
  replyList: [],
  isLast: false,
  sortLatestReplyList: () => {},
  sortRegisterReplyList: () => {},
};

export const ReviewReplyContext = createContext<State>(defaultState);

export type FilterMenu = 'latest' | 'register';

interface Props extends WithChildren {
  initialReplyList: ReviewReply[];
  initialIsLast: boolean;
  initialCounts: number;
}

export const ReviewReplyProvider = ({
  children,
  initialReplyList,
  initialIsLast,
  initialCounts,
}: Props) => {
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<FilterMenu>('register');
  const [replyList, setReplyList] = useState<ReviewReply[]>(initialReplyList);
  const [isLast, setLast] = useState<boolean>(initialIsLast);
  const [counts, setCounts] = useState<number>(initialCounts);

  const sortLatestReplyList = useCallback(() => {
    const sortedReplyList = replyList.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    setReplyList(sortedReplyList);
  }, [replyList]);

  const sortRegisterReplyList = useCallback(() => {
    const sortedReplyList = replyList.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    setReplyList(sortedReplyList);
  }, [replyList]);

  return (
    <ReviewReplyContext.Provider
      value={{ replyList, isLast, sortLatestReplyList, sortRegisterReplyList }}
    >
      {children}
    </ReviewReplyContext.Provider>
  );
};
