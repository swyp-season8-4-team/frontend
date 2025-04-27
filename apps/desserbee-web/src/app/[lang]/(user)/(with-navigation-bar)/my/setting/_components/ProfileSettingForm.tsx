'use client';

import { UserContext } from '@/contexts/UserContext';
import { useState, useRef, useContext, useMemo } from 'react';
import Image, { type StaticImageData } from 'next/image';
import IconCamera from '@repo/design-system/components/icons/IconCamera';
import type { Preference } from '@repo/entity/src/preference';

export default function ProfileSettingForm() {
  const { user, updateUserProfile, realProfileImageUrl } =
    useContext(UserContext);

  const [nickname, setNickname] = useState(user?.nickname || '');
  const [profileImage, setProfileImage] = useState<string | StaticImageData>(
    user?.profileImageUrl || realProfileImageUrl,
  );
  const [isLoading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 취향 선택 상태
  const [selectedPreferences, setSelectedPreferences] = useState<Preference[]>(
    user?.preferences || [],
  );
  const preferences: Preference[] = [
    '비건',
    '글루텐프리',
    '락토프리',
    '로우슈가',
    '키토제닉',
    '할매픽',
    '트렌디',
    '비주얼',
    '리미티드',
    '로컬라이징',
    '꿀조합',
  ];

  // 변경 사항이 있는지 확인
  const isFormChanged = useMemo(() => {
    // 닉네임 변경 확인
    const isNicknameChanged = nickname !== (user?.nickname || '');

    // 프로필 이미지 변경 확인 (URL 비교)
    const isProfileImageChanged =
      profileImage !== (user?.profileImageUrl || '');

    // 취향 선택 변경 확인
    const userPreferences = user?.preferences || [];

    // 길이가 다르면 변경된 것
    if (selectedPreferences.length !== userPreferences.length) {
      return true;
    }

    // 내용 비교 (순서 무관)
    const preferencesChanged =
      selectedPreferences.some((pref) => !userPreferences.includes(pref)) ||
      userPreferences.some((pref) => !selectedPreferences.includes(pref));

    return isNicknameChanged || isProfileImageChanged || preferencesChanged;
  }, [nickname, profileImage, selectedPreferences, user]);

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

  const togglePreference = async (preference: Preference) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile({ nickname, preferences: selectedPreferences });
      alert('프로필이 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-6">
      {/* 프로필 이미지 */}
      <div className="mt-2 flex flex-col items-center">
        <div className="relative h-[120px] w-[120px] rounded-lg bg-gray-300">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="프로필 이미지"
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-400"></div>
          )}
          <button
            type="button"
            onClick={handleImageClick}
            className="absolute bottom-[-12px] right-[-16px] rounded-full bg-white p-1.5 shadow-md"
            aria-label="프로필 설정 이미지 변경"
          >
            <IconCamera />
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
        <label
          htmlFor="nickname"
          className="text-base font-medium text-[#393939]"
        >
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 (최대 8자, 한글, 영어, 숫자)"
          maxLength={8}
          className="w-full rounded-lg border border-gray-300 p-4 text-gray-700 focus:outline-none"
        />
      </div>

      {/* 취향 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-base font-medium text-[#393939]">
          취향 선택
        </label>
        <div className="flex flex-wrap gap-2">
          {preferences.map((preference) => (
            <button
              key={preference}
              type="button"
              className={`shadow-base rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedPreferences.includes(preference)
                  ? 'bg-primary border text-white'
                  : 'border border-gray-200 bg-white text-gray-700'
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
        className={`mt-4 w-full rounded-[100px] p-3 font-medium text-white transition-colors ${
          isFormChanged
            ? 'bg-secondary hover:bg-[#FFC803]'
            : 'cursor-not-allowed bg-gray-400'
        }`}
        disabled={isLoading || !isFormChanged}
      >
        완료하기
      </button>
    </form>
  );
}
