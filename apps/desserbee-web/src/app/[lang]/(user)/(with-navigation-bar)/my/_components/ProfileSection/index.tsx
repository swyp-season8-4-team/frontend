'use client';

import { UserContext } from '@/contexts/UserContext';

import Image, { type StaticImageData } from 'next/image';
import { useContext, useRef, useState } from 'react';
import { uploadProfileImage } from './action';
import { useRouter } from 'next/navigation';

export default function ProfileSection() {
  const router = useRouter();
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
      const { profileImageUrl } = await uploadProfileImage({ file });
      if (profileImageUrl) {
        router.refresh();
        setImageUrl(profileImageUrl);
        alert('이미지가 변경되었습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div
        className="relative mb-3 h-20 w-20 cursor-pointer"
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
