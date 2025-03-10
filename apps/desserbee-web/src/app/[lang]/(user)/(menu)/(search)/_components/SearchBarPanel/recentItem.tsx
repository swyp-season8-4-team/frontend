import IconClock from '@repo/design-system/components/icons/IconClock';
import IconX from '@repo/design-system/components/icons/IconX';
import { deleteRecentSearchKeyword } from './action';
import { useRouter } from 'next/navigation';

interface RecentItemProps {
  keyword: string;
  createdAt?: string;
}

export function RecentItem({ keyword, createdAt }: RecentItemProps) {
  const router = useRouter();
  //TODO: API 명세서 업데이트되면 수정
  const handleRecentKeywordDelete = async () => {
    try {
      // await deleteRecentSearchKeyword();
      console.log('삭제');
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

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
          onClick={() => handleRecentKeywordDelete()}
          className="w-2 h-2 md:w-5 md:h-5"
        >
          <IconX className="text-[#545454] w-full h-full" />
        </button>
      </div>
    </div>
  );
}
