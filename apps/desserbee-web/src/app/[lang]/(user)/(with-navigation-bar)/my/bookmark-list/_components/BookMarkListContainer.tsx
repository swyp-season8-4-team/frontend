'use client';

import Image from 'next/image';
import houseImg from '../_assets/svg/house.svg';
import beeImg from '../_assets/svg/bee.svg';
import type { SavedMate } from '@repo/entity/src/mate';
import { MyPageSubMenuPageHeader } from '../../_components/MyPageSubMenuPageHeader';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import type { SavedListData } from '@repo/entity/src/store';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import { getIconColor } from '../../../map/_utils/iconColor';
import { cn } from '@repo/ui/lib/utils';
import type { SavedReviewListResponse } from '@repo/entity/src/review';

interface BookMarkListContainerProps {
  savedStoreList: SavedListData[];
  savedReview: SavedReviewListResponse;
  mateList: SavedMate[];
}

export function BookMarkListContainer({
  savedStoreList,
  savedReview,
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
      <div className="px-base flex flex-col gap-6 md:gap-[61px]">
        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] font-semibold md:text-[22px]">
            저장한 가게 리스트
          </div>
          {savedStoreList.length !== 0 ? (
            <div>
              <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
                {savedStoreList.map((list) => (
                  <div
                    key={list.listId}
                    className="flex aspect-square w-full items-center justify-center rounded-[4.01px] bg-white"
                  >
                    <IconFlower
                      className={cn(
                        getIconColor(list.iconColorId),
                        'h-2/3 w-2/3',
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-end">
                <button
                  onClick={handleMoreSavedStoreBtnClick}
                  className="text-[10px] md:text-lg"
                >
                  더보기
                </button>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center text-center text-[10px] md:text-base">
              <div className="flex aspect-square w-1/4 items-center justify-center text-nowrap">
                저장한 가게 리스트가 없습니다.
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] font-semibold md:text-[22px]">
            저장한 리뷰
          </div>
          {savedReview.reviews.length !== 0 ? (
            <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
              <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
                <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
                  {savedReview.reviews.map((review) => (
                    <div
                      key={review.reviewUuid}
                      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[4.01px] bg-[#D9D9D9]"
                    >
                      <div
                        className={
                          review.contents[0]?.imageUrl
                            ? 'relative h-full w-full'
                            : 'relative h-1/2 w-1/2'
                        }
                      >
                        <Image
                          src={
                            review.contents[0]?.imageUrl
                              ? review.contents[0]?.imageUrl
                              : houseImg
                          }
                          fill
                          alt="저장한 디저트 메이트"
                          className={
                            review.contents[0]?.imageUrl
                              ? 'object-cover'
                              : 'object-contain' //TODO: API 완성되면 이미지 여부에 따라
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full justify-end">
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
            <div className="flex w-full items-center justify-center text-center text-[10px] md:text-base">
              <div className="flex aspect-square w-1/4 items-center justify-center text-nowrap">
                저장한 커뮤니티 리뷰가 없습니다.
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] font-semibold md:text-[22px]">
            저장한 디저트 메이트
          </div>
          {mateList.length !== 0 ? (
            <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
              <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
                {mateList.map((mate) => (
                  <div
                    key={mate.mateUuid}
                    className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[4.01px] bg-[#D9D9D9]"
                  >
                    <div
                      className={
                        mate.mateImage
                          ? 'relative h-full w-full'
                          : 'relative h-1/2 w-1/2'
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
              <div className="flex w-full justify-end">
                <button
                  onClick={hanleMoreDessertMateBtnClick}
                  className="text-[10px] md:text-lg"
                >
                  더보기
                </button>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center text-center text-[10px] md:text-base">
              <div className="flex aspect-square w-1/4 items-center justify-center text-nowrap">
                저장한 디저트 메이트가 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
