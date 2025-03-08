'use client';

import { UserContext } from '@/contexts/UserContext';
import { useState, useRef, useContext } from 'react';
import Image from 'next/image';
// import { Camera } from 'lucide-react';

export default function ProfileSettingForm() {
  const { user, updateUserProfile } = useContext(UserContext);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [profileImage, setProfileImage] = useState(user?.profileImageUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 취향 선택 상태
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const preferences = ['비건', '글루텐프리', '락토프리', '로우슈가', '키토제닉', '할매픽', '트렌디', '비주얼', '리미티드', '로컬라이징', '꿀조합'];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const togglePreference = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // await updateUserProfile({ nickname, profileImageUrl: profileImage });
      alert('프로필이 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-6">
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center mt-4">
        <div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden bg-gray-300">
          {profileImage ? (
            <Image 
              src={profileImage} 
              alt="프로필 이미지" 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400"></div>
          )}
          <button 
            type="button"
            onClick={handleImageClick}
            className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow-md"
            aria-label="프로필 이미지 변경"
          >
            {/* <Camera size={16} className="text-gray-600" /> */}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>

      {/* 닉네임 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nickname" className="text-[#393939] font-medium text-base">닉네임</label>
        <input 
          id="nickname"
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          placeholder="닉네임 (최대 8자, 한글, 영어, 숫자)"
          maxLength={8}
          className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none"
        />
      </div>

      {/* 비밀번호 변경 섹션 */}
      <div className="flex flex-col gap-2">
        <label className="text-[#393939] font-medium text-base">비밀번호 변경</label>
        <input 
          type="password" 
          placeholder="기존 비밀번호를 입력해주세요."
          className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none"
        />
        <input 
          type="password" 
          placeholder="새로운 비밀번호 (8자 이상, 영어 소문자, 특수문자 포함)"
          className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none mt-2"
        />
        <input 
          type="password" 
          placeholder="새로운 비밀번호 (8자 이상, 영어 소문자, 특수문자 포함) 확인"
          className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none mt-2"
        />
      </div>

      {/* 취향 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-[#393939] font-medium text-base">취향 선택</label>
        <div className="flex flex-wrap gap-2">
          {preferences.map((preference) => (
            <button
              key={preference}
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedPreferences.includes(preference)
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
              onClick={() => togglePreference(preference)}
            >
              {preference}
            </button>
          ))}
        </div>
      </div>

      {/* 완료 버튼 */}
      <button 
        type="submit" 
        className="w-full py-4 bg-gray-400 text-white rounded-lg font-medium mt-4 hover:bg-gray-500 transition-colors"
        disabled={isSubmitting}
      >
        완료하기
      </button>
    </form>
  );
}