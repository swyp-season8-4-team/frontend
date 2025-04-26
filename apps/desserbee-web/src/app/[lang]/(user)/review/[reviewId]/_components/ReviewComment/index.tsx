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
        <div className="flex h-6 w-6 overflow-hidden rounded-full">
          <Image
            alt="profile"
            src={reviewReply.profileImage}
            width={30}
            height={30}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <span className="text-[10px] font-semibold leading-none tracking-[-0.24px] text-[#393939]">
              {reviewReply.nickname}
            </span>
            <span className="text-[9px] font-normal leading-[130%] tracking-[-0.3px] text-[#393939]">
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
