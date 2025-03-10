import IconTriangle from '@repo/design-system/components/icons/IconTriangle';
import { convertNegativeToPositive } from './_utils/convertNegativeToPositive';
import { cn } from '@repo/ui/lib/utils';

interface PopularItemProps {
  keyword: string;
  rank: number;
  difference: number;
}

export function PopularItem({ keyword, rank, difference }: PopularItemProps) {
  return (
    <div key={keyword} className="w-full flex justify-between items-center ">
      <div className="flex gap-[11.35px] md:gap-[25px]">
        <div className="font-semibold text-[8px] md:text-xl">{rank}</div>
        <div className="text-[10px] md:text-xl">{keyword}</div>
      </div>
      <div className="flex items-center">
        <div
          className={cn(
            difference === 0 ? 'hidden' : 'flex',
            difference < 0 ? 'rotate-180' : '',
            'w-2 md:w-5 aspect-square items-center justify-center',
          )}
        >
          <IconTriangle className="text-[#6F6F6F] w-full h-full" />
        </div>
        <div className="font-semibold text-[8px] md:text-lg text-[#6F6F6F]">
          {difference === 0 ? '-' : convertNegativeToPositive(difference)}
        </div>
      </div>
    </div>
  );
}
