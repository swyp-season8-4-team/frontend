'use client';

import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';

// 단계별 제목 정의
const STEP_TITLES = {
  [RegisterStep.BASIC_INFO]: '기본정보',
  [RegisterStep.MENU]: '메뉴등록',
  // [RegisterStep.CHECK]: '내용확인', //NOTICE: 내용 확인 갑자기 없어짐(논의 안된채로..) 또 생길 수 있어서 남겨둠 (context에 주석처리되어있어서 현재 에러뜸)
  [RegisterStep.COMPLETE]: '등록완료',
};

export default function StepIndicator() {
  const {
    canAccessStep,
    isStepCompleted,
    setCurrentStep,
    getCurrentStepFromPath,
  } = useRegister();

  const actualCurrentStep = getCurrentStepFromPath();

  useEffect(() => {
    setCurrentStep(actualCurrentStep);
  }, [actualCurrentStep, setCurrentStep]);

  // 모든 단계 배열
  const steps = [
    RegisterStep.BASIC_INFO,
    RegisterStep.MENU,
    // RegisterStep.CHECK,
    RegisterStep.COMPLETE,
  ];

  return (
    <div className="w-full bg-[#F7F6F2] px-7 py-[14px]">
      <div className="relative mx-auto flex items-center justify-between">
        {/* 단계 표시 */}
        {steps.map((step, index) => {
          // 실제 현재 단계를 기준으로 활성화 상태 결정
          const isActive = step === actualCurrentStep;
          const isCompleted = isStepCompleted(step);
          const isAccessible = canAccessStep(step);
          const isLastStep = index === steps.length - 1;

          // 스타일 결정
          let circleColor = 'bg-[#ACACAC]';

          if (isCompleted || isActive) {
            circleColor = 'bg-primary'; // 완료 또는 현재 단계는 노란색
          }

          return (
            <div
              key={step}
              className="relative z-10 flex w-[25%] flex-col items-center"
            >
              {/* 연결선 - 마지막 단계가 아닌 경우에만 표시 */}
              {!isLastStep && (
                <div
                  className={cn(
                    'absolute left-[50%] -z-10 h-0 w-full border-t-2 border-dashed',
                    isCompleted ? 'border-primary' : 'border-[#CBCBCB]',
                    'top-[0.4375rem] md:top-4',
                  )}
                ></div>
              )}

              {/* 원형 인디케이터 */}
              {isAccessible ? (
                <div
                  className={cn(
                    'flex h-3.5 w-3.5 items-center justify-center rounded-full md:h-8 md:w-8',
                    circleColor,
                  )}
                >
                  {isActive && !isCompleted && (
                    <div className="aspect-square h-2 w-2 rounded-full bg-[#FFEDBE] md:h-4 md:w-4"></div>
                  )}
                  {isCompleted && (
                    <svg
                      className="h-2 w-2 text-white md:h-5 md:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    'flex h-3.5 w-3.5 items-center justify-center rounded-full md:h-8 md:w-8',
                    circleColor,
                  )}
                ></div>
              )}

              {/* 단계 제목 */}
              <span
                className={`mt-2 text-xs ${isCompleted ? 'text-[#A17300]' : 'text-[#838383]'}`}
              >
                {STEP_TITLES[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
