import { SideBar } from '@repo/design-system/components/SideBar';
import { useSavedList } from '../../../../_hooks/useSavedList';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import IconPin from '@repo/design-system/components/icons/IconPin';
import { IconSize } from '@repo/design-system/components/icons';
import IconPlus from '@repo/design-system/components/icons/IconPlus';
interface sideBarProps {
  isSideBarOpen: boolean;
  handleSideBarClose: () => void;
}

export function SideBarContainer({
  isSideBarOpen,
  handleSideBarClose,
}: sideBarProps) {
  const { savedList } = useSavedList(1);

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
      <div>
        <div className="text-[#393939] font-semibold text-[22px] w-full text-start p-2">
          저장 리스트
        </div>
        <div className="flex items-center my-[22px]">
          <span className="rounded-sm border-[0.5px] border-[#D5D5D5] aspect-square p-2 mr-2">
            <IconPlus className=" text-[#6F6F6F]" />
          </span>
          <span className="text-[#6F6F6F] text-[18px]">새 리스트 만들기</span>
        </div>
        {savedList.map((saveListItem) => (
          <div
            key={saveListItem.id}
            className="border-t-[0.5px] border-t-[#6F6F6F] py-[22px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex justify-start">
                <div className="rounded-sm border-[0.5px] border-[#D5D5D5] mr-2">
                  <IconFlower
                    size={IconSize.xl}
                    className={getIconColor(saveListItem.colorId)}
                  />
                </div>
                <div>
                  <div>{saveListItem.title}</div>
                  <div className="flex items-center text-[#6F6F6F]">
                    <span>
                      <IconPin
                        size={IconSize.xs}
                        className="text-[#6F6F6F] mr-2"
                      />
                    </span>
                    <span>{saveListItem.count}</span>
                  </div>
                </div>
              </div>
              <button className="flex flex-col gap-2">
                <div className="rounded-full w-1 h-1 bg-[#6F6F6F]"></div>
                <div className="rounded-full w-1 h-1 bg-[#6F6F6F]"></div>
                <div className="rounded-full w-1 h-1 bg-[#6F6F6F]"></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </SideBar>
  );
}
