'use client';

import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { useEffect, useMemo } from 'react';

export default function StepIndicator2() {
  const { setCurrentStep, getCurrentStepFromPath } = useRegister();
  const actualCurrentStep = getCurrentStepFromPath();

  const steps = useMemo(
    () => [RegisterStep.BASIC_INFO, RegisterStep.MENU, RegisterStep.COMPLETE],
    [],
  );

  useEffect(() => {
    setCurrentStep(actualCurrentStep);
  }, [actualCurrentStep, setCurrentStep]);

  // 진행률 계산 - 현재 단계 기준
  const calculateProgress = () => {
    const currentStepIndex = steps.indexOf(actualCurrentStep);
    return ((currentStepIndex + 1) / steps.length) * 100;
  };

  // 현재 단계 계산 (1부터 시작)
  const currentStep = steps.indexOf(actualCurrentStep) + 1;

  return (
    <div className="px-base w-full py-[14px]">
      <div className="relative mx-auto">
        {/* 프로그레스 바 컨테이너 */}
        <div className="mb-[10px] h-[7px] w-full rounded-[99px] bg-[#CBCBCB]">
          {/* 진행률 표시 */}
          <div
            className="h-full rounded-[99px] bg-[#6C6C6C] transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        {/* 단계 인디케이터 */}
        <div className="flex w-full justify-end text-sm font-medium text-[#7B7B7B]">
          <span className="">{currentStep}</span>
          <span className="">/</span>
          <span>{steps.length}</span>
        </div>
      </div>
    </div>
  );
}
