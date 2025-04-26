import { formatDate } from '@/app/[lang]/(user)/store/_utils/date';
import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import type { Review } from '@repo/entity/src/review';
import Image from 'next/image';
import Link from 'next/link';
import ReviewPostActions from '../ReviewPostActions';
import { NavigationPathname } from '@repo/entity/src/navigation';

interface Props {
  review: Review;
}

export default async function ReviewPostSection({ review }: Props) {
  const {
    category,
    title,
    contents,
    profileImage,
    nickname,
    place,
    createdAt,
  } = review;

  return (
    <section className="rounded-[10px] border bg-[#ffffff] px-2 py-2">
      <div className="flex items-center justify-between gap-6 px-4 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.3px] text-[#9F9F9F]">
            <span className="">{category}</span>
            <span className="">{'>'}</span>
          </div>
          <span className="text-[14px] font-semibold leading-normal tracking-[-0.3px] text-[#393939]">
            {title}
          </span>
        </div>
      </div>

      {/* 게시글 내용 */}
      <div className="px-4 py-3">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={profileImage ? profileImage : DefaultMaleAvatar}
                alt="profile-mate-detail"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] leading-normal tracking-[-0.24px] text-[#393939]">
                {nickname}
              </span>
              <span className="text-[12px] leading-normal tracking-[-0.24px] text-[#9f9f9f]">
                {formatDate(createdAt)}
              </span>
            </div>
          </div>
          {/* <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#393939] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">댓글 {replyCount}</span>
            <span className="text-[#F5B01C] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">저장</span>
            <ReviewDetailSeeMoreButton />
          </div> */}
        </div>

        {!!place?.latitude && !!place?.longitude && (
          <div className="mb-4 flex flex-col gap-[4px]">
            <p className="text-[12px] font-medium tracking-[-0.27px] text-[#393939]">
              장소: {place?.name}
            </p>
            <Link
              className="text-[12px] font-medium tracking-[-0.27px] text-[#393939] underline"
              href={`${NavigationPathname.Map}?latitude=${place?.latitude}&longitude=${place?.longitude}&keyword=${place?.name}`}
            >
              이 가게 위치 보러가기
            </Link>
          </div>
        )}

        {/* 컨텐츠 렌더링 */}
        <div className="mb-6 gap-[12px] space-y-4 text-gray-700">
          {contents.map((content, index) => {
            if (content.type === 'text') {
              return (
                <p
                  key={`text-${index}`}
                  className="text-[12px] leading-relaxed tracking-[-0.27px] text-[#393939]"
                >
                  {content.value}
                </p>
              );
            } else if (content.type === 'image') {
              return (
                <div key={`image-${content.imageId}`}>
                  <Image
                    src={content.imageUrl || ''}
                    alt={`리뷰 이미지 ${content.imageIndex !== undefined ? content.imageIndex + 1 : index + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-full rounded-lg"
                    priority={index < 2}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* 액션 버튼 */}
        <ReviewPostActions review={review} />
      </div>
    </section>
  );
}
