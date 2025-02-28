'use client';

import updateProfileImageAction from '@/actions/updateProfileImageAction';
import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';


export default function ProfileSection() {
  const { user } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState<string>(user?.profileImageUrl ?? '');
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
      const { profileImageUrl } = await updateProfileImageAction(file);
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
      <span className="text-lg font-medium text-gray-800">{user?.nickname}</span>
    </section>
  );
} 