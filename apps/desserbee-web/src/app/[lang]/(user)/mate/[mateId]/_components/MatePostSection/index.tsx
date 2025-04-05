import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import DefaultFemaleAvatar from '@/assets/images/image-default-female-profile.png';
import type { Mate } from '@repo/entity/src/mate';
import { formatDate } from '@repo/utility/src/date';
import Image from 'next/image';
import MateApplyState from '../MateApplyState';
import MateDetailSeeMoreButton from '../MateDetailSeeMoreButton';
import MatePostActions from '../MatePostActions';
import Link from 'next/link';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { getMyTeamMembers } from './action';

interface Props {
  mate: Mate;
  replyCount: number;
}

export default async function MatePostSection({ mate, replyCount }: Props) {
  const myTeamMembers = await getMyTeamMembers(mate.id);

  const {
    mateCategory,
    mateImage,
    title,
    content,
    place,
    nickname,
    profileImage,
    updatedAt,
    gender,
  } = mate;

  const profileImageUrl = !!profileImage
    ? profileImage
    : gender === 'MALE'
      ? DefaultMaleAvatar
      : DefaultFemaleAvatar;

  return (
    <section className="rounded-[10px] border bg-[#ffffff] px-2 py-2">
      <div className="flex items-center justify-between gap-6 px-4 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.3px] text-[#9F9F9F]">
            <span className="">{mateCategory}</span>
            <span className="">{'>'}</span>
          </div>
          <span className="text-[14px] font-semibold leading-normal tracking-[-0.3px] text-[#393939]">
            {title}
          </span>
        </div>
        <MateApplyState myTeamMembers={myTeamMembers} />
      </div>

      {/* 게시글 내용 */}
      <div className="px-4 py-3">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={profileImageUrl}
              alt="profile-mate-detail"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[12px] leading-normal tracking-[-0.24px] text-[#393939]">
                {nickname}
              </span>
              <span className="text-[12px] leading-normal tracking-[-0.24px] text-[#9f9f9f]">
                {formatDate(updatedAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-weight-500 text-[12px] leading-normal tracking-[-0.21px] text-[#393939]">
              댓글 {replyCount}
            </span>
            {/* <span className="text-[#F5B01C] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">저장</span> */}
            <MateDetailSeeMoreButton />
          </div>
        </div>

        {!!place?.latitude && !!place?.longitude && (
          <div className="mb-4 flex flex-col gap-[4px]">
            <p className="text-[12px] font-medium tracking-[-0.27px] text-[#393939]">
              장소: {place?.placeName}
            </p>
            <Link
              className="text-[12px] font-medium tracking-[-0.27px] text-[#393939] underline"
              href={`${NavigationPathname.Map}?latitude=${place?.latitude}&longitude=${place?.longitude}&keyword=${place?.placeName}`}
            >
              이 가게 위치 보러가기
            </Link>
          </div>
        )}

        <div className="mb-6 text-gray-700">
          <p className="text-[12px] leading-normal tracking-[-0.27px] text-[#393939]">
            {content}
          </p>
        </div>

        {/* 이미지 */}
        {!!mateImage && (
          <div className="mb-4">
            <Image
              src={mateImage}
              alt="post-mate-image"
              width={800}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* 액션 버튼 */}
        <MatePostActions mate={mate} />

        {/* <div className="flex items-center gap-2 py-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={!!profileImage ? profileImage : DefaultMaleAvatar}
              alt="profile-add-mate"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <Link 
            href={``} 
            className="flex items-center gap-2 w-full text-[#393939] text-[14px]"
          >
            <span>{nickname}님의 게시물 더보기</span>
            <span className="text-gray-400">›</span>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
