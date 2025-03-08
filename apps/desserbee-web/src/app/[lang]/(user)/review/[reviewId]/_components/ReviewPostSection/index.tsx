import { formatDate } from '@/app/[lang]/(user)/(menu)/(search)/store/_utils/date';
import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import type { Review } from "@repo/entity/src/review";
import Image from "next/image";
import ReviewPostActions from '../ReviewPostActions';

interface Props {
  review: Review;
}

export default async function ReviewPostSection({ review }: Props) {
  const { category, title, profileImage, nickname, createdAt } = review;
  return (
    <section className="border rounded-[10px] bg-[#ffffff] px-2 py-2">
      <div className="flex items-center justify-between px-4 py-2 gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#9F9F9F] text-[14px] font-semibold tracking-[-0.3px]" >
            <span className="">{category}</span>
            <span className="">{'>'}</span>
          </div>
          <span className="text-[#393939] text-[14px] font-semibold leading-normal tracking-[-0.3px]">{review.title}</span>
        </div>
      </div>

      {/* 게시글 내용 */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={!!profileImage ? profileImage : DefaultMaleAvatar}
              alt="profile-mate-detail"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[#393939] text-[12px] leading-normal tracking-[-0.24px]">{nickname}</span>
              <span className="text-[#9f9f9f] text-[12px] leading-normal tracking-[-0.24px]">{formatDate(createdAt)}</span>
            </div>
          </div>
          {/* <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#393939] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">댓글 {replyCount}</span>
            <span className="text-[#F5B01C] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">저장</span>
            <ReviewDetailSeeMoreButton />
          </div> */}
        </div>

        {/* <div className="mb-4">
          <p className="mb-2">장소: {place?.placeName}</p>
          <Link href={`${NavigationPathname.Map}?latitude=${place?.latitude}&longitude=${place?.longitude}`}>이 가게 위치 보러가기</Link>
        </div> */}

        {/* 액션 버튼 */}
        <ReviewPostActions review={review} />

      </div>
    </section>
  );
}