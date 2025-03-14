'use client';

import { UserContext } from '@/contexts/UserContext';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import UserService from '@repo/usecase/src/userService';
import Image, { type StaticImageData } from 'next/image';
import { useContext, useRef, useState } from 'react';

const userService = new UserService({
  userRepository: new UserAPIRepository(),
});

export default function ProfileSection() {
  const { user, realProfileImageUrl } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState<string | StaticImageData>(
    realProfileImageUrl,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      const { profileImageUrl } = await userService.uploadProfileImage(file);
      if (profileImageUrl) {
        setImageUrl(profileImageUrl);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div
        className="relative w-20 h-20 mb-3 cursor-pointer"
        onClick={handleImageClick}
      >
        <Image
          src={imageUrl}
          alt="my-page-profile-image"
          fill
          priority
          className="rounded-full object-cover"
        />

        {/* 숨겨진 파일 입력 */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      <span className="text-lg font-medium text-gray-800">
        {user?.nickname}
      </span>
    </section>
  );
}
