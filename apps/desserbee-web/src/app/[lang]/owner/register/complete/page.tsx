'use client';

import { useEffect } from 'react';
import { useRegister } from '../_contexts/RegisterContext';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import IconPicture from '@repo/design-system/components/icons/IconPicture';

export default function RegisterCompletePage() {
  const router = useRouter();
  const { storeData, completeStep, goToNextStep } = useRegister();

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리 작업 (선택 사항)
    };
  }, []);

  const goToMapPage = () => {
    router.replace(
      `${NavigationPathname.Map}?latitude=${storeData.latitude}&longitude=${storeData.longitude}&keyword=${storeData.name}`,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[34px]">
      <div className="flex flex-col gap-[21px]">
        <div className="text-[22px] font-medium">
          가게를 성공적으로 등록했어요!
        </div>
        <div className="text-sm font-semibold text-[#B3B3B3]">
          대시보드는 현재 PC 기기에서만 확인 가능합니다.
        </div>
      </div>
      <div className="flex h-full min-h-[254.35px] w-full max-w-[242px] flex-col gap-[9.88px] rounded-[12.35px] border-[1.23px] border-[#ABABAB] p-5">
        <div
          className={cn(
            'h-[111px] overflow-hidden rounded-[7.41px]',
            storeData.storeImageFiles?.[0] ? 'bg-white' : 'bg-[#D9D9D9]',
          )}
        >
          {storeData.storeImageFiles?.[0] ? (
            <Image
              src={URL.createObjectURL(storeData.storeImageFiles[0])}
              alt="가게 대표 이미지"
              width={200}
              height={111}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-[44.21px] w-[44.21px]">
                <IconPicture className="h-full w-full text-[#545454]" />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="text-[17.29px] font-semibold">{storeData.name}</div>
          <div className="text-[14.82px]">
            {storeData.address + ' ' + storeData.detailAddress}
          </div>
          <div className="text-[14.82px]">2023-1010</div>
        </div>
      </div>
      <div className="fixed bottom-4 left-0 right-0 mx-4 flex gap-x-2">
        <button
          onClick={goToMapPage}
          className="w-full rounded-[6px] bg-[#221414] p-[10px] text-center text-white opacity-50"
        >
          지도에서 내 가게 보기
        </button>
      </div>
    </div>
  );
}
