'use client';

import { useContext, useMemo, useRef, useState } from 'react';
// import { ChevronLeft } from 'lucide-react';
import { UserContext } from '@/contexts/UserContext';
import IconChevronDown from '@repo/design-system/components/icons/IconChevronDown';
import type { Mate, MateCreateRequest } from '@repo/entity/src/mate';
import { NavigationPathGroup } from '@repo/entity/src/navigation';
import MateConverter from '@repo/infrastructures/src/mappers/mateConverter';
import { useRouter } from 'next/navigation';
import type { CommunityCategory } from '@repo/entity/src/community';
import Image from 'next/image';
import { writeMatePost, editMatePost } from './action';

const CATEGORIES: CommunityCategory[] = [
  '친목도모',
  '사진맛집',
  '카공모임',
  '건강맛집',
  '빵지순례',
  '카페투어',
];

const mateConverter = new MateConverter();

interface Props {
  initialMate?: Mate;
}

export default function MateWriteForm({ initialMate }: Props) {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const [title, setTitle] = useState(initialMate?.title ?? '');
  const [content, setContent] = useState(initialMate?.content ?? '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CommunityCategory>(
    (initialMate?.mateCategory as CommunityCategory) ?? '친목도모',
  );
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialMate?.mateImage ?? null,
  );
  const [capacity, setCapacity] = useState(initialMate?.capacity ?? 5);
  const [isCapacityDropdownOpen, setIsCapacityDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모든 필수 필드가 채워졌는지 확인
  const isFormValid = useMemo(() => {
    return (
      selectedCategory !== null && title.trim() !== '' && content.trim() !== ''
    );
  }, [selectedCategory, title, content]);

  const handleCategorySelect = (category: CommunityCategory) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleCapacitySelect = (value: number) => {
    setCapacity(value);
    setIsCapacityDropdownOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 기존 이미지가 있으면 메모리에서 해제
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    // 새 이미지가 선택되었으면 URL 생성
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadFile(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCategory) {
      return;
    }

    try {
      const requestData = {
        userUuid: user.id,
        title,
        content,
        recruitYn: true,
        place: {
          placeName: null,
          address: null,
          latitude: null,
          longitude: null,
        },
        storeId: null,
        mateCategoryId: mateConverter.convertMateCategoryToId(selectedCategory),
        capacity,
        ...(initialMate?.storeId && { storeId: initialMate.storeId }),
        ...(uploadFile && { mateImage: uploadFile }),
      };

      let result: Mate;
      if (initialMate) {
        result = await editMatePost({
          id: initialMate.id,
          ...requestData,
        });
      } else {
        result = await writeMatePost(requestData);
      }

      router.replace(`${NavigationPathGroup.MateDetail}${result.id}`);
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleRemoveImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      setUploadFile(null);
      setUploadedImage(null);

      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <form className="flex h-full flex-col gap-[12px]" onSubmit={handleSubmit}>
      {/* 상단 헤더 */}
      <div className="flex h-[52px] items-center justify-end border-b bg-white px-5 py-4">
        <div className="flex items-center gap-4">
          {/* 주제 드롭다운 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-gray-600"
            >
              {selectedCategory || '주제'}
              <IconChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 rounded-lg bg-white py-2 shadow-lg">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full whitespace-nowrap px-4 py-2 text-left text-[10px] hover:bg-gray-100"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 인원 수 드롭다운 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCapacityDropdownOpen(!isCapacityDropdownOpen)}
              className="flex items-center gap-1 text-gray-600"
            >
              모집 인원: {capacity}명
              <IconChevronDown size={16} />
            </button>

            {isCapacityDropdownOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 rounded-lg bg-white py-2 shadow-lg">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleCapacitySelect(value)}
                    className="w-full whitespace-nowrap px-4 py-2 text-left text-[10px] hover:bg-gray-100"
                  >
                    {value}명
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <span
              className="cursor-pointer text-[16px] leading-[130%] text-gray-600"
              onClick={handleImageClick}
            >
              사진
            </span>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`rounded-full px-[9.106px] py-[4.553px] text-[14px] font-semibold leading-[130%] transition-colors ${
              isFormValid
                ? 'cursor-pointer bg-[#F9B950] text-white'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            업로드
          </button>
        </div>
      </div>

      {/* 메인 폼 영역 */}
      <div className="flex flex-col bg-white">
        {/* 제목 입력 */}
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-4 text-[12px] placeholder:text-gray-400 focus:outline-none"
            placeholder="제목"
          />
          <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gray-200" />
        </div>

        {/* 내용 입력 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-none px-5 py-4 text-[12px] placeholder:text-gray-400 focus:outline-none"
          placeholder={`원하는 디저트 메이트를 구해보세요.
(1000자 이내로 작성해주세요.)`}
          maxLength={1000}
          style={{ minHeight: '150px' }}
        />

        {/* 업로드된 이미지 */}
        {uploadedImage && (
          <div className="px-5 pb-5">
            <div className="relative w-full">
              <Image
                src={uploadedImage}
                alt="업로드 이미지"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-50 text-white"
                aria-label="이미지 삭제"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
