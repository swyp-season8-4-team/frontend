'use client';

import signUpAction from '@/actions/signUpAction';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { Button } from '@repo/ui/components/button';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { SignUpContext } from '../../_contexts/SignUpContext';


type Gender = 'FEMALE' | 'MALE' | null;

export default function SignUpGenderForm() {
  const router = useRouter();
  const { email, password, confirmPassword } = useContext(SignUpContext);
  const [selectedGender, setSelectedGender] = useState<Gender>(null);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleSubmit = async () => {
    if (!selectedGender) {
      return;
    }

    await signUpAction({
      email,
      password,
      confirmPassword,
      gender: selectedGender,
    });

    router.push(NavigationPathname.SignIn);
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