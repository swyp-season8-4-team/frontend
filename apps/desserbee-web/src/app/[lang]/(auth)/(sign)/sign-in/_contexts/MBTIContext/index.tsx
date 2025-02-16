'use client';

import type { TargetUser, User } from '@repo/entity/src/user';
import type { WithChildren } from '@repo/ui';
import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';

interface State {
  id: string;
  nickname: string;
  qnaList: MBTIQuestion[];
  currentQuestionNumber: number | null;
  updateCurrentQuestionNumber: (stage: number | null) => void;
}

const defaultState: State = {
  id: '',
  nickname: '',
  qnaList: [],
  currentQuestionNumber: null,
  updateCurrentQuestionNumber: () => {},
};

export const MBTIContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  user: TargetUser | null;
}

interface MBTIQuestion {
  question: ReactNode | string;
  answerA: string;
  answerB?: string;
}

export function MBTIProvider({ children, user: initialUser }: Props) {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number | null>(null);

  const qnaList: MBTIQuestion[] = useMemo(() => [
    {
      question: `지금부터 ${initialUser?.nickname}님의 취향을 알아볼까요?`,
      answerA: '벌MBTI 알아보기',
    },
    {
      question: <>Q1. 우유, 계란 없이도 맛있는 디저트가 가능할까요?<br />비건 디저트 어때요?</>,
      answerA: '비건 디저트 좋아요',
      answerB: '비건 디저트 별로예요',
    },
    {
      question: <>Q2. 밀가루 없이도 쫀득한 글루텐 프리 디저트는 어때요?</>,
      answerA: '글루텐 프리 디저트 좋아요',
      answerB: '글루텐 프리 디저트 별로예요',
    },
    {
      question: <>Q3. 한국인의 약 75%는 유당불내증이에요.<br />혹시 우유를 먹으면 속이 불편한가요?</>,
      answerA: '유당불내증이 있어요',
      answerB: '유당불내증이 없어요',
    },
    {
      question: <>Q4. 요즘은 제로가 대세인데, 이왕이면<br />더 건강한 로우슈가 제품을 고르나요?</>,
      answerA: '로우슈가 제품 좋아요',
      answerB: '로우슈가 제품 별로예요',
    },
    {
      question: <>Q5. 쑥,인절미,흑임자 맛과 같은<br />할매니얼한 맛을 선호하나요?</>,
      answerA: '할매니얼 좋아요',
      answerB: '할매니얼 별로예요',
    },
    {
      question: <>Q6. 새로운 건 뭐든 시도해보는 편인가요?</>,
      answerA: '새로운 거 좋아요',
      answerB: '새로운 거 별로예요',
    },
    {
      question: <>Q7. 디저트 중에 알코올이 들어간 디저트는 어때요?</>,
      answerA: '알코올 디저트 좋아요',
      answerB: '알코올 디저트 별로예요',
    },
    {
      question: <>Q8. 특정 시즌에만 나오는 디저트를 먹는 편인가요?</>,
      answerA: '시즌 한정 디저트 좋아요',
      answerB: '시즌 한정 디저트 별로예요',
    },
    {
      question: <>Q9. 여행 가면 그 지역에서만 맛볼 수 있는<br />디저트를 찾아 먹는 편인가요?</>,
      answerA: '지역 특산 디저트 좋아요',
      answerB: '지역 특산 디저트 별로예요',
    },
    {
      question: <>Q10. 믿고 먹는 조합 같은 &apos;크로플+아이스크림&apos; 등등<br />꿀조합을 선호하는 편인가요?</>,
      answerA: '꿀조합 디저트 좋아요',
      answerB: '꿀조합 디저트 별로예요',
    },
  ], [initialUser?.nickname]);
  
  const updateCurrentQuestionNumber = (stage: number | null) => {
    setCurrentQuestionNumber(stage);
  };
  
  return (
    <MBTIContext.Provider
      value={{
        id: initialUser?.userUuid ?? '',
        nickname: initialUser?.nickname ?? '',
        qnaList,
        currentQuestionNumber,
        updateCurrentQuestionNumber,
      }}
    >
      {children}
    </MBTIContext.Provider>
  );
}
