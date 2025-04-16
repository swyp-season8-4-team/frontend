'use client';

import signUpAction from '@/actions/signUpAction';
import { NavigationPathname } from '@repo/entity/src/navigation';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import UserService from '@repo/usecase/src/userService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { SignUpContext } from '../../_contexts/SignUpContext';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';

const userService = new UserService({
  userRepository: new UserAPIRepository(),
});

export default function SignUpTermsOfServiceForm() {
  const {
    email,
    password,
    nickname,
    confirmPassword,
    gender,
    name,
    phoneNumber,
    profileImage,
  } = useContext(SignUpContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    location: false,
    marketing: false,
  });

  // 필수 약관 동의 여부 확인
  const isRequiredAgreementsChecked = agreements.terms && agreements.location;

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAgreements({
      all: checked,
      terms: checked,
      location: checked,
      marketing: checked,
    });
  };

  const handleSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements((prev) => {
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
    if (isRequiredAgreementsChecked && gender) {
      try {
        setIsLoading(true);

        await signUpAction({
          email,
          password,
          nickname,
          confirmPassword,
          gender,
          name,
          phoneNumber,
        });

        if (profileImage) {
          await userService.uploadProfileImage(profileImage);
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
      } finally {
        setIsLoading(false);
        router.replace(NavigationPathname.SignIn);
      }
    }
  };

  return (
    <div className="mt-[106px] flex h-[calc(100dvh-110px)] flex-col bg-white px-5 pt-8">
      <div className="text-[18px] font-semibold leading-[130%] tracking-[-0.38px] text-[#393939]">
        <p>서비스 이용을 위해</p>
        <p>이용약관 동의가 필요해요!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col justify-between pb-4"
      >
        <div className="flex flex-col gap-5">
          {/* 전체 동의 */}
          <label className="flex w-full cursor-pointer items-center justify-between">
            <span className="font-semibold">전체 동의</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={agreements.all}
                onChange={handleAllCheck}
                className="sr-only"
              />
              <div
                className={`h-6 w-6 rounded-full border ${
                  agreements.all
                    ? 'border-[#F5B01C] bg-[#F5B01C]'
                    : 'border-gray-300'
                }`}
              >
                {agreements.all && (
                  <span className="flex h-full items-center justify-center text-white">
                    ✓
                  </span>
                )}
              </div>
            </div>
          </label>

          {/* 개별 동의 항목들 */}
          <div className="space-y-4">
            <label className="flex w-full cursor-pointer items-center justify-between">
              <div>
                <Link
                  href={NavigationPathname.TermsOfService}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  이용약관
                </Link>{' '}
                및
                <Link
                  href={NavigationPathname.PrivacyPolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  개인정보처리방침
                </Link>{' '}
                (필수)
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreements.terms}
                  onChange={handleSingleCheck}
                  className="sr-only"
                />
                <div
                  className={`h-6 w-6 rounded-full border ${
                    agreements.terms
                      ? 'border-[#F5B01C] bg-[#F5B01C]'
                      : 'border-gray-300'
                  }`}
                >
                  {agreements.terms && (
                    <span className="flex h-full items-center justify-center text-white">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            </label>

            <label className="flex w-full cursor-pointer items-center justify-between">
              <div>
                <Link
                  href={NavigationPathname.LocationBasedFeaturesTermsOfService}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  위치기반서비스
                </Link>{' '}
                이용약관 (필수)
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  name="location"
                  checked={agreements.location}
                  onChange={handleSingleCheck}
                  className="sr-only"
                />
                <div
                  className={`h-6 w-6 rounded-full border ${
                    agreements.location
                      ? 'border-[#F5B01C] bg-[#F5B01C]'
                      : 'border-gray-300'
                  }`}
                >
                  {agreements.location && (
                    <span className="flex h-full items-center justify-center text-white">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            </label>

            <label className="flex w-full cursor-pointer items-center justify-between">
              <div>
                <Link
                  href={NavigationPathname.MarketingTermsOfService}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  마케팅 활용
                </Link>{' '}
                동의 (선택)
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={agreements.marketing}
                  onChange={handleSingleCheck}
                  className="sr-only"
                />
                <div
                  className={`h-6 w-6 rounded-full border ${
                    agreements.marketing
                      ? 'border-[#F5B01C] bg-[#F5B01C]'
                      : 'border-gray-300'
                  }`}
                >
                  {agreements.marketing && (
                    <span className="flex h-full items-center justify-center text-white">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <HoneyButton
          type="submit"
          isDisabled={!isRequiredAgreementsChecked}
          isLoading={isLoading}
          text="완료"
        />
      </form>
    </div>
  );
}
