'use client';

import type { TargetUser } from '@repo/entity/src/user';
import type { WithChildren } from '@repo/ui';
import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';

import signupIllustQuestion1 from '../../_assets/images/signup-illust-question1.png';
import signupIllustQuestion2 from '../../_assets/images/signup-illust-question2.png';
import signupIllustQuestion3 from '../../_assets/images/signup-illust-question3.png';
import signupIllustQuestion4 from '../../_assets/images/signup-illust-question4.png';
import signupIllustQuestion5 from '../../_assets/images/signup-illust-question5.png';
import signupIllustQuestion6 from '../../_assets/images/signup-illust-question6.png';
import signupIllustQuestion7 from '../../_assets/images/signup-illust-question7.png';
import signupIllustQuestion8 from '../../_assets/images/signup-illust-question8.png';
import signupIllustQuestion9 from '../../_assets/images/signup-illust-question9.png';
import signupIllustQuestion10 from '../../_assets/images/signup-illust-question10.png';

type CurrentSignUpQuestionType = 'none' | 'complete' | number | null;

interface State {
  id: string;
  nickname: string;
  qnaList: PreferencesQuestion[];
  noneMBTI: PreferencesQuestion;
  currentQuestion: CurrentSignUpQuestionType;
  preferences: number[];
  updateCurrentQuestion: (stage: CurrentSignUpQuestionType) => void;
  addPreference: (preference: number) => void;
}

const defaultState: State = {
  id: '',
  nickname: '',
  qnaList: [],
  noneMBTI: { question: '', answerA: '' },
  currentQuestion: null,
  preferences: [],
  updateCurrentQuestion: () => {},
  addPreference: () => {},
};

export const PreferencesContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  user: TargetUser | null;
}

interface PreferencesQuestion {
  question: ReactNode | string;
  answerA: string;
  answerB?: string;
  illust?: string;
}

export function PreferencesProvider({ children, user: initialUser }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentSignUpQuestionType>(null);

  const [preferences, setPreferences] = useState<number[]>([]);

  const addPreference = useCallback((preference: number) => {
    setPreferences((prev) => [...prev, preference]);
  }, []);

  const updateCurrentQuestion = useCallback((stage: CurrentSignUpQuestionType) => {
    setCurrentQuestion(stage);
  }, []);

  const noneMBTI: PreferencesQuestion = useMemo(() => ({
    question: <>정말 나중에 설정하시겠어요?<br /><br />선택한 취향은 마이페이지에서<br />언제든 변경할 수 있어요!</>,
    answerA: '네 다음에 할께요',
    answerB: '아뇨, 지금 할래요.',
  }), []);

  const qnaList: PreferencesQuestion[] = useMemo(() => [
    {
      question: <>Q1. 우유, 계란 없이도 맛있는 디저트가 가능할까요?<br />비건 디저트 어때요?</>,
      answerA: '비건 디저트 좋아요',
      answerB: '비건 디저트 별로예요',
      illust: signupIllustQuestion1.src,
    },
    {
      question: <>Q2. 밀가루 없이도 쫀득한 글루텐 프리 디저트는 어때요?</>,
      answerA: '글루텐 프리 디저트 좋아요',
      answerB: '글루텐 프리 디저트 별로예요',
      illust: signupIllustQuestion2.src,
    },
    {
      question: <>Q3. 한국인의 약 75%는 유당불내증이에요.<br />혹시 우유를 먹으면 속이 불편한가요?</>,
      answerA: '유당불내증이 있어요',
      answerB: '유당불내증이 없어요',
      illust: signupIllustQuestion3.src,
    },
    {
      question: <>Q4. 요즘은 제로가 대세인데, 이왕이면<br />더 건강한 로우슈가 제품을 고르나요?</>,
      answerA: '로우슈가 제품 좋아요',
      answerB: '로우슈가 제품 별로예요',
      illust: signupIllustQuestion4.src,
    },
    {
      question: <>Q5. 쑥,인절미,흑임자 맛과 같은<br />할매니얼한 맛을 선호하나요?</>,
      answerA: '할매니얼 좋아요',
      answerB: '할매니얼 별로예요',
      illust: signupIllustQuestion5.src,
    },
    {
      question: <>Q6. 새로운 건 뭐든 시도해보는 편인가요?</>,
      answerA: '새로운 거 좋아요',
      answerB: '새로운 거 별로예요',
      illust: signupIllustQuestion6.src,
    },
    {
      question: <>Q7. 디저트 중에 알코올이 들어간 디저트는 어때요?</>,
      answerA: '알코올 디저트 좋아요',
      answerB: '알코올 디저트 별로예요',
      illust: signupIllustQuestion7.src,
    },
    {
      question: <>Q8. 특정 시즌에만 나오는 디저트를 먹는 편인가요?</>,
      answerA: '시즌 한정 디저트 좋아요',
      answerB: '시즌 한정 디저트 별로예요',
      illust: signupIllustQuestion8.src,
    },
    {
      question: <>Q9. 여행 가면 그 지역에서만 맛볼 수 있는<br />디저트를 찾아 먹는 편인가요?</>,
      answerA: '지역 특산 디저트 좋아요',
      answerB: '지역 특산 디저트 별로예요',
      illust: signupIllustQuestion9.src,
    },
    {
      question: <>Q10. 믿고 먹는 조합 같은 &apos;크로플+아이스크림&apos; 등등<br />꿀조합을 선호하는 편인가요?</>,
      answerA: '꿀조합 디저트 좋아요',
      answerB: '꿀조합 디저트 별로예요',
      illust: signupIllustQuestion10.src,
    },
  ], []);
  
  return (
    <PreferencesContext.Provider
      value={{
        id: initialUser?.userUuid ?? '',
        nickname: initialUser?.nickname ?? '',
        qnaList,
        noneMBTI,
        currentQuestion,
        preferences,
        addPreference,
        updateCurrentQuestion,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
