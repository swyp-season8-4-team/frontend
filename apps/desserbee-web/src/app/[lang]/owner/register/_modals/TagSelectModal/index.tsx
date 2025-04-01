import { StoreRegisterHeader } from '../../_components/StoreRegisterHeader';
import { useState } from 'react';
import { TAG_CATEGORIES, TAGS } from '../../_consts/tag';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';

interface TagSelectModalProps {
  onClose: (tags?: number[]) => void;
  initialTags?: number[];
}

export function TagSelectModal({ onClose, initialTags }: TagSelectModalProps) {
  const [selectedTags, setSelectedTags] = useState<Set<number>>(
    new Set(initialTags),
  );

  const updateSelectedTags = (tagId: number) => {
    setSelectedTags((prev) => {
      if (prev.has(tagId)) {
        const newSet = new Set(prev);
        newSet.delete(tagId);
        return newSet;
      } else if (prev.size >= 3) {
        alert('특성 태그는 최대 3개 선택할 수 있어요');
        return prev;
      }

      const newSet = new Set(prev);
      newSet.add(tagId);
      return newSet;
    });
  };

  const resetSelectedTags = () => {
    setSelectedTags(new Set());
  };

  return (
    <div className="fixed inset-0 z-10 h-full w-full overflow-y-auto bg-white">
      <div className="flex min-h-full flex-col">
        <StoreRegisterHeader
          title="가게 특성 태그"
          isSub={true}
          onClose={() => onClose(Array.from(selectedTags))}
        />
        <div className="px-base py-base flex flex-1 flex-col gap-5">
          <div className="text-sm text-[#7B7B7B]">1~3개 선택</div>
          {TAG_CATEGORIES.map(({ categoryName, categoryId, emoji, alt }) => (
            <div key={categoryId}>
              <div className="mb-2 flex items-center justify-start gap-1">
                <Image src={emoji} width={15} height={15} alt={alt} />
                <div className="text-[15px] font-medium">{categoryName}</div>
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {TAGS.filter((tag) => tag.parentId === categoryId).map(
                  ({ id, name }) => (
                    <button
                      key={id}
                      onClick={() => updateSelectedTags(id)}
                      className={cn(
                        'text-nowrap rounded-[6px] border-[0.3px] px-3 py-[7px] text-xs',
                        selectedTags.has(id)
                          ? 'border-[#825D00] bg-[#FFE4A1] text-[#614500]'
                          : 'text-neutral-30 border-[#9F9F9F] bg-white',
                      )}
                    >
                      {name}
                    </button>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full gap-x-2 px-4 py-4 font-semibold">
          <button
            onClick={resetSelectedTags}
            className="w-[20%] text-nowrap rounded-[6px] border border-[#B3B3B3] p-[10px]"
          >
            초기화
          </button>
          <button
            onClick={() => onClose(Array.from(selectedTags))}
            className="bg-primary-80 w-[80%] rounded-[6px] p-[10px] text-center text-[#412D00]"
          >
            <div>태그 입력</div>
          </button>
        </div>
      </div>
    </div>
  );
}
