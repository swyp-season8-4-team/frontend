'use client'

import { IconSize } from "@repo/design-system/components/icons";
import IconCamera from "@repo/design-system/components/icons/IconCamera";
import UserAPIRepository from "@repo/infrastructures/src/repositories/userAPIRepository";
import { Button } from "@repo/ui/components/button";
import { SignUpStep } from "@repo/usecase/src/authService";
import UserService from "@repo/usecase/src/userService";
import Image from 'next/image';
import { useCallback, useRef, useState } from "react";

const userService = new UserService({
  userRepository: new UserAPIRepository(),
})

interface Props {
  updateStep: (step: SignUpStep) => void;
}

export default function SignUpNicknameImageForm({ updateStep }: Props) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContinue = async () => {
    if (!message) {
      return;
    }

    const { available } = await userService.validateNickname({ nickname: message, purpose: "SIGNUP" });

    if (!available) {
      setError(true);
      return;
    }
    
    updateStep(SignUpStep.NICKNAME);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사 (이미지 파일인지 확인)
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 제한 (예: 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      // 메모리 누수 방지를 위해 이전 URL 해제
      return () => URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error creating preview:', error);
      alert('이미지 미리보기 생성에 실패했습니다.');
    }
  }, []);

  return (
    <div className="flex flex-col px-4 space-y-6">
      {/* 안내 텍스트 */}
      <h2 className="text-lg font-medium mt-4">
        나만의 프로필 이미지와<br />
        닉네임을 추가해주세요.
      </h2>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* 프로필 이미지 영역 */}
      <div className="relative w-32 h-32 mx-auto">
        <div 
          onClick={handleImageClick}
          className="relative w-full h-full rounded-2xl bg-gray-200 cursor-pointer overflow-hidden"
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="프로필 이미지 미리보기"
              fill
              className="object-cover"
              sizes="(max-width: 128px) 100vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
        <button
          className="absolute bottom-[-12px] right-[-16px] p-2 rounded-full bg-white shadow-md"
          aria-label="이미지 업로드"
          onClick={handleImageClick}
        >
          <IconCamera size={IconSize.s} />
        </button>
      </div>

      {/* 닉네임 입력 */}
      <div className="space-y-2">
        <p className="text-sm font-medium">닉네임 입력</p>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="닉네임 (최대 8자, 한글, 영어, 숫자)"
          className={`w-full py-[10px] border-b ${
            error ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none placeholder:text-[#BABABA]`}
        />
      </div>

      {/* 계속하기 버튼 */}
      <Button 
        className="w-full mt-auto"
        disabled={!message || !imagePreview}
        size="lg"
        onClick={handleContinue}
      >
        계속하기
      </Button>
    </div>
  )
}