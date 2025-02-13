'use client';

import { Button } from '@repo/ui/components/button';
import { useState } from 'react';
import { SignUpStep } from '@repo/usecase/src/authService';

interface Props {
  updateStep: (step: SignUpStep) => void;
}

type Gender = 'FEMALE' | 'MALE' | null;

export default function SignUpGenderForm({ updateStep }: Props) {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleSubmit = () => {
    if (!selectedGender) return;
    // 회원가입 완료 로직
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">성별 선택</h2>
      
      <div className="flex w-full rounded-[100px] border border-gray-200 overflow-hidden">
        <button
          type="button"
          onClick={() => handleGenderSelect('FEMALE')}
          className={`flex-1  py-3 text-center transition-colors
            ${selectedGender === 'FEMALE' 
              ? 'bg-[#FFB700] text-white' 
              : 'bg-white text-gray-900 hover:bg-gray-50'
            }`}
        >
          여성
        </button>
        <button
          type="button"
          onClick={() => handleGenderSelect('MALE')}
          className={`flex-1 py-3 text-center transition-colors
            ${selectedGender === 'MALE' 
              ? 'bg-[#FFB700] text-white' 
              : 'bg-white text-gray-900 hover:bg-gray-50'
            }`}
        >
          남성
        </button>
      </div>

      <Button
        className={`w-full py-3 text-white rounded-[100px] font-medium transition-colors
          ${selectedGender
            ? 'bg-[#FFB700] hover:bg-[#FFB700]/90' 
            : 'bg-gray-400 cursor-not-allowed opacity-50'
          }`}
        disabled={!selectedGender}
        onClick={handleSubmit}
      >
        회원가입 완료
      </Button>
    </div>
  );
}