'use client';

import { useRef, useState } from 'react';
// import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import IconChevronDown from '@repo/design-system/components/icons/IconChevronDown';

const CATEGORIES = ['친목도모', '사진맛집', '카공모임', '건강맛집', '빵지순례', '카페투어'];

export default function MateWriteForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [space, setSpace] = useState('');
  const [content, setContent] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('주제');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 폼 제출 로직 구현

    router.replace(NavigationPathname.CommunityMate);
  };

  return (
    <form className="flex flex-col h-full gap-2 w-full h-full" onSubmit={handleSubmit}>
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
              {selectedCategory}
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
              multiple
              className="hidden"
            />
            <span className="text-gray-600 cursor-pointer text-[16px] leading-[130%]" onClick={handleImageClick}>사진</span>
          </div>
          <button type="submit" className="px-[9.106px] py-[4.553px] bg-gray-500 text-white rounded-full text-[14px] font-semibold leading-[130%]">
            업로드
          </button>
        </div>
      </div>

      {/* 메인 폼 */}
      <div className="flex-1 rounded-t-[9.106px] h-full">
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

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full px-5 py-4 text-[12px] focus:outline-none resize-none placeholder:text-gray-400"
          placeholder={`원하는 디저트 메이트를 구해보세요.
(1000자 이내로 작성해주세요.)`}
          maxLength={1000}
          rows={10}
        />
      </div>

      {/* 우측 카테고리 */}
      {/* <div className="absolute top-24 right-5 flex flex-col gap-1.5 bg-white py-2 rounded-lg">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-sm px-4 py-1.5 text-left hover:bg-gray-100 ${
              category === cat ? 'text-gray-900' : 'text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}
    </form>
  );
}