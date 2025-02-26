import IconStar from '@repo/design-system/components/icons/IconStar';

interface OneLineReviewHeaderProps {
  totalReviewCount: number;
  averageRating: number;
  handleWriteReviewBtnClick?: () => void;
}

export function OneLineReviewHeader({
  totalReviewCount,
  averageRating,
  handleWriteReviewBtnClick,
}: OneLineReviewHeaderProps) {
  return (
    <div className="flex justify-between items-center gap-x-[2px] ">
      <div className="flex items-center">
        <div className="mr-[2px] md:mr-2 font-semibold text-[8px] md:text-lg">
          한 줄 리뷰
        </div>
        <div className="mr-[2px] md:mr-[8px] text-[#898989] text-[6px] md:text-[14px]">
          {totalReviewCount}명 참여
        </div>
        <div className="md:mr-[2px] w-[6px] md:w-[17px] h-[6px] md:h-[17px]">
          <IconStar className="w-full h-full text-[#FFB700]" />
        </div>
        <div className="text-[6px] md:text-base">{averageRating}</div>
      </div>
      {handleWriteReviewBtnClick && (
        <button
          onClick={handleWriteReviewBtnClick}
          className="text-[6px] md:text-base"
        >
          리뷰 쓰기
        </button>
      )}
    </div>
  );
}
