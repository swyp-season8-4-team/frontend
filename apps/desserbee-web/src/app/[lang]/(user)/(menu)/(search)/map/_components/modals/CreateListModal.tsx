import IconFlower from '@repo/design-system/components/icons/IconFlower';
import { getIconColor } from '../../_utils/iconColor';
import { useState } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface CreateListModalProps {
  onClose: () => void;
  onComplete: (listName: string, colorId: number) => void;
}

export function CreateListModal({ onClose, onComplete }: CreateListModalProps) {
  const [listName, setListName] = useState('');
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const colors = [1, 2, 3, 4];

  const isSubmitDisabled = !listName.trim() || selectedColor === null;

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      onComplete(listName, selectedColor);
      setListName('');
      setSelectedColor(null);
    }
  };

  return (
    <div>
      <div className="z-modal fixed animate-fadeIn" onClick={onClose} />
      <div className="top-[108px] right-4 z-modal absolute flex flex-col justify-between bg-white px-[9.43px] md:px-[18px] py-[10.99px] md:py-[21px] rounded-[20px] w-[167px] md:w-[320px] md:h-[289px] animate-fadeIn">
        <h2 className="pb-[6] md:pb-[20px] border-b border-b-[#BABABA] font-semibold md:text-[22px] text-xs">
          {/* <div className="top-[108px] right-4 z-modal absolute flex flex-col justify-between bg-white px-[9.43px] py-[10.99px] rounded-[20px] w-[167px] animate-fadeIn"> */}
          {/* <h2 className="border-b border-b-[#BABABA] font-semibold text-xs"> */}
          새 리스트 추가
        </h2>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="새 리스트명을 입력해주세요"
          className="mb-[7.33px] p-[3.75px] border-b border-b-[#393939] w-full text-[10px] md:text-lg"
          // className="mb-[7.33px] p-[3.75px] border-b border-b-[#393939] w-full text-[10px]"
        />
        <div className="mb-[10.82px]">
          <p className="mb-2 font-semibold text-[10px] md:text-lg">
            아이콘 선택
          </p>
          {/* <p className="mb-2 font-semibold text-[10px]">아이콘 선택</p> */}
          <div className="flex gap-[6.53px] md:gap-2">
            {/* <div className="flex gap-[6.53px]"> */}
            {colors.map((colorId) => (
              <button
                key={colorId}
                onClick={() => setSelectedColor(colorId)}
                className="border border-[#D5D5D5] rounded-[2.09px] w-[19.65px] md:w-[37.5px] aspect-square"
                // className="border border-[#D5D5D5] rounded-[2.09px] w-[19.65px] aspect-square"
              >
                <IconFlower
                  className={cn(getIconColor(colorId), 'w-full h-full')}
                />
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={cn(
            'text-[10px] w-full rounded-[52.36px] md:h-9 h-[18.85px] md:text-[20px] font-semibold',
            isSubmitDisabled
              ? 'bg-[#D9D9D9] text-[#6F6F6F] cursor-not-allowed'
              : 'bg-primary text-white',
          )}
        >
          완료
        </button>
      </div>
    </div>
  );
}
