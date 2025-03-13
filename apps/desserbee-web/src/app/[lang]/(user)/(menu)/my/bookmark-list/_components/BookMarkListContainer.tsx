'use client';

import Image from 'next/image';
// import mapImg from '../_assets/svg/map.svg';
import houseImg from '../_assets/svg/house.svg';
import beeImg from '../_assets/svg/bee.svg';
import type { SavedMate } from '@repo/entity/src/mate';
import { MyPageSubMenuPageHeader } from '../../_components/MyPageSubMenuPageHeader';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import type { SavedListData } from '@repo/entity/src/store';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import { getIconColor } from '../../../(search)/map/_utils/iconColor';
import { cn } from '@repo/ui/lib/utils';
import type { SavedReviewListResponse } from '@repo/entity/src/review';

interface BookMarkListContainerProps {
  savedStoreList: SavedListData[];
  // savedReview: SavedReviewListResponse;
  savedReview: any[];
  mateList: SavedMate[];
}

export function BookMarkListContainer({
  savedStoreList,
  savedReview = [],
  mateList,
}: BookMarkListContainerProps) {
  const router = useRouter();
  const handleMoreSavedStoreBtnClick = () => {
    router.push(`${NavigationPathname.Map}?sidebar=true`);
  };

  const handleMoreSavedReviewBtnClick = () => {
    router.push(`${NavigationPathname.MySavedReview}`);
  };

  const hanleMoreDessertMateBtnClick = () => {
    router.push(`${NavigationPathname.MySavedDesssertMate}`);
  };
  return (
    <>
      <div>
        <MyPageSubMenuPageHeader title="저장 목록" />
      </div>
      <div className="flex flex-col gap-6 md:gap-[61px] px-base">
        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] md:text-[22px] font-semibold">
            저장한 가게 리스트
          </div>
          {savedStoreList.length !== 0 ? (
            <div>
              <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
                {savedStoreList.map((list) => (
                  <div
                    key={list.listId}
                    className="bg-white rounded-[4.01px] w-full aspect-square flex justify-center items-center"
                  >
                    <IconFlower
                      className={cn(
                        getIconColor(list.iconColorId),
                        'w-2/3 h-2/3',
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end">
                <button
                  onClick={handleMoreSavedStoreBtnClick}
                  className="text-[10px] md:text-lg"
                >
                  더보기
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-[10px] md:text-base flex items-center justify-center w-full">
              <div className="w-1/4 aspect-square flex items-center justify-center text-nowrap">
                저장한 가게 리스트가 없습니다.
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] md:text-[22px] font-semibold">
            저장한 리뷰
          </div>
          {savedReview.length !== 0 ? (
            <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
              <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
                <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
                  {Array.from([1, 2, 3, 4]).map(
                    (
                      store,
                      index, //TODO: API 완성되면 이미지 여부에 따라
                    ) => (
                      <div
                        key={store}
                        className="bg-[#D9D9D9] rounded-[4.01px] w-full overflow-hidden aspect-square relative flex items-center justify-center"
                      >
                        <div
                          className={
                            index === 0 //TODO: API 완성되면 이미지 여부에 따라
                              ? 'w-full h-full relative'
                              : 'w-1/2 h-1/2 relative'
                          }
                        >
                          <Image
                            src={store ? houseImg : houseImg} //TODO: API 완성되면 이미지 여부에 따라
                            fill
                            alt="저장한 디저트 메이트"
                            className={
                              index === 0 ? 'object-cover' : 'object-contain' //TODO: API 완성되면 이미지 여부에 따라
                            }
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="w-full flex justify-end">
                  <button
                    onClick={handleMoreSavedReviewBtnClick}
                    className="text-[10px] md:text-lg"
                  >
                    더보기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-[10px] md:text-base flex items-center justify-center w-full">
              <div className="w-1/4 aspect-square flex items-center justify-center text-nowrap">
                저장한 커뮤니티 리뷰가 없습니다.
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] md:text-[22px] font-semibold">
            저장한 디저트 메이트
          </div>
          {mateList.length !== 0 ? (
            <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
              <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
                {mateList.map((mate) => (
                  <div
                    key={mate.mateUuid}
                    className="bg-[#D9D9D9] rounded-[4.01px] w-full overflow-hidden aspect-square relative flex items-center justify-center"
                  >
                    <div
                      className={
                        mate.mateImage
                          ? 'w-full h-full relative'
                          : 'w-1/2 h-1/2 relative'
                      }
                    >
                      <Image
                        src={mate.mateImage ? mate.mateImage : beeImg}
                        fill
                        alt="저장한 디저트 메이트"
                        className={
                          mate.mateImage ? 'object-cover' : 'object-contain'
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end">
                <button
                  onClick={hanleMoreDessertMateBtnClick}
                  className="text-[10px] md:text-lg"
                >
                  더보기
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-[10px] md:text-base flex items-center justify-center w-full">
              <div className="w-1/4 aspect-square flex items-center justify-center text-nowrap">
                저장한 디저트 메이트가 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
