'use client';

import { useEffect, useState } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';

export default function RegisterBasicInfoPage() {
  const {
    setIsFormDirty,
    updateBasicInfo,
    completeStep,
    goToNextStep,
    storeData,
  } = useRegister();
  const router = useRouter();
  const [name, setName] = useState(storeData.name || '');

  // 폼 입력 시작 시 dirty 상태로 설정
  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  // 이름 입력 처리
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    updateBasicInfo({ name: e.target.value });
  };

  // 다음 단계로 이동
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    // 기본 정보 단계 완료 표시
    completeStep(RegisterStep.BASIC_INFO);

    // 내부 상태 업데이트
    goToNextStep();

    router.push(`${NavigationPathname.OwnerRegisterMenu}`);
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리 작업 (선택 사항)
    };
  }, []);

  return (
    <form
      onSubmit={handleNextStep}
      onChange={handleInputChange}
      className="mx-auto max-w-md p-4"
    >
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block font-medium">
          가게 이름
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="w-full rounded-md border p-2"
          placeholder="가게 이름을 입력하세요"
          required
        />
      </div>

      {/* 추가 입력 필드는 여기에 */}

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
