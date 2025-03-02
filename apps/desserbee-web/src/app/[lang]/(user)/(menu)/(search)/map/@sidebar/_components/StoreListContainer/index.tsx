'use client';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMemo, useCallback, useEffect, useState } from 'react';

import { SideBar } from '@repo/design-system/components/SideBar';

import IconFlower from '@repo/design-system/components/icons/IconFlower';
import IconLocation from '@repo/design-system/components/icons/IconLocation';
import IconWriting from '@repo/design-system/components/icons/IconWriting';
import IconCheck from '@repo/design-system/components/icons/IconCheck';
import { getIconColor } from '../../../_utils/iconColor';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import {
  type StoresInSavedListData,
  type ParentSavedListResponse,
} from '@repo/entity/src/store';

interface StoreListContainerProps {
  listId: number;
  showStoreList: boolean;
}

export function StoreListContainer({
  listId,
  showStoreList,
}: StoreListContainerProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedStoreUuId, setSelectedStoreUuId] = useState<string | null>(
    null,
  );
  const [parentListInfo, setParentListInfo] =
    useState<ParentSavedListResponse>();
  const [storeData, setStoreData] = useState<StoresInSavedListData[]>([]);

  const storeService = useMemo(
    () =>
      new StoreService({
        storeRepository: new StoreAPIRepository(),
      }),
    [],
  );

  const handleListClose = () => {
    router.push('?sidebar=true');
  };

  const handleEditBtnClick = () => {
    if (!isEditing) setSelectedStoreUuId(null);
    setIsEditing((prev) => !prev);
  };

  const handleStoreSelectBtnClick = (storeUuId: string) => {
    if (!isEditing) return;
    setSelectedStoreUuId(storeUuId);
  };

  const handleStoresInSavedListFetch = useCallback(async () => {
    try {
      // 부모 리스트 정보 가져오기
      const parentList = await storeService.getParentSavedList({
        listId: Number(listId),
      });
      setParentListInfo(parentList);

      // 리스트에 포함된 가게 정보 가져오기
      const response = await storeService.getStoresInSavedList({
        listId: Number(listId),
      });

      // 실제 API 응답 구조에 맞게 타입 조정 (응답이 객체이고 storeData 속성을 가짐)
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
    } catch (error) {
      setStoreData([]);
    }
  }, [listId, storeService]);

  useEffect(() => {
    handleStoresInSavedListFetch();
  }, [handleStoresInSavedListFetch]);

  if (!parentListInfo) return;

  return (
    <SideBar
      {...{
        className:
          'absolute top-[100px] md:top-[135px] md:w-[370px] right-4 h-[calc(100dvh-287px)] cursor-pointer',
        isSideBarOpen: showStoreList,
        handleSideBarClose: handleListClose,
        isCloseBtnShow: false,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col pb-[5.41px] md:pb-[14px] border-b-[#BABABA] border-b-[0.32px] md:border-b-[0.75px] w-full text-xs md:text-xl text-start">
          <div className="flex items-center gap-[5.09px] md:gap-[11.97px]">
            <div className="border-[#D5D5D5] border-[0.5px] rounded-sm w-[11.93px] md:w-[28.07px] aspect-square">
              <IconFlower
                className={cn(
                  getIconColor(parentListInfo.iconColorId),

                  'w-full h-full',
                )}
              />
            </div>
            <span className="font-semibold">{parentListInfo.listName}</span>
          </div>
          <div className="flex gap-[5.09px]">
            <div className="w-[11.93px] md:w-[37.5px] aspect-square"></div>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-[2.07px] text-[#BABABA] text-[8px] md:text-base">
                <div className="w-[5.09px] md:w-[11.97px] h-[5.09px] md:h-[11.97px]">
                  <IconLocation className="w-full h-full" />
                </div>
                <span>{storeData.length ? storeData.length : 0}개</span>
              </div>
              {storeData.length
                ? storeData.length > 0 && (
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
                      <div className="text-white">편집하기</div>
                    </button>
                  )
                : ''}
            </div>
          </div>
        </div>
        <div className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] overflow-y-auto [scrollbar-width:none]">
          {Array.isArray(storeData) && storeData ? (
            storeData.map((store, index) => (
              <div
                onClick={() => handleStoreSelectBtnClick(store.storeUuid)}
                key={store.storeName}
                className={cn(
                  'relative px-[9.73px] py-[5.52px] md:py-[22.96px] md:px-[49px]',
                  index !== 0 && 'border-t-[#BABABA] border-t-[0.5px] ',
                )}
              >
                {isEditing && (
                  <button
                    className={cn(
                      selectedStoreUuId === store.storeUuid
                        ? 'bg-[#DE8332]'
                        : 'bg-[#E8E8E8]',
                      'left-0 md:left-4 absolute flex justify-center items-center  rounded-full w-[9px] md:w-[21px] h-[9px] md:h-[21px] aspect-square',
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
                <div className="font-semibold text-[8px] md:text-[18px] leading-tight">
                  {store.storeName}
                </div>
                <div className="md:mb-[17.2px] text-[8px] md:text-base leading-tight">
                  {store.storeAddress}
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
            <div className="text-[10px] md:text-base w-full h-full flex justify-center items-center p-5 md:p-10">
              아직 담은 가게가 없습니다.
            </div>
          )}
        </div>
        {isEditing && (
          <div className="right-0 bottom-0 left-0 absolute flex justify-center items-center bg-white py-[6px] md:py-[12.02px] w-full">
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
    </SideBar>
  );
}
