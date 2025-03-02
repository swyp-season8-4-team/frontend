'use client';

import Image from 'next/image';

import ReadyBee from '@/assets/images/bee_icon_ready.png';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/components/button';

export default function ReadyPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col justify-center items-center w-full h-full p-[186px_57.406px_185.712px_58px] gap-[20.249px]">
      <Image
        src={ReadyBee}
        alt="review-banner"
        width={106.037}
        height={104.5}
      />
      <span className="text-[#393939] text-[14px] font-semibold leading-[130%] tracking-[-0.42px]">디저트 가게 리뷰는 아직 준비중입니다!</span>
      <Button
        variant="default"
        className="flex w-full text-white text-[20px] font-bold leading-[130%] tracking-[-0.84px] text-center items-center py-[15px] rounded-[100px] bg-[#FFB700]"
        onClick={() => router.back()}
      >
        돌아가기
      </Button>
    </main>
  )
}
