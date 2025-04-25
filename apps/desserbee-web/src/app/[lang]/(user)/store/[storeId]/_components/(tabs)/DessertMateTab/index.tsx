import type { StoreDetailInfoData } from '@repo/entity/src/store';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useContext, useOptimistic } from 'react';
import { startTransition } from 'react';
import MateService from '@repo/usecase/src/mateService';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import { UserContext } from '@/contexts/UserContext';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { useRouter } from 'next/navigation';
import { commonErrorHandler } from '@/error/commonErrorHandler';

interface DessertMateTabProps {
  mate: StoreDetailInfoData['mate']; // 자체가 배열로 타입 지정
}

export function DessertMateTab({ mate }: DessertMateTabProps) {
  const mateService = new MateService({
    mateRepository: new MateAPIRepository(),
  });
  const router = useRouter();
  const { user } = useContext(UserContext);
  const displayedMates = mate.slice(0, 3);

  const [optimisticState, addOptimistic] = useOptimistic(
    displayedMates,
    (state, index) => {
      const newState = [...state];
      newState[index as number].saved = !newState[index as number].saved;
      return newState;
    },
  );

  const handleToggleSaved = (uuid: string, index: number) => {
    startTransition(async () => {
      if (!user) {
        router.replace('/sign-in');
      } else {
        const currentSaved = optimisticState[index].saved;
        addOptimistic(index);
        if (currentSaved) {
          await commonErrorHandler(
            mateService.cancelSave({ id: uuid, userId: user.id }),
            { isClient: true, router },
          );
        } else {
          await commonErrorHandler(
            mateService.save({ id: uuid, userId: user.id }),
            { isClient: true, router },
          );
        }
      }
    });
  };

  const handleGoCommunityMateBtnClick = () => {
    if (!user) {
      router.replace('/sign-in');
    } else {
      router.replace(`${NavigationPathname.CommunityDessertMate}`);
    }
  };

  if (mate.length === 0) {
    return (
      <div>
        <div className="text-[10px] font-semibold md:text-lg">
          디저트 메이트
        </div>
        <div className="w-full text-center text-[10px] md:text-base">
          아직 등록된 디저트 메이트 게시글이 없어요.
        </div>
        <div className="flex w-full justify-end py-3">
          <button
            className="text-[10px] md:text-base"
            onClick={handleGoCommunityMateBtnClick}
          >
            디저트 메이트 찾으러 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 text-[10px] font-semibold md:text-lg">
        디저트 메이트
      </div>
      <div className="flex flex-col gap-y-[5px] md:gap-y-3">
        {optimisticState.map(
          (
            {
              mateCategory,
              thumbnail,
              title,
              content,
              nickname,
              recruitYn,
              saved,
              mateUuid,
            },
            index,
          ) => (
            <div className="rounded-[4.02px] bg-[#F6F6F6] p-[13px]" key={index}>
              <div className="flex items-center justify-between">
                <div className="h-fit rounded-[40.24px] border border-[#6F6F6F] px-1 text-[10px] text-[#6F6F6F] md:rounded-[60px] md:px-2 md:py-1 md:text-[14px]">
                  {/* <div className="text-[10px] md:text-[14px]"> */}
                  <div className="text-[8px] md:text-[12px]">
                    {mateCategory}
                  </div>
                </div>
                <div className="flex items-center gap-x-[4.83px] text-[10px] md:text-[14px]">
                  <div className="text-[10px] md:text-[14px]">
                    {recruitYn ? '모집중' : '마감'}
                  </div>
                  <div className="aspect-square rounded-full border border-[#714115]">
                    <button
                      className="flex h-[10.46px] w-[10.46px] items-center justify-center md:h-[26px] md:w-[26px]"
                      onClick={() => handleToggleSaved(mateUuid, index)}
                    >
                      <IconBookmark
                        className={cn(
                          saved ? 'text-[#AA6120]' : 'text-page',
                          'h-2 w-2 md:h-4 md:w-4',
                        )}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {thumbnail && (
                  <div className="m-1 aspect-square h-[45px] w-[45px] flex-shrink-0 overflow-hidden bg-[#D9D9D9] md:h-[97px] md:w-[97px]">
                    <Image
                      className="h-full w-full"
                      src={thumbnail}
                      width={50}
                      height={50}
                      alt={nickname}
                    />
                  </div>
                )}
                <div className="flex flex-col leading-3">
                  <div className="text-[10px] font-semibold md:text-base">
                    {title}
                  </div>
                  <div className="text-[10px] font-medium md:text-[14px]">
                    {content}
                  </div>
                  <div className="text-[10px] font-medium md:mt-[25px] md:text-[14px]">
                    {nickname}님
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="flex w-full justify-end py-3">
        <button onClick={handleGoCommunityMateBtnClick}>
          디저트 메이트 찾으러 가기
        </button>
      </div>
    </div>
  );
}
