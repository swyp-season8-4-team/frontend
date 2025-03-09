'use client';

import { useContext, useMemo, useRef, useState } from 'react';
// import { ChevronLeft } from 'lucide-react';
import { UserContext } from '@/contexts/UserContext';
import IconChevronDown from '@repo/design-system/components/icons/IconChevronDown';
import type { Mate } from '@repo/entity/src/mate';
import { NavigationPathGroup } from '@repo/entity/src/navigation';
import MateConverter from '@repo/infrastructures/src/mappers/mateConverter';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { useRouter } from 'next/navigation';
import type { CommunityCategory } from '@repo/entity/src/community';
import Image from 'next/image';

const CATEGORIES: CommunityCategory[] = ['친목도모', '사진맛집', '카공모임', '건강맛집', '빵지순례', '카페투어'];

const mateConverter = new MateConverter();
const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
})

interface Props {
  initialMate?: Mate;
}

export default function MateWriteForm({ initialMate }: Props) {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const [title, setTitle] = useState(initialMate?.title ?? '');
  const [space, setSpace] = useState(initialMate?.place?.placeName ?? '');
  const [content, setContent] = useState(initialMate?.content ?? '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CommunityCategory | null>(initialMate?.mateCategory ?? null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(initialMate?.mateImage ?? null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모든 필수 필드가 채워졌는지 확인
  const isFormValid = useMemo(() => {
    return (
      selectedCategory !== null &&
      title.trim() !== '' && 
      space.trim() !== '' && 
      content.trim() !== ''
    );
  }, [selectedCategory, title, space, content]);

  const handleCategorySelect = (category: CommunityCategory) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
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
    if (!user) {
      return;
    }

    const { id } = await mateService.write({
      userId: user?.id,
      title,
      content,
      recruit: true,
      mateCategoryId: mateConverter.convertMateCategoryToId(selectedCategory),
      place: {
        placeName: space,
        address: null,
        latitude: null,
        longitude: null,
      },
      ...(uploadFile && { imageFile: uploadFile }),
    }, !initialMate)
    
    router.replace(`${NavigationPathGroup.MateDetail}${id}`);
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
    <form className="flex flex-col gap-[12px] h-full" onSubmit={handleSubmit}>
      {/* 상단 헤더 */}
      <div className="flex items-center justify-end px-5 py-4 border-b bg-white h-[52px]">
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
              <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg py-2 z-10">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full whitespace-nowrap px-4 py-2 text-left hover:bg-gray-100 text-[8px] leading-[130%] tracking-[-0.24px]"
                  >
                    {category}
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
            <span className="text-gray-600 cursor-pointer text-[16px] leading-[130%]" onClick={handleImageClick}>사진</span>
          </div>
          <button 
            type="submit" 
            disabled={!isFormValid}
            className={`px-[9.106px] py-[4.553px] rounded-full text-[14px] font-semibold leading-[130%] transition-colors ${
              isFormValid 
                ? 'bg-[#F9B950] text-white cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
            className="w-full px-5 py-4 text-[12px] focus:outline-none placeholder:text-gray-400"
            placeholder="제목"
          />
          <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gray-200" />
        </div>
        
        {/* 장소 입력 */}
        <div className="relative">
          <input
            type="text"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            className="w-full px-5 py-4 h-[48px] text-[12px] focus:outline-none placeholder:text-gray-400"
            placeholder="장소"
          />
          <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gray-200" />
        </div>

        {/* 내용 입력 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-5 py-4 text-[12px] focus:outline-none resize-none placeholder:text-gray-400"
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
                className="w-full h-auto rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
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