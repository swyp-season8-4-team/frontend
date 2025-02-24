'use client';

import { SideBar } from '@repo/design-system/components/SideBar';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import IconPin from '@repo/design-system/components/icons/IconPin';
import IconPlus from '@repo/design-system/components/icons/IconPlus';
import IconTrashCan from '@repo/design-system/components/icons/IconTrashCan';
import { cn } from '@repo/ui/lib/utils';
import { useContext, useRef, useState } from 'react';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { CreateListModal } from '../../../_modals/CreateListModal';
import type { SavedListData } from '@repo/entity/src/store';
import { useRouter } from 'next/navigation';

interface SideBarContainerProps {
  showSidebar: boolean;
  totalSavedList: SavedListData[];
}

export function SideBarContainer({
  showSidebar,
  totalSavedList,
}: SideBarContainerProps) {
  const router = useRouter();

  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const { push, pop } = useContext(PortalContext);

  const handleSideBarClose = () => {
    router.back();
  };

  const handleCreateListComplete = (listName: string, colorId: number) => {
    // TODO: API를 통해 새 리스트 생성 로직 구현
    console.log(listName, colorId);
  };

  const handleCreateListBtnClick = () => {
    push('modal', {
      component: (
        <CreateListModal
          onClose={() => {
            pop('modal');
            router.push('?sidebar=true'); // 모달 닫을 때 사이드바 다시 열기
          }}
          onComplete={(listName: string, colorId: number) => {
            pop('modal');
            handleCreateListComplete(listName, colorId);
            router.push('?sidebar=true'); // 완료 후 사이드바 다시 열기
          }}
        />
      ),
    });
  };

  const handleDotsClick = (listId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedListId((prev) => (prev === listId ? null : listId));
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    if (
      selectedListId !== null &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      setSelectedListId(null);
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

  const handleDeleteList = async (listId: number) => {
    try {
      // TODO: API를 통해 리스트 삭제 요청
      // const response = await fetch(`/api/lists/${listId}`, {
      //   method: 'DELETE',
      // });

      console.log('삭제된 리스트:', listId);

      // 삭제 후 사이드바를 새로고침하여 업데이트된 리스트 표시
      setSelectedListId(null); // 삭제 메뉴 닫기
      router.refresh(); // 서버 컴포넌트 리프레시
    } catch (error) {
      console.error('리스트 삭제 실패:', error);
    }
  };

  return (
    <SideBar
      {...{
        className: 'fixed top-[100px] w-1/2 right-4 h-[calc(100dvh-287px)]',
        isSideBarOpen: showSidebar,
        handleSideBarClose,
      }}
    >
      <div className="flex flex-col h-full" onClick={handleGlobalClick}>
        <div className="flex-none">
          <div className="flex p-2 w-full font-semibold text-[#393939] md:text-[22px] text-xs text-start">
            <span>저장 리스트 &nbsp;</span>
            <span>{totalSavedList.length}</span>
          </div>
          <button
            className="flex items-center my-[11.97px] md:my-[22px]"
            onClick={() => {
              handleSideBarClose();
              handleCreateListBtnClick();
            }}
          >
            <span className="flex justify-center items-center mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm w-[20.7px] md:w-[30.45px] aspect-square">
              <IconPlus className="w-[70%] h-[70%] text-[#6F6F6F]" />
            </span>
            <span className="text-[#6F6F6F] md:text-[18px] text-xs">
              새 리스트 만들기
            </span>
          </button>
        </div>
        <div className="[&::-webkit-scrollbar]:hidden flex-grow pr-1 [-ms-overflow-style:none] overflow-y-auto [scrollbar-width:none]">
          {totalSavedList.map((saveListItem, index) => (
            <div
              key={saveListItem.listName}
              className={cn(
                index !== 0 && 'border-t-[#6F6F6F] border-t-[0.5px]',
                'relative py-[11.97px] md:py-[22px]',
              )}
            >
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center">
                  <div className="mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm w-[20.45px] md:w-[37.5px] aspect-square">
                    <IconFlower
                      className={cn(
                        getIconColor(saveListItem.iconColorId),
                        'w-full h-full',
                      )}
                    />
                  </div>
                  <div className="flex flex-col leading-3">
                    <div className="text-[10px] md:text-lg">
                      {saveListItem.listName}
                    </div>
                    <div className="flex items-center text-[#6F6F6F]">
                      <span className="flex justify-center items-center mr-[4.35px] md:mr-2 h-[6.26px] md:h-[11.5px]">
                        <IconPin className="w-full h-full text-[#6F6F6F]" />
                      </span>
                      <span className="text-[8px] md:text-[14px]">
                        {saveListItem.storeCount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => handleDotsClick(saveListItem.listId, e)}
                    className="flex flex-col gap-[4.35px] md:gap-2"
                  >
                    <div className="bg-[#6F6F6F] rounded-full w-0.5 md:w-1 h-0.5 md:h-1"></div>
                    <div className="bg-[#6F6F6F] rounded-full w-0.5 md:w-1 h-0.5 md:h-1"></div>
                    <div className="bg-[#6F6F6F] rounded-full w-0.5 md:w-1 h-0.5 md:h-1"></div>
                  </button>
                  {selectedListId === saveListItem.listId && (
                    <div
                      ref={modalRef}
                      className="top-6 right-0 z-modal absolute gap-[4.35px] md:gap-2 bg-white shadow-[2px_2px_5px_0px_rgba(0,0,0,0.05)] px-3 rounded-[10px] w-fit"
                    >
                      {/* <div className="flex items-center md:py-[11.5px] border-[#D2D2D2] border-b">
                            <span className="flex justify-center items-center mr-2 w-3 md:w-5 h-3 md:h-5">
                              <IconShare className="w-full h-full" />
                            </span>
                            <button className="text-[8px] md:text-[14px] text-nowrap">
                              공유하기
                            </button>
                          </div>
                          <div className="flex items-center md:py-[11.5px] border-[#D2D2D2] border-b">
                            <span className="flex justify-center items-center mr-2 w-3 md:w-4 h-3 md:h-4">
                              <IconPin className="w-full h-full" />
                            </span>
                            <button className="text-[8px] md:text-[14px] text-nowrap">
                              지도에서 숨기기
                            </button>
                          </div> */}
                      <div className="flex items-center md:py-[11.5px]">
                        <span className="flex justify-center items-center mr-2 w-3 md:w-5 h-3 md:h-5">
                          <IconTrashCan className="w-full h-full" />
                        </span>
                        <button
                          className="text-[8px] md:text-[14px] text-nowrap"
                          onClick={() => handleDeleteList(saveListItem.listId)}
                        >
                          리스트 삭제하기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SideBar>
  );
}
