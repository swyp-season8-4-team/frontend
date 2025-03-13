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
          className="fixed bottom-0 left-0 right-0 z-10 flex justify-center"
          onClick={handleListClose}
        >
          <div
            ref={bottomSheetRef}
            className={cn(
              'w-full max-w-[768px] bg-white rounded-t-base',
              'h-[50vh] pb-4 pt-[10px] px-base',
              'animate-slide-up transition-transform duration-500 ease-out',
              showStoreList ? 'translate-y-0' : 'translate-y-full',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              <div className=" w-full flex items-center">
                <div className="w-full flex justify-center">
                  <div className="border-[#545454] border-[2.14px] md:border-[3px] rounded-[5px] w-[49.33px] md:w-[115.5px]"></div>
                </div>
                <button
                  className="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-gray-700 ml-auto"
                  onClick={handleListClose}
                  aria-label="닫기"
                >
                  <IconX />
                </button>
              </div>

              <div className="flex gap-1 md:gap-2 pb-[5.41px] md:pb-[14px] border-b-[#BABABA] border-b-[0.32px] md:border-b-[0.75px] w-full text-xs md:text-xl text-start">
                <div className="flex items-center gap-[5.09px] md:gap-[11.97px]">
                  <div className="border-[#D5D5D5] border-[0.5px] rounded-sm w-[11.93px] md:w-[28.07px] aspect-square">
                    <IconFlower
                      className={cn(
                        getIconColor(parentListInfo.iconColorId),
                        'w-full h-full',
                      )}
                    />
                  </div>
                  <span className="font-semibold text-nowrap">
                    {parentListInfo.listName}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-[2.07px] text-[#BABABA] text-[8px] md:text-base">
                    <div className="w-[5.09px] md:w-[11.97px] h-[5.09px] md:h-[11.97px]">
                      <IconLocation className="w-full h-full" />
                    </div>
                    <div>{storeData.length ? storeData.length : 0}개</div>
                  </div>
                  {storeData.length > 0 && (
                    <button
                      onClick={handleEditBtnClick}
                      className={cn(
                        isEditing ? 'bg-primary' : 'bg-[#9F9F9F] ',
                        'flex justify-center items-center px-[3.62px] md:px-[13px] md:py-[6px] rounded-[42.5px] text-[8px] md:text-base',
                      )}
                    >
                      <div className="w-[7.65px] md:w-[18px] h-[7.65px] md:h-[18px]">
                        <IconWriting className="w-full h-full text-white" />
                      </div>
                      <div className="text-white">
                        {isEditing ? '편집 중' : '편집하기'}
                      </div>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {Array.isArray(storeData) && storeData.length > 0 ? (
                  storeData.map((store, index) => (
                    <div
                      onClick={() => handleStoreSelectBtnClick(store.storeUuid)}
                      key={store.storeName}
                      className={cn(
                        'flex items-center justify-between px-base py-[5.52px] md:py-[22.96px] cursor-pointer',
                        index !== 0 && 'border-t-[#BABABA] border-t-[0.5px] ',
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
                                'flex justify-center items-center rounded-full w-[9px] md:w-[21px] h-[9px] md:h-[21px] aspect-square',
                              )}
                            >
                              <div className="w-1 md:w-[11px] h-1 md:h-[11px]">
                                <IconCheck
                                  className={cn(
                                    selectedStoreUuId === store.storeUuid
                                      ? 'text-white'
                                      : 'text-[#9F9F9F]',
                                    'w-full h-full',
                                  )}
                                />
                              </div>
                            </button>
                          )}
                          <div className="font-semibold text-[10px] md:text-lg leading-tight">
                            {store.storeName}
                          </div>
                        </div>
                        <div className="md:mb-[17.2px] text-[8px] md:text-base leading-tight">
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
                                'w-[43.24px] md:w-[101.73px] aspect-square overflow-hidden bg-slate-300',
                              )}
                            >
                              <Image
                                src={image}
                                alt={image}
                                width={70}
                                height={70}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[10px] md:text-base w-full h-full flex justify-center items-center p-5 md:p-10"></div>
                )}
              </div>

              {isEditing && (
                <div className="py-[6px] md:py-[12.02px] w-full flex justify-center items-center bg-white">
                  <button
                    onClick={handleStoreDeleteBtnClick}
                    disabled={!selectedStoreUuId}
                    className={cn(
                      selectedStoreUuId
                        ? 'bg-primary cursor-pointer'
                        : 'bg-[#9F9F9F] cursor-not-allowed',
                      'py-1 rounded-[54.71px] md:w-[170px] w-[93px] h-full text-[10px] text-white md:text-lg',
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
