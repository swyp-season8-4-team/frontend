'use client';

import { useEffect } from 'react';
import { useRegister } from '../_contexts/RegisterContext';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import IconPicture from '@repo/design-system/components/icons/IconPicture';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import IconLocationOutline from '@repo/design-system/components/icons/IconLocationOutline2';

export default function RegisterCompletePage() {
  const router = useRouter();
  const { storeData } = useRegister();

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    console.log(storeData);
    return () => {
      // 컴포넌트 언마운트 시 정리 작업 (선택 사항)
    };
  }, []);

  const goToMapPage = () => {
    router.replace(
      `${NavigationPathname.Map}?latitude=${storeData.latitude}&longitude=${storeData.longitude}&keyword=${storeData.name}`,
    );
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center">
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center gap-[34px] py-10">
          <div className="flex flex-col gap-2">
            <div className="text-primary-20 text-center text-[22px] font-medium">
              <div>고생하셨습니다 사장님</div>
            </div>
            <div className="text-primary-40 text-center text-sm">
              <div>메인 지도에서 '내 취향' 을 누르면</div>
              <div>내 취향 100% 가게 리스트를 볼 수 있어요</div>
            </div>
          </div>
          <div className="flex h-full min-h-[254.35px] w-full max-w-[242px] flex-col gap-[9.88px] rounded-[12.35px] border-[#ABABAB] bg-white p-5 shadow-[0px_2px_6px_2px_#28201426]">
            <div
              className={cn(
                'h-[210px] overflow-hidden rounded-[7.41px]',
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
              <div className="text-lg font-semibold">{storeData.name}</div>
              <span className="inline-block text-xs leading-[20px]">
                <span className="mr-1 inline-block h-[15px] w-[15px] align-text-bottom leading-[20px]">
                  <IconLocationOutline className="text-nuetral-30 h-full w-full" />
                </span>
                {storeData.address + ' ' + storeData.detailAddress}
              </span>
            </div>

            <div className="text-xs text-neutral-50">
              {formatDate(new Date())}
            </div>
          </div>
        </div>
      </div>

      <div className="px-base flex w-full flex-col gap-y-5 py-5 pb-10">
        <button onClick={goToMapPage}>
          <OliveButton text="사장님 대시보드" />
        </button>
        <button
          onClick={goToMapPage}
          className="text-secondary-30 w-full text-center text-xs"
        >
          메인으로
        </button>
      </div>
    </div>
  );
}
