import { SideBar } from '@repo/design-system/components/SideBar';
import { useSavedList } from '../../../../_hooks/useSavedList';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import IconPin from '@repo/design-system/components/icons/IconPin';
import { IconSize } from '@repo/design-system/components/icons';
import IconPlus from '@repo/design-system/components/icons/IconPlus';
import { cn } from '@repo/ui/lib/utils';
interface sideBarProps {
  isSideBarOpen: boolean;
  handleSideBarClose: () => void;
}

export function SideBarContainer({
  isSideBarOpen,
  handleSideBarClose,
}: sideBarProps) {
  const { savedList } = useSavedList('uuid-123');

  const sideBarProps = {
    className: 'absolute top-0 h-full w-[320px] right-0',
    isSideBarOpen,
    handleSideBarClose,
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

  return (
    <SideBar {...sideBarProps}>
      <div className="leading-none">
        <div className="flex p-2 w-full font-semibold text-[#393939] md:text-[22px] text-xs text-start">
          <span>저장 리스트 &nbsp;</span>
          <span>{savedList.length}</span>
        </div>
        <div className="flex items-center my-[11.97px] md:my-[22px]">
          <span className="flex justify-center items-center mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm w-[20.7px] md:w-[30.45px] aspect-square">
            <IconPlus className="w-[70%] h-[70%] text-[#6F6F6F]" />
          </span>
          <span className="text-[#6F6F6F] md:text-[18px] text-xs">
            새 리스트 만들기
          </span>
        </div>
        {savedList.map((saveListItem) => (
          <div
            key={saveListItem.listName}
            className="py-[11.97px] md:py-[22px] border-t-[#6F6F6F] border-t-[0.5px]"
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
                <div className="flex flex-col">
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
              <button className="flex flex-col gap-[4.35px] md:gap-2">
                <div className="bg-[#6F6F6F] rounded-full w-0.5 md:w-1 h-0.5 md:h-1"></div>
                <div className="bg-[#6F6F6F] rounded-full w-0.5 md:w-1 h-0.5 md:h-1"></div>
                <div className="bg-[#6F6F6F] rounded-full w-0.5 md:w-1 h-0.5 md:h-1"></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </SideBar>
  );
}
