import type { MateReply } from '@repo/entity/src/mate';
import { formatDate } from '@repo/utility/src/date';
import Image from 'next/image';

interface Props {
  mateReply: MateReply;
}

export default function MateComment({ mateReply }: Props) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-start gap-3">
        <div className="h-6 w-6 overflow-hidden rounded-full">
          <Image
            alt="profile"
            src={mateReply.profileImage}
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <span className="text-[10px] font-semibold leading-none tracking-[-0.24px] text-[#393939]">
              {mateReply.nickname}
            </span>
            <span className="text-[9px] font-normal leading-[130%] tracking-[-0.3px] text-[#393939]">
              {formatDate(mateReply.createdAt) || mateReply.createdAt}
            </span>
          </div>

          <div className="mt-2 text-[10px] text-gray-800">
            {mateReply.content}
          </div>
        </div>
      </div>
    </div>
  );
}
