import Chip from '@repo/design-system/components/Chip';
import type { Review } from '@repo/entity/src/review';
import Image from 'next/image';
import CommunityReviewBookmarkButton from '../CommunityReviewBookmarkButton';
import defaultImage from '@/assets/svg/image-default-mate.svg';
import { cn } from '@repo/ui/lib/utils';
import { formatDate } from '@repo/utility/src/date';
import Link from 'next/link';

interface Props {
  review: Review;
}

export default function CommunityReviewCard({ review }: Props) {
  const { title, contents, nickname, category, updatedAt, viewCount, saved } =
    review;

  const thumbnailImage = contents.find(
    (content) => content.type === 'image',
  )?.imageUrl;
  const content = contents.find((content) => content.type === 'text')?.value;

  return (
    <Link href={`/review/${review.id}`}>
      <div className="flex flex-col rounded-[10px] border border-[#EFEDEB] bg-white p-[10px]">
        <div className="flex w-full gap-[10px]">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[5.71px]">
            <Image
              alt={`review-image`}
              src={thumbnailImage || defaultImage}
              width={80}
              height={80}
              className={cn(
                'h-full w-full',
                thumbnailImage ? 'object-cover' : 'object-contain',
              )}
            />
            <div
              className="absolute left-1 top-1"
              // onClick={handleBookmarkClick}
            >
              <CommunityReviewBookmarkButton
                saved={saved}
                reviewId={review.id}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start gap-[13.105px]">
            <div className="flex items-center justify-between self-stretch">
              <Chip
                className="bg-success-80 rounded-[99px] border-[0.443px] px-[6px] py-[3px] text-[10px]"
                text={category}
              />
              <div className="text-neutral-30 text-[10px]">
                조회:{viewCount}
              </div>
            </div>
            <div className="flex flex-col items-start gap-[4.914px] self-stretch">
              <span className="line-clamp-1 text-sm font-medium">{title}</span>
              <span className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-[11.467px] font-medium tracking-[-0.344px] text-[#393939]">
                {content}
              </span>
            </div>
            <div className="flex w-full items-center justify-between gap-[9.829px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {/* <span className="h-4 w-4 rounded-full bg-[#DFDFDF]"></span> */}
                  <span className="text-neutral-30 text-[10px]">
                    {nickname}
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-neutral-50">
                {formatDate(updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
