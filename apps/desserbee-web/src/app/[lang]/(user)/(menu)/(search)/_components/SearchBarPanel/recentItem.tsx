import IconClock from '@repo/design-system/components/icons/IconClock';
import IconX from '@repo/design-system/components/icons/IconX';

export function RecentItem() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[6px] md:gap-[14px] items-center">
        <div className="w-2 h-2 md:w-[19px] md:h-[19px]">
          <IconClock className="text-[#BABABA] w-full h-full" />
        </div>
        <div className="text-[10px] md:text-xl">망원 비건</div>
      </div>
      <div className="flex items-center gap-[6.48px] md:gap-[17px]">
        <div className="text-[8px] md:text-lg">02.08</div>
        <div className="w-2 h-2 md:w-5 md:h-5">
          <IconX className="text-[#545454] w-full h-full" />
        </div>
      </div>
    </div>
  );
}
