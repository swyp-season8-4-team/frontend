import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png'
import DefaultFemaleAvatar from '@/assets/images/image-default-female-profile.png';
import type { Mate } from "@repo/entity/src/mate";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import { formatDate } from "@repo/utility/src/date";
import Image from "next/image";
import MateApplyState from "../MateApplyState";
import MateDetailSeeMoreButton from '../MateDetailSeeMoreButton';
import MatePostActions from '../MatePostActions';
import Link from 'next/link';
import { NavigationPathname } from '@repo/entity/src/navigation';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(), 
});

interface Props {
  mate: Mate;
  replyCount: number;
}

export default async function MatePostSection({ mate, replyCount }: Props) {
  const [myTeamMembersResult] = await Promise.allSettled([
    mateService.getMyTeamMembers({
      id: mate.id,
    }),
  ]);

  const myTeamMembers = myTeamMembersResult.status === 'fulfilled' ? myTeamMembersResult.value : [];

  const {
    mateCategory,
    mateImage,
    title,
    content,
    place,
    nickname,
    profileImage,
    updatedAt,
    gender
  } = mate;

  const profileImageUrl = !!profileImage ? profileImage : gender === 'MALE' ? DefaultMaleAvatar : DefaultFemaleAvatar;

  return (
    <section className="border rounded-[10px] bg-[#ffffff] px-2 py-2">
      <div className="flex items-center justify-between px-4 py-2 gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#9F9F9F] text-[14px] font-semibold tracking-[-0.3px]" >
            <span className="">{mateCategory}</span>
            <span className="">{'>'}</span>
          </div>
          <span className="text-[#393939] text-[14px] font-semibold leading-normal tracking-[-0.3px]">{title}</span>
        </div>
        <MateApplyState myTeamMembers={myTeamMembers}/>
      </div>

      {/* 게시글 내용 */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={profileImageUrl}
              alt="profile-mate-detail"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[#393939] text-[12px] leading-normal tracking-[-0.24px]">{nickname}</span>
              <span className="text-[#9f9f9f] text-[12px] leading-normal tracking-[-0.24px]">{formatDate(updatedAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#393939] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">댓글 {replyCount}</span>
            {/* <span className="text-[#F5B01C] text-[12px] font-weight-500 leading-normal tracking-[-0.21px]">저장</span> */}
            <MateDetailSeeMoreButton />
          </div>
        </div>

        {!!place?.latitude && !!place?.longitude && <div className="flex flex-col gap-[4px] mb-4">
          <p className="text-[#393939] text-[12px] font-medium tracking-[-0.27px]">장소: {place?.placeName}</p>
          <Link 
            className="text-[#393939] text-[12px] font-medium tracking-[-0.27px] underline"
            href={`${NavigationPathname.Map}?latitude=${place?.latitude}&longitude=${place?.longitude}&keyword=${place?.placeName}`}
          >
            이 가게 위치 보러가기
          </Link>
        </div>}
        
        <div className="text-gray-700 mb-6">
          <p className="text-[#393939] text-[12px] leading-normal tracking-[-0.27px]">{content}</p>
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
        <MatePostActions mate={mate}/>

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
  )
}