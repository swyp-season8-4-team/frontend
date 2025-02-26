import Image from 'next/image';
import IconStar from '@repo/design-system/components/icons/IconStar';

import { formatDate } from '../../../../_utils/date';

interface OneLineReviewItemProps {
  images: string[];
  profileImage: string;
  nickname: string;
  content: string;
  rating: number;
  createdAt: string;
}
export function OneLineReviewItem({
  images,
  profileImage,
  nickname,
  content,
  createdAt,
  rating,
}: OneLineReviewItemProps) {
  return (
    <div className="flex justify-start items-center bg-[#F6F6F6] p-[5px] md:px-[14px] md:py-3 w-full">
      <div className="bg-[#D2D2D2] rounded-[1px] md:rounded-[3px] w-[21px] md:w-[58px] aspect-square overflow-hidden">
        {images.length !== 0 && (
          <Image
            src={images[0]}
            alt="리뷰 이미지"
            className="w-full h-full object-fit"
            width={58}
            height={58}
          />
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start pl-[3px] md:pl-[11px] leading-[50%] md:leading-[130%]">
          <div className="flex items-center gap-x-[1px] gap-y-[2px] md:gap-x-[5px] md:gap-y-[7px]">
            <div className="rounded-full w-[10px] md:w-[21px] aspect-square overflow-hidden">
              <Image
                src={profileImage}
                alt="프로필 이미지"
                className="w-full h-full object-fit"
                width={21}
                height={21}
              />
            </div>
            <div className="text-[6px] md:text-base">{nickname}</div>
          </div>
          <div className="text-[6px] md:text-base">{content}</div>
        </div>
        <div>
          <div className="flex items-center">
            <div className="md:mr-[2px] w-[6px] md:w-[17px] h-[6px] md:h-[17px]">
              <IconStar className="w-full h-full text-[#FFB700]" />
            </div>
            <div className="text-[6px] md:text-base">{rating}</div>
          </div>
          <div className="text-[5px] md:text-sm">{formatDate(createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
