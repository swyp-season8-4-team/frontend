import defaultImage from "@/assets/svg/image-default-mate.svg";
import Chip from "@repo/design-system/components/Chip";
import type { Mate } from "@repo/entity/src/mate";
import { cn } from "@repo/ui/lib/utils";
import Image from 'next/image';
import Link from "next/link";
import CommunityMateCardHeartButton from "../CommunityMateCardHeartButton";
import { Fragment } from "react";

interface Props {
  mate: Mate;
}

export default function CommunityMateCard({ mate }: Props) {
  const { title, content, nickname, recruit, mateImage, mateCategory } = mate;
  
  const LinkChip = recruit ? Link : Fragment;

  return (
    <div
      className="flex flex-col bg-white rounded-xl p-4 shadow-sm gap-[6.78px]"
    >
      <div className="flex justify-between items-center">
        <Chip text={mateCategory} />
        <div className="flex items-center gap-[9.076px]">
          {recruit && <span className="text-[#393939] text-sm">모집중</span>}
          <CommunityMateCardHeartButton />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <Image
          alt={``}
          src={!!mateImage ? mateImage : defaultImage}
          width={64}
          height={64}
          className="w-16 h-16 rounded-md"
        />
        <div className="flex flex-col gap-[12.1px] w-full">
        <div className="flex flex-col gap-[4.54px]">
          <span className="text-lg font-bold mb-1 line-clamp-1">{title}</span>
          <span className="text-gray-600 text-sm mb-4 line-clamp-2">{content}</span>
        </div>
          <div className="flex justify-between items-center self-stretch">
            <span className="text-gray-500 text-sm">{nickname}</span>
            {recruit && <LinkChip href={`/mate/${mate.id}`}>
              <Chip
                className={cn("border-none rounded-[75.63px] px-[12.101px] py-[4.538px] text-white",recruit ? "bg-[#FFB700]" : "bg-[#545454]")}
                text={'참여하기'}
              />
            </LinkChip>}
            {!recruit && (
              <Chip className={cn("gap-[6.05px] rounded-[75.63px] px-[12.101px] py-[4.538px] text-white bg-[#545454]")} text="모집완료" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}