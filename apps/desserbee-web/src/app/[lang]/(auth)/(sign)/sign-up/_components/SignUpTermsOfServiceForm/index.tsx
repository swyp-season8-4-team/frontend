'use client';

import { NavigationPathname } from '@repo/entity/src/navigation';
import AuthAPIRespository from '@repo/infrastructures/src/repositories/authAPIRespository';
import AuthService from '@repo/usecase/src/authService';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { SignUpContext } from '../../_contexts/SignUpContext';
import { getVerifyTokenAction } from '@/actions/getVerifyTokenAction';

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
});

export default function SignUpTermsOfServiceForm() {
  const { email, password, nickname, confirmPassword, gender, profileImage } = useContext(SignUpContext);
  const router = useRouter();
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
    service: false,
  });

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      marketing: checked,
      service: checked,
    });
  };

  const handleSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements(prev => {
      const newAgreements = {
        ...prev,
        [name]: checked,
      };
      
      const allChecked = Object.entries(newAgreements)
        .filter(([k]) => k !== 'all')
        .every(([, value]) => value);
      
      return {
        ...newAgreements,
        all: allChecked,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agreements.terms && agreements.privacy && gender) {
      console.log('signUp', {
        email,
        password,
        nickname,
        confirmPassword,
        gender,
      });
      await authService.signUp({
        email,
        password,
        nickname,
        confirmPassword,
        gender,
      }, await getVerifyTokenAction());

      router.replace(NavigationPathname.SignIn);
    }
  };

  return (
    <main className="flex flex-col h-full bg-white px-5 pt-8">
      <div className="mb-8">
        <h2 className="text-lg mb-1">서비스 이용을 위해</h2>
        <h2 className="text-lg">이용약관 동의가 필요해요!</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
        {/* 전체 동의 */}
        <label className="flex items-center justify-between w-full cursor-pointer">
          <span className="font-semibold">전체 동의</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={handleAllCheck}
              className="sr-only" // 시각적으로 숨기고 접근성 유지
            />
            <div className={`w-6 h-6 rounded-full border ${
              agreements.all ? 'bg-[#F5B01C] border-[#F5B01C]' : 'border-gray-300'
            }`}>
              {agreements.all && (
                <span className="text-white flex items-center justify-center h-full">✓</span>
              )}
            </div>
          </div>
        </label>

        {/* 개별 동의 항목들 */}
        <div className="space-y-4">
          <label className="flex items-center justify-between w-full cursor-pointer">
            <span className="underline">이용약관 및 개인정보처리방침 (필수)</span>
            <div className="relative">
              <input
                type="checkbox"
                name="terms"
                checked={agreements.terms}
                onChange={handleSingleCheck}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-full border ${
                agreements.terms ? 'bg-[#F5B01C] border-[#F5B01C]' : 'border-gray-300'
              }`}>
                {agreements.terms && (
                  <span className="text-white flex items-center justify-center h-full">✓</span>
                )}
              </div>
            </div>
          </label>

          <label className="flex items-center justify-between w-full cursor-pointer">
            <span className="underline">위치기반서비스 이용약관 (필수)</span>
            <div className="relative">
              <input
                type="checkbox"
                name="privacy"
                checked={agreements.privacy}
                onChange={handleSingleCheck}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-full border ${
                agreements.privacy ? 'bg-[#F5B01C] border-[#F5B01C]' : 'border-gray-300'
              }`}>
                {agreements.privacy && (
                  <span className="text-white flex items-center justify-center h-full">✓</span>
                )}
              </div>
            </div>
          </label>

          <label className="flex items-center justify-between w-full cursor-pointer">
            <span className="underline">마케팅 활용 동의 (선택)</span>
            <div className="relative">
              <input
                type="checkbox"
                name="marketing"
                checked={agreements.marketing}
                onChange={handleSingleCheck}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-full border ${
                agreements.marketing ? 'bg-[#F5B01C] border-[#F5B01C]' : 'border-gray-300'
              }`}>
                {agreements.marketing && (
                  <span className="text-white flex items-center justify-center h-full">✓</span>
                )}
              </div>
            </div>
          </label>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className={`mb-8 py-4 rounded-lg ${
            agreements.terms && agreements.privacy
              ? 'bg-[#F5B01C] text-white'
              : 'bg-gray-200 text-gray-500'
          }`}
          disabled={!agreements.terms || !agreements.privacy}
        >
          회원가입 완료
        </button>
      </form>
    </main>
  );
}