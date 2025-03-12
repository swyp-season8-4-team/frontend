'use client';

import { UserContext } from '@/contexts/UserContext';
import IconChevronDown from '@repo/design-system/components/icons/IconChevronDown';
import type { CommunityDessertReviewCategory } from '@repo/entity/src/community';
import { NavigationPathGroup } from '@repo/entity/src/navigation';
import type { Review, ReviewContent } from '@repo/entity/src/review';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import ReviewService from '@repo/usecase/src/reviewService';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
});

interface Props {
  initialReview?: Review;
}

// FIXME: 컴포넌트 분리
export default function ReviewWriteForm({ initialReview }: Props) {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const [title, setTitle] = useState(initialReview?.title ?? '');
  const [space, setSpace] = useState(initialReview?.place?.name ?? '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityDessertReviewCategory | null>(
      initialReview?.category ?? null,
    );
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const uploadingImageRef = useRef<boolean>(false);
  const nextImageIdRef = useRef<number>(0); // 다음 이미지 ID를 추적하는 ref 추가

  // 초기 콘텐츠 로드
  useEffect(() => {
    if (initialReview?.contents && editorRef.current) {
      renderContentsToEditor(initialReview.contents);

      // 초기 콘텐츠에서 가장 큰 이미지 ID 찾기
      let maxImageId = -1;
      initialReview.contents.forEach((content) => {
        if (
          content.type === 'image' &&
          content.imageId !== undefined &&
          content.imageId > maxImageId
        ) {
          maxImageId = content.imageId;
        }
      });

      // 다음 이미지 ID 설정
      nextImageIdRef.current = maxImageId + 1;
    }
  }, [initialReview]);

  // 에디터에 초기 콘텐츠 렌더링
  const renderContentsToEditor = (contents: ReviewContent[]) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    editor.innerHTML = '';

    contents.forEach((content) => {
      if (content.type === 'text') {
        const p = document.createElement('p');
        p.textContent = content.value ?? null;
        editor.appendChild(p);
      } else if (content.type === 'image' && content.imageUrl) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container relative my-2';

        const img = document.createElement('img');
        img.src = content.imageUrl;
        img.className = 'w-full max-w-full rounded';
        img.dataset.imageId = content.imageId?.toString();

        imgContainer.appendChild(img);
        editor.appendChild(imgContainer);
      }
    });

    // 마지막에 빈 p 태그 추가 (커서 위치용)
    if (editor.lastElementChild?.tagName !== 'P') {
      const p = document.createElement('p');
      p.innerHTML = '<br>';
      editor.appendChild(p);
    }
  };

  // 모든 필수 필드가 채워졌는지 확인
  const isFormValid = useMemo(() => {
    const editorHasContent =
      editorRef.current &&
      (editorRef.current.textContent?.trim() !== '' ||
        editorRef.current.querySelectorAll('img').length > 0);

    return (
      selectedCategory !== null &&
      title.trim() !== '' &&
      space.trim() !== '' &&
      editorHasContent
    );
  }, [selectedCategory, title, space]);

  const handleCategorySelect = (category: CommunityDessertReviewCategory) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editorRef.current) return;

    uploadingImageRef.current = true;

    // 현재 선택된 위치 저장
    const selection = window.getSelection();
    const editor = editorRef.current;

    // 새 파일들을 uploadFiles 상태에 추가
    const newFiles: File[] = Array.from(files);
    setUploadFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // 에디터에 포커스가 없는 경우 마지막에 포커스
    if (
      !selection ||
      !selection.rangeCount ||
      !editor.contains(selection.anchorNode)
    ) {
      // 에디터 마지막에 포커스
      const range = document.createRange();

      // 에디터가 비어있으면 p 태그 추가
      if (!editor.lastChild || editor.innerHTML.trim() === '') {
        editor.innerHTML = '<p><br></p>';
      }

      // 마지막 자식 요소의 마지막에 커서 위치
      const lastChild = editor.lastChild;
      if (lastChild) {
        range.selectNodeContents(lastChild);
        range.collapse(false); // 끝으로 이동
      }

      selection?.removeAllRanges();
      selection?.addRange(range);
    }

    // 이제 selection이 있어야 함
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 이미지 URL 생성
        const imageUrl = URL.createObjectURL(file);
        const currentImageId = nextImageIdRef.current; // 현재 이미지 ID 가져오기
        nextImageIdRef.current++; // 다음 이미지 ID 증가

        // 이미지 컨테이너 생성
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container relative my-2';

        // 이미지 요소 생성
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'w-full max-w-full rounded';
        img.dataset.imageId = currentImageId.toString(); // 현재 이미지 ID 할당
        img.dataset.tempFile = 'true';
        img.dataset.fileIndex = (uploadFiles.length + i).toString(); // 파일 인덱스 저장

        imgContainer.appendChild(img);

        // 현재 위치에 이미지 삽입
        range.insertNode(imgContainer);

        // 커서 위치 이동 (이미지 다음으로)
        range.setStartAfter(imgContainer);
        range.setEndAfter(imgContainer);
        selection.removeAllRanges();
        selection.addRange(range);

        // 이미지 다음에 새 단락 추가 (필요한 경우)
        if (i === files.length - 1) {
          const p = document.createElement('p');
          p.innerHTML = '<br>';
          range.insertNode(p);

          // 커서를 새 단락으로 이동
          range.selectNodeContents(p);
          range.collapse(true); // 시작 부분으로 이동
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    uploadingImageRef.current = false;

    // 에디터에 변경 이벤트 발생시키기
    const event = new Event('input', { bubbles: true });
    editor.dispatchEvent(event);
  };

  // 에디터 내용을 ReviewContent[] 형식으로 변환
  const parseEditorContents = (): ReviewContent[] => {
    if (!editorRef.current) return [];

    const parsedContents: ReviewContent[] = [];
    const processedImageIds = new Set<string>(); // 이미 처리된 이미지 ID 추적

    // 에디터의 모든 요소를 순회하며 내용 추출
    const walkNodes = (node: Node) => {
      // 텍스트 노드인 경우
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return {
          type: 'text',
          value: node.textContent.trim(),
        };
      }

      // 요소 노드인 경우
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;

        // 이미지 컨테이너인 경우
        if (element.classList.contains('image-container')) {
          const img = element.querySelector('img');
          if (img && img.dataset.imageId) {
            const imageId = parseInt(img.dataset.imageId);

            // 이미 처리된 이미지인지 확인
            if (!processedImageIds.has(img.dataset.imageId)) {
              processedImageIds.add(img.dataset.imageId);
              return {
                type: 'image',
                imageIndex: imageId,
              };
            }
            return null; // 이미 처리된 이미지는 건너뜀
          }
        }

        // p 태그인 경우 텍스트 내용만 추출
        if (element.tagName === 'P') {
          const text = element.textContent?.trim();
          if (text) {
            return {
              type: 'text',
              value: text,
            };
          }
        }

        // 다른 요소 노드인 경우 자식 노드 탐색
        const childResults: unknown[] = [];
        element.childNodes.forEach((child) => {
          const result = walkNodes(child);
          if (result) childResults.push(result);
        });

        return childResults.length > 0 ? childResults.flat() : null;
      }

      return null;
    };

    // 에디터의 모든 최상위 노드 처리
    editorRef.current.childNodes.forEach((node) => {
      const result = walkNodes(node);
      if (result) {
        if (Array.isArray(result)) {
          parsedContents.push(...(result as ReviewContent[]));
        } else {
          parsedContents.push(result as ReviewContent);
        }
      }
    });

    return parsedContents;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editorRef.current) {
      return;
    }

    try {
      // 에디터 내용을 파싱하여 ReviewContent[] 형식으로 변환
      const parsedContents = parseEditorContents();

      const data = {
        userId: user.id,
        title,
        contents: parsedContents,
        category: selectedCategory!,
        place: {
          name: space,
        },
        imageFiles: uploadFiles,
      };

      let id = '';

      if (initialReview) {
        await reviewService.edit({ id: initialReview.id, ...data });
        id = initialReview.id;
      } else {
        const response = await reviewService.write(data);
        id = response.id;
      }

      router.replace(`${NavigationPathGroup.ReviewDetail}${id}`);
    } catch (error) {
      console.error('리뷰 저장 실패:', error);
      // 에러 처리 로직
    }
  };

  return (
    <form className="flex flex-col h-full" onSubmit={handleSubmit}>
      {/* 상단 헤더 */}
      <div className="flex items-center justify-end px-5 py-4 border-b bg-white h-[52px] flex-shrink-0">
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
                {reviewService.categories.map((category) => (
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
            <span
              className="text-gray-600 cursor-pointer text-[16px] leading-[130%]"
              onClick={handleImageClick}
            >
              사진
            </span>
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
      <div className="flex flex-col bg-white flex-grow overflow-auto">
        {/* 제목 입력 */}
        <div className="relative flex-shrink-0">
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
        <div className="relative flex-shrink-0">
          <input
            type="text"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            className="w-full px-5 py-4 h-[48px] text-[12px] focus:outline-none placeholder:text-gray-400"
            placeholder="장소"
          />
          <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gray-200" />
        </div>

        {/* 리치 에디터 영역 - 남은 모든 공간 차지 */}
        <div
          ref={editorRef}
          contentEditable
          className="w-full px-5 py-4 text-[12px] focus:outline-none flex-grow overflow-y-auto editor-placeholder editor-content"
          data-placeholder="디저트샵 리뷰를 자유롭게 남겨주세요!"
          onFocus={(e) => {
            // 빈 에디터에 포커스가 갔을 때 p 태그 생성
            if (!e.currentTarget.innerHTML.trim()) {
              e.currentTarget.innerHTML = '<p><br></p>';
            }
          }}
          onPaste={(e) => {
            // 이미지 붙여넣기 처리 (필요시 구현)
            // 텍스트만 붙여넣기 허용하려면 e.preventDefault() 후 텍스트만 삽입
          }}
        />
      </div>
    </form>
  );
}
