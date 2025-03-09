'use client';

import { UserContext } from '@/contexts/UserContext';
import { BottomSheet } from '@repo/design-system/components/BottomSheet';
import type { SavedListData } from '@repo/entity/src/store';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import { CreateListModal } from '../../../../../map/@sidebar/_modals/CreateListModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import { cn } from '@repo/ui/lib/utils';
import IconPlus from '@repo/design-system/components/icons/IconPlus';
import IconCheck from '@repo/design-system/components/icons/IconCheck';
import { HTTPError } from '@repo/api/src/error';
import {
  addStoreInSavedList,
  createSavedList,
  getSavedListAll,
} from './action';

interface SaveStoreBottomSheetContainerProps {
  showBottomSheet: boolean;
  storeUuid: string;
}

export function SaveStoreBottomSheetContainer({
  showBottomSheet,
  storeUuid,
}: SaveStoreBottomSheetContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { push, pop } = useContext(PortalContext);

  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(showBottomSheet);
  const [savedLists, setSavedLists] = useState<SavedListData[]>([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSavedListFetch = useCallback(async () => {
    if (!user) return;

    const savedLists = await getSavedListAll({ userUuid: user.id });
    setSavedLists(savedLists);
  }, [user]);

  const handleBottomSheetClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('saveStore');

    router.replace(`?${params}`, {
      scroll: false,
    });
  };

  const handleSideBarClose = () => {
    const currentPath = window.location.pathname;
    router.push(currentPath);
  };

  const handleCreateListComplete = async (
    listName: string,
    colorId: number,
  ) => {
    if (!user?.id) return;

    try {
      await createSavedList({
        userUuid: user.id,
        listName: listName,
        iconColorId: colorId,
      });
    } catch (err) {
      if (err instanceof HTTPError) {
        const statusCode = err.data.statusCode;

        if (statusCode === 409) {
          setError('동일한 이름의 리스트는 생성할 수 없습니다.');
          return;
        }
      }
    }
  };

  const handleCreateListBtnClick = () => {
    push('modal', {
      component: (
        <CreateListModal
          onClose={() => {
            pop('modal');
            setSavedLists([]);
            handleSavedListFetch();
            router.push('?saveStore=true');
            router.refresh();
          }}
          onComplete={(listName: string, colorId: number) => {
            pop('modal');
            setSavedLists([]);
            handleCreateListComplete(listName, colorId).then(() => {
              handleSavedListFetch();
            });
            router.refresh();
            router.push('?saveStore=true');
          }}
        />
      ),
    });
  };

  const hadleSaveInListBtnClick = async (listId: number) => {
    try {
      await addStoreInSavedList({
        listId: listId as number,
        storeUuid,
        userPreferences: user?.preferences as number[],
      });

      setSuccessMessage('저장이 완료되었습니다');
      setSelectedListId(null);
      setTimeout(() => {
        router.refresh();
        handleBottomSheetClose();
      }, 1000);
    } catch (error: any) {
      // 409 Conflict 에러 확인
      if (error.response && error.response.status === 409) {
        setError('이미 저장한 리스트입니다.');
      } else {
        setError('이미 저장한 리스트입니다.');
      }

      // 에러를 반환하거나 전파하지 않고 여기서 처리 완료
      return; // 함수 종료
    }
  };

  const getIconColor = (colorId: number) => {
    switch (colorId) {
      case 1:
        return 'text-[#FFC803]';
      case 2:
        return 'text-[#FF8803]';
      case 3:
        return 'text-[#05D352]';
      case 4:
        return 'text-[#00C6D8]';
    }
  };

  const handleListSelect = (listId: number) => {
    setSelectedListId(listId);
  };

  useEffect(() => {
    // URL 파라미터 변경을 감지하여 바텀시트 상태 업데이트
    const hasBottomsheet = searchParams.get('saveStore') === 'true';
    setIsBottomSheetOpen(hasBottomsheet);
  }, [searchParams]);

  useEffect(() => {
    handleSavedListFetch();
  }, [handleSavedListFetch]);

  // BottomSheet가 열릴 때마다 리스트 새로 불러오기
  useEffect(() => {
    if (isBottomSheetOpen) {
      handleSavedListFetch();
    }
  }, [isBottomSheetOpen, handleSavedListFetch]);

  // 에러 메시지 타이머 설정
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  // 성공 메시지 타이머 설정
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  if (!savedLists) return null;

  return (
    <BottomSheet
      className="h-auto max-h-[80vh] p-4"
      isOpen={isBottomSheetOpen}
      onClose={handleBottomSheetClose}
    >
      <div className="flex flex-col h-full">
        {error && (
          <div className="top-1/3 left-1/2 z-20 absolute bg-red-100 px-4 py-2 border border-red-400 rounded text-red-700 -translate-x-1/2 transform">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="top-1/3 left-1/2 z-20 absolute bg-green-100 px-4 py-2 border border-green-400 rounded text-green-700 -translate-x-1/2 transform">
            {successMessage}
          </div>
        )}

        <button
          className="flex items-center mb-4"
          onClick={() => {
            handleSideBarClose();
            handleCreateListBtnClick();
          }}
        >
          <span className="flex justify-center items-center mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm w-[37.5px] aspect-square">
            <IconPlus className="w-full full text-[#6F6F6F]" />
          </span>
          <span className="text-[#6F6F6F] text-[18px]">새 리스트 만들기</span>
        </button>
        <div className="flex-1 overflow-y-auto">
          {savedLists.map((list) => (
            <div
              onClick={() => handleListSelect(list.listId)}
              key={list.listId}
              className={cn('border-b-[#E8E8E8] border-b-[1.4px] p-[7.29px]')}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className="mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm w-[37.5px] aspect-square">
                    <IconFlower
                      className={cn(
                        getIconColor(list.iconColorId),
                        'w-full h-full',
                      )}
                    />
                  </div>
                  <div className="text-[14px] font-semibold mr-[5px]">
                    {list.listName}
                  </div>
                  <div className="text-[14px] text-[#898989]">
                    {list.storeCount}
                  </div>
                </div>

                <div>
                  <button
                    className={cn(
                      selectedListId === list.listId
                        ? 'bg-[#FFB700] border-none'
                        : 'bg-white border border-[#9F9F9F]',
                      'flex justify-center items-center rounded-full w-[15px] h-[15px] aspect-square',
                    )}
                  >
                    <div className="w-2 h-2">
                      <IconCheck
                        className={cn(
                          selectedListId === list.listId
                            ? 'text-white'
                            : 'text-[#9F9F9F]',
                          'w-full h-full',
                        )}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            selectedListId && hadleSaveInListBtnClick(selectedListId)
          }
          className={cn(
            selectedListId ? 'bg-[#FFB700]' : 'bg-[#D5D5D5]',
            'text-white text-lg font-semibold w-full rounded-[100px] md:p-2 mt-4',
          )}
        >
          리스트에 담기
        </button>
      </div>
    </BottomSheet>
  );
}
