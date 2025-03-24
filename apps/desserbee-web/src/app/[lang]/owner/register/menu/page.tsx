'use client';

import { useEffect } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';

export default function RegisterCheckPage() {
  const { completeStep, goToNextStep, redirectToStep } = useRegister();

  // 다음 단계로 이동
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    // 확인 단계 완료 표시
    completeStep(RegisterStep.MENU);

    // 내부 상태 업데이트
    goToNextStep();

    // 다음 단계로 이동
    redirectToStep(RegisterStep.CHECK);
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리 작업 (선택 사항)
    };
  }, []);

  return (
    <form onSubmit={handleNextStep} className="mx-auto max-w-md p-4">
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          다음 단계
        </button>
      </div>
    </form>
  );
}
