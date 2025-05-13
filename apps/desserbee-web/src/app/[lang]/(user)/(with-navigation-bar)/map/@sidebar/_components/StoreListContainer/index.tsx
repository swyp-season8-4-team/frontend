'use client';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import IconFlower from '@repo/design-system/components/icons/IconFlower';
import IconLocation from '@repo/design-system/components/icons/IconLocation';
import IconWriting from '@repo/design-system/components/icons/IconWriting';
import IconCheck from '@repo/design-system/components/icons/IconCheck';
import IconX from '@repo/design-system/components/icons/IconX';
import { getIconColor } from '../../../_utils/iconColor';
import {
  type StoresInSavedListData,
  type ParentSavedListResponse,
} from '@repo/entity/src/store';
import {
  deleteStoreInSavedList,
  getParentSavedList,
  getStoresInSavedList,
} from './action';
import { NavigationPathGroup } from '@repo/entity/src/navigation';

interface StoreListContainerProps {
  listId: number;
  showStoreList: boolean;
}

export function StoreListContainer({
  listId,
  showStoreList,
}: StoreListContainerProps) {
  const router = useRouter();
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedStoreUuId, setSelectedStoreUuid] = useState<string | null>(
    null,
  );
  const [parentListInfo, setParentListInfo] =
    useState<ParentSavedListResponse>();
  const [storeData, setStoreData] = useState<StoresInSavedListData[]>([]);

  const handleEditBtnClick = () => {
    if (!isEditing) setSelectedStoreUuid(null);
    setIsEditing((prev) => !prev);
  };

  const handleListClose = () => {
    router.replace('?sidebar=true');
  };

  const handleStoreSelectBtnClick = (storeUuid: string) => {
    if (!isEditing) {
      router.push(`${NavigationPathGroup.Store + storeUuid}`);
    } else {
      setSelectedStoreUuid(storeUuid);
    }
  };

  const handleStoreDeleteBtnClick = async () => {
    if (!selectedStoreUuId) return;

    try {
      await deleteStoreInSavedList({
        listId,
        storeUuid: selectedStoreUuId,
      });

      setSelectedStoreUuid(null);

      await handleStoresInSavedListFetch();
    } catch (error) {
      console.error('가게 삭제 실패:', error);
    }
  };

  const handleStoresInSavedListFetch = useCallback(async () => {
    try {
      const parentList = await getParentSavedList({
        listId: Number(listId),
      });
      setParentListInfo(parentList);

      const response = await getStoresInSavedList({
        listId: Number(listId),
      });

      interface StoreListResponse {
        iconColorId: number;
        listId: number;
        listName: string;
        storeCount: number;
        storeData: StoresInSavedListData[];
        userUuid: string;
      }

      // 타입 단언 사용
      const typedResponse = response as unknown as StoreListResponse;

      if (typedResponse && typedResponse.storeData) {
        setStoreData(typedResponse.storeData);
      } else {
        setStoreData([]);
      }
    } catch {
      setStoreData([]);
    }
  }, [listId]);

  useEffect(() => {
    handleStoresInSavedListFetch();
  }, [handleStoresInSavedListFetch]);

  if (!parentListInfo) return null;

  return (
    <>
      {showStoreList && (
        <div
          className="z-modal fixed bottom-0 left-0 right-0 flex justify-center"
          onClick={handleListClose}
        >
          <div
            ref={bottomSheetRef}
            className={cn(
              'rounded-t-base w-full max-w-[768px] bg-white',
              'px-base h-[40vh] pb-4 pt-[10px] md:h-[50dvh]',
              'animate-slide-up transition-transform duration-500 ease-out',
              showStoreList ? 'translate-y-0' : 'translate-y-full',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex w-full items-center">
                <div className="flex w-full justify-center">
                  <div className="w-[49.33px] rounded-[5px] border-[2.14px] border-[#545454] md:w-[115.5px] md:border-[3px]"></div>
                </div>
                <button
                  className="ml-auto flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-700"
                  onClick={handleListClose}
                  aria-label="닫기"
                >
                  <IconX />
                </button>
              </div>

              <div className="flex w-full gap-1 border-b-[0.32px] border-b-[#BABABA] pb-[5.41px] text-start text-xs md:gap-2 md:border-b-[0.75px] md:pb-[14px] md:text-xl">
                <div className="flex items-center gap-[5.09px] md:gap-[11.97px]">
                  <div className="aspect-square w-[11.93px] rounded-sm border-[0.5px] border-[#D5D5D5] md:w-[28.07px]">
                    <IconFlower
                      className={cn(
                        getIconColor(parentListInfo.iconColorId),
                        'h-full w-full',
                      )}
                    />
                  </div>
                  <span className="text-nowrap font-semibold">
                    {parentListInfo.listName}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-[2.07px] text-[8px] text-[#BABABA] md:text-base">
                    <div className="h-[5.09px] w-[5.09px] md:h-[11.97px] md:w-[11.97px]">
                      <IconLocation className="h-full w-full" />
                    </div>
                    <div>{storeData.length ? storeData.length : 0}개</div>
                  </div>
                  {storeData.length > 0 && (
                    <button
                      onClick={handleEditBtnClick}
                      className={cn(
                        isEditing ? 'bg-primary' : 'bg-[#9F9F9F]',
                        'flex items-center justify-center rounded-[42.5px] px-[3.62px] text-[8px] md:px-[13px] md:py-[6px] md:text-base',
                      )}
                    >
                      <div className="h-[7.65px] w-[7.65px] md:h-[18px] md:w-[18px]">
                        <IconWriting className="h-full w-full text-white" />
                      </div>
                      <div className="text-white">
                        {isEditing ? '편집 중' : '편집하기'}
                      </div>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {Array.isArray(storeData) && storeData.length > 0 ? (
                  storeData.map((store, index) => (
                    <div
                      onClick={() => handleStoreSelectBtnClick(store.storeUuid)}
                      key={store.storeName}
                      className={cn(
                        'px-base flex cursor-pointer items-center justify-between py-[5.52px] md:py-[22.96px]',
                        index !== 0 && 'border-t-[0.5px] border-t-[#BABABA]',
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-1 md:gap-2">
                          {isEditing && (
                            <button
                              className={cn(
                                selectedStoreUuId === store.storeUuid
                                  ? 'bg-[#DE8332]'
                                  : 'bg-[#E8E8E8]',
                                'flex aspect-square h-[9px] w-[9px] items-center justify-center rounded-full md:h-[21px] md:w-[21px]',
                              )}
                            >
                              <div className="h-1 w-1 md:h-[11px] md:w-[11px]">
                                <IconCheck
                                  className={cn(
                                    selectedStoreUuId === store.storeUuid
                                      ? 'text-white'
                                      : 'text-[#9F9F9F]',
                                    'h-full w-full',
                                  )}
                                />
                              </div>
                            </button>
                          )}
                          <div className="text-[10px] font-semibold leading-tight md:text-lg">
                            {store.storeName}
                          </div>
                        </div>
                        <div className="text-[8px] leading-tight md:mb-[17.2px] md:text-base">
                          {store.storeAddress}
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-[1.91px] md:gap-[4.49px]">
                          {store.imageUrls.map((image, index) => (
                            <div
                              key={image}
                              className={cn(
                                index === 0 && 'rounded-l-sm md:rounded-l-lg',
                                index === store.imageUrls.length - 1 &&
                                  'rounded-r-sm md:rounded-r-lg',
                                'aspect-square w-[43.24px] overflow-hidden bg-slate-300 md:w-[101.73px]',
                              )}
                            >
                              <Image
                                src={image}
                                alt={image}
                                width={70}
                                height={70}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-5 text-[10px] md:p-10 md:text-base"></div>
                )}
              </div>

              {isEditing && (
                <div className="flex w-full items-center justify-center bg-white py-[6px] md:py-[12.02px]">
                  <button
                    onClick={handleStoreDeleteBtnClick}
                    disabled={!selectedStoreUuId}
                    className={cn(
                      selectedStoreUuId
                        ? 'bg-primary cursor-pointer'
                        : 'cursor-not-allowed bg-[#9F9F9F]',
                      'h-full w-[93px] rounded-[54.71px] py-1 text-[10px] text-white md:w-[170px] md:text-lg',
                    )}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
