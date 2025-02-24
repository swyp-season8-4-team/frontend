import Chip from "@repo/design-system/components/Chip";
import CommunityMateCardHeartButton from "../CommunityMateCardHeartButton";
import { cn } from "@repo/ui/lib/utils";
import Image from 'next/image';
import type { Mate } from "@repo/entity/src/mate";
import Link from "next/link";
import { Fragment } from "react";
import defaultImage from "../../_assets/images/image-default-mate.png";
import { nanoid } from "nanoid";
interface Props {
  mate: Mate;
}

export default function CommunityMateCard({ mate }: Props) {
  const { title, content, nickname, recruit, mateImage, mateCategory } = mate;

  const LinkChip = recruit ? Link : Fragment;

  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <Chip text={mateCategory} />
        <div className="flex items-center gap-[9.076px]">
          {recruit && <span className="text-[#393939] text-sm">모집중</span>}
          <CommunityMateCardHeartButton />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <Image
          alt={``}
          src={mateImage.length > 0 ? mateImage[0] : defaultImage}
          width={97}
          height={97}
          className="w-16 h-16 rounded-md"
        />
        <div className="flex flex-col gap-[12.1px] w-full">
          <div className="flex flex-col gap-[4.54px]">
            <span className="text-lg font-bold mb-1">{title}</span>
            <span className="text-gray-600 text-sm mb-4">{content}</span>
          </div>
          <div className="flex justify-between items-center self-stretch">
            <span className="text-gray-500 text-sm">{nickname}</span>
            {recruit && <LinkChip href={`/mate/${mate.id}`}>
              <Chip
                className={cn("gap-[6.05px] rounded-[75.63px] px-[12.101px] py-[4.538px] text-white",recruit ? "bg-[#FFB700]" : "bg-[#545454]")}
                text={'참여하기'}
              />
            </LinkChip>}
            {!recruit && <Chip className={cn("gap-[6.05px] rounded-[75.63px] px-[12.101px] py-[4.538px] text-white",recruit ? "bg-[#FFB700]" : "bg-[#545454]")} text="모집완료" />}
          </div>
          
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        {/* <span>장소: {post.location}</span> */}
        <div className="flex gap-2">
          {/* <span>인원: {post.currentMembers}명 / 총 {post.maxMembers}명</span> */}
          {/* <button
            className={`px-4 py-1 rounded-full text-white ${
              post.status === '모집중' ? 'bg-yellow-400' : 'bg-gray-400'
            }`}
          >
            {post.status}
          </button> */}
        </div>
      </div>
    </div>
  )
}