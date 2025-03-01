'use client';

import { Button } from "@repo/ui/components/button";

interface LoginButtonsProps {
  isLoading?: boolean;
  isFormValid?: boolean;
}

export default function LoginButtons({ isLoading = false, isFormValid = false }: LoginButtonsProps) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Button
        type="submit"
        className={`w-full py-[15px] py-3 rounded-[100px] font-medium text-center font-bold leading-[130%] tracking-[-0.334px] ${
          isFormValid ? 'bg-[#FDB813] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            로그인 중...
          </div>
        ) : (
          "로그인"
        )}
      </Button>
      {/* <Button
        type="button"
        className={`w-full py-[15px] py-3 rounded-[100px] font-medium text-center font-bold leading-[130%] tracking-[-0.334px] ${
          isFormValid ? 'bg-[#DE8332] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            로그인 중...
          </div>
        ) : (
          "사장님 로그인"
        )}
      </Button> */}
    </div>
  );
} 