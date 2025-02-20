import { IconSize } from '@repo/design-system/components/icons';

import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import IconTarget from '@repo/design-system/components/icons/IconTarget';
import { cn } from '@repo/ui/lib/utils';

interface MapPanelProps {
  handleSideBarOpen: () => void;
  moveToCurrentPosition: () => void;
}

export function MapPanel({
  handleSideBarOpen,
  moveToCurrentPosition,
}: MapPanelProps) {
  return (
    <div className="bottom-[28.05px] left-4 z-10 absolute flex flex-col gap-2 w-[47px] aspect-square">
      <button
        onClick={handleSideBarOpen}
        className="flex justify-center items-center bg-white rounded-sm aspect-square"
      >
        <IconFlowerOutline className="text-[#6F6F6F]" />
      </button>
      <button
        onClick={moveToCurrentPosition}
        className={cn(
          'flex justify-center items-center aspect-square rounded-sm bg-white',
        )}
      >
        <IconTarget className="text-[#6F6F6F]" />
      </button>
    </div>
  );
}
