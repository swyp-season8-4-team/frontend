import defaultImage from '@/assets/svg/image-default-mate.svg';
import Chip from '@repo/design-system/components/Chip';
import type { Mate } from '@repo/entity/src/mate';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import CommunityMateCardBookmarkButton from '../CommunityMateCardBookmarkButton';
import { Fragment } from 'react';

interface Props {
  mate: Mate;
}

export default function CommunityMateCard({ mate }: Props) {
  const { title, content, nickname, recruit, mateImage, mateCategory } = mate;

  const LinkChip = recruit ? Link : Fragment;

  return (
    <div className="flex flex-col gap-[12px] rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Chip
          className="w-[70px] rounded-[44.317px] border-[0.443px] border-[#6F6F6F] text-[12px]"
          text={mateCategory}
        />
        <div className="flex items-center gap-[9.076px]">
          {recruit && <span className="text-sm text-[#393939]">모집중</span>}
          <CommunityMateCardBookmarkButton mateId={mate.id} />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <Image
          alt={`${mate.id}-mate-image`}
          src={!!mateImage ? mateImage : defaultImage}
          width={44}
          height={44}
          className="h-16 w-16 rounded-md bg-[#f6f6f6]"
        />
        <div className="flex w-full flex-col gap-[12.1px]">
          <div className="flex flex-col gap-[4.54px]">
            <span className="mb-1 line-clamp-1 text-lg font-bold">{title}</span>
            <span className="mb-4 line-clamp-2 text-sm text-gray-600">
              {content}
            </span>
          </div>
          <div className="flex items-center justify-between self-stretch">
            <span className="text-sm text-gray-500">{nickname}</span>
            {recruit && (
              <LinkChip href={`/mate/${mate.id}`}>
                <Chip
                  className={cn(
                    'rounded-[75.63px] border-none px-[12.101px] py-[4.538px] text-white',
                    recruit ? 'bg-[#FFB700]' : 'bg-[#545454]',
                  )}
                  text={'참여하기'}
                />
              </LinkChip>
            )}
            {!recruit && (
              <Chip
                className={cn(
                  'gap-[6.05px] rounded-[75.63px] bg-[#545454] px-[12.101px] py-[4.538px] text-white',
                )}
                text="모집완료"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
