import { memo, type ReactNode } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface BottomSheetProps {
  children: ReactNode;
  isBottomSheetOpen: boolean;
  handleBottomSheetClose: () => void;
}

export function BottomSheet({
  children,
  isBottomSheetOpen,
  handleBottomSheetClose,
}: BottomSheetProps) {
  return (
    <>
      {isBottomSheetOpen && (
        <div>
          <div
            className={cn(
              'right-0 bottom-0 z-bottomSheet left-0 fixed',
              'bg-white px-base pt-[19px] pb-4 rounded-t-base w-full',
              'animate-slide-up',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full">
              <div className="flex justify-center items-center mb-[21px] w-full">
                <div className="absolute border-[#545454] border-[2.14px] md:border-[3px] rounded-[5px] w-[49.33px] md:w-[115.5px]"></div>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
