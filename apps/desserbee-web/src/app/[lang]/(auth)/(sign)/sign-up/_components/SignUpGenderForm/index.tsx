'use client';

import { Button } from '@repo/ui/components/button';
import { SignUpStep } from '@repo/usecase/src/authService';
import { useState } from 'react';

type Gender = 'FEMALE' | 'MALE' | null;

interface Props {
  updateStep: (step: SignUpStep) => void;
}

export default function SignUpGenderForm({ updateStep }: Props) {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleSubmit = async () => {
    if (!selectedGender) {
      return;
    }
    
    updateStep(SignUpStep.NICKNAME);
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
        계속하기
      </Button>
    </div>
  );
}