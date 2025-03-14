import type { ReviewReply } from '@repo/entity/src/review';
import { formatDate } from '@repo/utility/src/date';
import Image from 'next/image';

interface Props {
  reviewReply: ReviewReply;
}

export default function ReviewComment({ reviewReply }: Props) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-start gap-3">
        <Image
          alt="profile"
          src={reviewReply.profileImage}
          width={24}
          height={24}
          className="rounded-full"
        />

        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <span className="text-[#393939] text-[10px] font-semibold tracking-[-0.24px] leading-none">
              {reviewReply.nickname}
            </span>
            <span className="text-[#393939] text-[9px] font-normal leading-[130%] tracking-[-0.3px]">
              {formatDate(reviewReply.createdAt) || reviewReply.createdAt}
            </span>
          </div>

          <div className="mt-2 text-[10px] text-gray-800">
            {reviewReply.content}
          </div>
        </div>
      </div>
    </div>
  );
}
