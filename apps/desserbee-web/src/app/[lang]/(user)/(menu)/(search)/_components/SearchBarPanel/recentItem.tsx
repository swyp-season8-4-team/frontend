import IconClock from '@repo/design-system/components/icons/IconClock';
import IconX from '@repo/design-system/components/icons/IconX';
import { deleteRecentSearchKeyword } from './action';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';

interface RecentItemProps {
  keyword: string;
  createdAt?: string;
}

export function RecentItem({ keyword, createdAt }: RecentItemProps) {
  const { user } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(true);

  //TODO: API 명세서 업데이트되면 수정
  const handleRecentKeywordDelete = async () => {
    try {
      if (user) {
        // await deleteRecentSearchKeyword();
        setIsVisible(false);
      } else {
        const searchHistory = JSON.parse(
          localStorage.getItem('searchHistory') || '[]',
        );

        const updatedHistory = searchHistory.filter((encodedTerm: string) => {
          const decodedTerm = decodeURIComponent(atob(encodedTerm));
          return decodedTerm !== keyword;
        });

        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

        // 현재 아이템을 UI에서 숨김 (낙관적 업데이트..?)
        setIsVisible(false);
      }
    } catch (err) {
      console.log('최근 검색어 삭제 실패:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[6px] md:gap-[14px] items-center">
        <div className="w-2 h-2 md:w-[19px] md:h-[19px]">
          <IconClock className="text-[#BABABA] w-full h-full" />
        </div>
        <div className="text-[10px] md:text-xl">{keyword}</div>
      </div>
      <div className="flex items-center gap-[6.48px] md:gap-[17px]">
        <div className="text-[8px] md:text-lg">{createdAt}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRecentKeywordDelete();
          }}
          className="w-2 h-2 md:w-5 md:h-5"
        >
          <IconX className="text-[#545454] w-full h-full" />
        </button>
      </div>
    </div>
  );
}
