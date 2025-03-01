import type { MateReply } from "@repo/entity/src/mate";
import { formatDate } from "@repo/utility/src/date";
import Image from "next/image";

interface Props {
  mateReply: MateReply;
}

export default function MateComment({ mateReply }: Props) {
  return (
    <div className="flex flex-col gap-4 py-4 border-b border-gray-100">
      <div className="flex items-start gap-3">
        <Image
          alt="profile"
          src={mateReply.profileImage} 
          width={24} 
          height={24} 
          className="rounded-full"
        />
        
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <span className="text-[#393939] text-[10px] font-semibold tracking-[-0.24px] leading-none">{mateReply.nickname}</span>
            <span className="text-[#393939] text-[9px] font-normal leading-[130%] tracking-[-0.3px]">
              {formatDate(mateReply.createdAt) || mateReply.createdAt}
            </span>
          </div>
          
          <div className="mt-2 text-[10px] text-gray-800">
            {mateReply.content}
          </div>
        </div>
      </div>
    </div>
  )
}