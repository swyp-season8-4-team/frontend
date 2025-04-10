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
    <div className="flex flex-col items-start gap-[10.704px] rounded-[11.893px] bg-white px-[9px] py-[9.515px]">
      <div className="flex justify-between items-center self-stretch">
        <Chip
          className="rounded-[44.317px] border-[0.443px] border-[#6F6F6F] text-[12px] w-[70px]"
          text={category}
        />
        <CommunityReviewBookmarkButton saved={saved} reviewId={review.id} />
      </div>
      <div className="flex items-center gap-[9.515px] self-stretch">
        <div
          className={cn(
            'flex items-center justify-center w-[66.6px] h-[66.6px]',
            !thumbnailImage ? 'bg-[#D9D9D9]' : '',
          )}
        >
          <Image
            src={thumbnailImage ? thumbnailImage : defaultImage}
            alt={`${title}-review-image`}
            width={thumbnailImage ? 66.6 : 44}
            height={thumbnailImage ? 89.46 : 44}
            className={thumbnailImage ? 'object-cover w-full h-full' : ''}
          />
        </div>
        <div className="flex flex-col items-start gap-[13.105px] flex-1">
          <div className="flex flex-col items-start gap-[4.914px] self-stretch">
            <span className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-[#393939] text-[13.105px] font-semibold tracking-[-0.393px]">
              {title}
            </span>
            <span className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-[#393939] text-[11.467px] font-medium tracking-[-0.344px]">
              {content}
            </span>
          </div>
          <div className="flex justify-between items-center self-stretch">
            <div className="flex items-center gap-[9.829px]">
              <span className="text-gray-800 text-xs font-medium tracking-tight">
                {nickname}
              </span>
              <span className="text-[#9F9F9F] text-[11.467px] font-medium tracking-[-0.344px]">
                {formatDate(updatedAt)} 조회:{viewCount}
              </span>
            </div>
            <Link href={`/review/${review.id}`}>
              <Chip
                className={cn(
                  'border-none rounded-[75.63px] px-[12.101px] py-[4.538px] text-white bg-[#FFB700]',
                )}
                text={'보러가기'}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
