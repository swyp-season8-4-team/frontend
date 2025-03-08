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
          className="z-bottomSheet fixed inset-0 flex justify-center w-full h-full"
          onClick={onClose}
        >
          <div
            ref={bottomSheetRef}
            className={cn(
              'bottom-0 z-bottomSheet pb-4 fixed select-none w-full',
              'left-0 right-0 mx-auto',
              'bg-white px-base pt-[10px] rounded-t-base max-w-[768px]',
              'animate-slide-up transition-transform duration-500 ease-out',
              isOpen ? 'translate-y-0' : 'translate-y-full',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full">
              <div className="mb-[21px] w-full flex items-center">
                <div className="w-full flex justify-center">
                  <div className="border-[#545454] border-[2.14px] md:border-[3px] rounded-[5px] w-[49.33px] md:w-[115.5px]"></div>
                </div>
                <button
                  className="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-gray-700 ml-auto"
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
