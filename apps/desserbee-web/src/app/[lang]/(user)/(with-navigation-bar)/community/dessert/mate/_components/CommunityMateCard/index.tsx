import defaultImage from '@/assets/svg/image-default-mate.svg';
import Chip from '@repo/design-system/components/Chip';
import type { Mate } from '@repo/entity/src/mate';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import CommunityMateCardBookmarkButton from '../CommunityMateCardBookmarkButton';
import IconPeople from '@repo/design-system/components/icons/IconPeople';
import IconLocationOutline2 from '@repo/design-system/components/icons/IconLocationOutline2';

interface Props {
  mate: Mate;
}

export default function CommunityMateCard({ mate }: Props) {
  const { title, content, nickname, recruit, mateImage, mateCategory } = mate;

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link href={`/mate/${mate.id}`}>
      <div className="flex flex-col rounded-[10px] border border-[#EFEDEB] bg-white p-[10px]">
        <div className="flex w-full gap-[10px]">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[5.71px]">
            <Image
              alt={`${mate.id}-mate-image`}
              src={mateImage || defaultImage}
              width={80}
              height={80}
              className={cn(
                'h-full w-full',
                mateImage ? 'object-cover' : 'object-contain',
              )}
            />
            <div
              className="absolute left-1 top-1"
              onClick={handleBookmarkClick}
            >
              <CommunityMateCardBookmarkButton mateId={mate.id} />
            </div>
          </div>
          <div className="flex w-full flex-col justify-between gap-[2px]">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <Chip
                  className="bg-success-80 rounded-[99px] border-[0.443px] px-[6px] py-[3px] text-[10px]"
                  text={mateCategory}
                />
                {recruit ? (
                  <span className="text-error-20 bg-error-90 rounded-[99px] border-[0.443px] px-[6px] py-[3px] text-[10px]">
                    모집중
                  </span>
                ) : (
                  <span className="text-neutral-30 bg-neutral-70 rounded-[99px] border-[0.443px] px-[6px] py-[3px] text-[10px]">
                    모집마감
                  </span>
                )}
              </div>
              {/* <div className="text-neutral-40 flex items-center gap-1">
                <div className="h-3 w-3 md:h-4 md:w-4">
                  <IconPeople className="h-full w-full" />
                </div>
                <span className="text-[11px] font-medium"> 2/5</span>
              </div> */}
            </div>
            <span className="line-clamp-1 text-sm font-medium">{title}</span>
            {/* <div className="flex items-center gap-1">
              <div className="h-3 w-3">
                <IconLocationOutline2 className="text-neutral-40 h-full w-full" />
              </div>
              <div className="text-neutral-40 text-xs">모임 장소명</div>
            </div> */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {/* <span className="h-4 w-4 rounded-full bg-[#DFDFDF]"></span> */}
                <span className="text-neutral-30 text-[10px]">{nickname}</span>
              </div>
              {/* <div className="text-[10px] text-neutral-50">2025.01.28</div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
