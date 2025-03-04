import { useRef } from 'react';
import { cn } from '@repo/ui/lib/utils';
import type { WithChildren, WithClassName } from '@repo/ui/index';
import IconX from '../icons/IconX';

interface BottomSheetProps extends WithChildren, WithClassName {
  isOpen: boolean;
  onClose: () => void;
}

export function BottomSheet({
  children,
  isOpen,
  onClose,
  className,
}: BottomSheetProps) {
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-bottomSheet bg-black/50"
          onClick={onClose}
        >
          <div
            ref={bottomSheetRef}
            className={cn(
              'bottom-0 z-bottomSheet fixed select-none',
              'bg-white px-base pt-[20px] pb-4 rounded-t-base max-w-[768px] w-full',
              'animate-slide-up transition-transform duration-500 ease-out',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full">
              <div className="flex justify-center items-center mb-[21px] w-full relative">
                <div className="absolute border-[#545454] border-[2.14px] md:border-[3px] rounded-[5px] w-[49.33px] md:w-[115.5px]"></div>
                <button
                  className="absolute right-0 top-[-10px] w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                  onClick={onClose}
                  aria-label="닫기"
                >
                  <IconX />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
