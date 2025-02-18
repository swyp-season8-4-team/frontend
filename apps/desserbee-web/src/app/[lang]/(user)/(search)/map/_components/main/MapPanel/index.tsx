import { IconSize } from '@repo/design-system/components/icons';

import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import IconTarget from '@repo/design-system/components/icons/IconTarget';
import { cn } from '@repo/ui/lib/utils';

interface MapPanelProps {
  handleSideBarOpen: () => void;
  handleTrackingToggle: () => void;
  isTracking: boolean;
}

export function MapPanel({
  handleSideBarOpen,
  handleTrackingToggle,
  isTracking,
}: MapPanelProps) {
  return (
    <div className="absolute w-[47px] aspect-square right-4 bottom-2 z-10 flex flex-col gap-2">
      <button
        onClick={handleSideBarOpen}
        className="flex justify-center items-center aspect-square rounded-sm bg-white"
      >
        <IconFlowerOutline size={IconSize.l} className="#6F6F6F" />
      </button>
      <button
        onClick={handleTrackingToggle}
        className={cn(
          isTracking ? 'text-red-600' : '',
          'flex justify-center items-center aspect-square rounded-sm bg-white',
        )}
      >
        <IconTarget size={IconSize.m} className="#6F6F6F" />
      </button>
    </div>
  );
}
