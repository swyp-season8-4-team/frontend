import type { StoreDetailInfoData } from '@repo/entity/src/store';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useContext, useOptimistic, useState } from 'react';
import { startTransition } from 'react';
import MateService from '@repo/usecase/src/mateService';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import { UserContext } from '@/contexts/UserContext';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { useRouter } from 'next/navigation';

interface DessertMateTabProps {
  mate: StoreDetailInfoData['mate']; // 자체가 배열로 타입 지정
}

export function DessertMateTab({ mate }: DessertMateTabProps) {
  // mate: {
  //   mateUuid: string;
  //   mateCategory: string;
  //   thumbnail: string;
  //   title: string;
  //   content: string;
  //   nickname: string;
  //   recruitYn: boolean;
  // saved:boolean

  const mateService = new MateService({
    mateRepository: new MateAPIRepository(),
  });
  const router = useRouter();
  const { user } = useContext(UserContext);
  const displayedMates = mate.slice(0, 3);

  const [isSaved, setIsSaved] = useState(false);
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
        addOptimistic(index);
        setIsSaved((prev) => !prev);
        if (!isSaved) {
          await mateService.save({ id: uuid, userId: user.id });
        } else {
          await mateService.cancelSave({ id: uuid, userId: user.id });
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
        <div className="w-full text-[10px] md:text-base text-center">
          아직 등록된 디저트 메이트 게시글이 없어요.
        </div>
        <div className="flex justify-end w-full py-3">
          <button onClick={handleGoCommunityMateBtnClick}>
            디저트 메이트 찾으러 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="font-semibold text-[12px] mb-3">디저트 메이트</div>
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
            <div className="bg-[#F6F6F6] rounded-[4.02px] p-[13px]" key={index}>
              <div className="flex justify-between items-center">
                <div className="text-[10px] px-1 md:px-2 md:py-1 md:text-[14px] h-fit border rounded-[40.24px] md:rounded-[60px] border-[#6F6F6F] text-[#6F6F6F]">
                  {/* <div className="text-[10px] md:text-[14px]"> */}
                  <div className="text-[8px] md:text-[12px]">
                    {mateCategory}
                  </div>
                </div>
                <div className="flex gap-x-[4.83px] items-center text-[10px] md:text-[14px]">
                  <div className="text-[10px] md:text-[14px]">
                    {recruitYn ? '모집중' : '마감'}
                  </div>
                  <div className="border-[#714115] rounded-full aspect-square border">
                    <button
                      className="w-[10.46px] h-[10.46px] md:w-[26px] md:h-[26px] flex justify-center items-center"
                      onClick={() => handleToggleSaved(mateUuid, index)}
                    >
                      <IconBookmark
                        className={cn(
                          saved ? 'text-[#AA6120]' : 'text-page',
                          'md:w-4 md:h-4 w-2 h-2 ',
                        )}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-[45px] h-[45px] m-1 aspect-square bg-[#D9D9D9] overflow-hidden  md:w-[97px] md:h-[97px]">
                  <Image
                    className="w-full h-full"
                    src={thumbnail}
                    width={50}
                    height={50}
                    alt={nickname}
                  />
                </div>
                <div className="flex flex-col leading-3">
                  <div className="font-semibold text-[10px] md:text-base">
                    {title}
                  </div>
                  <div className="text-[10px] md:text-[14px] font-medium ">
                    {content}
                  </div>
                  <div className="text-[10px] md:text-[14px] font-medium md:mt-[25px]">
                    {nickname}님
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="flex justify-end w-full py-3">
        <button onClick={handleGoCommunityMateBtnClick}>
          디저트 메이트 찾으러 가기
        </button>
      </div>
    </div>
  );
}
