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
              'bottom-0 z-bottomSheet fixed select-none w-full',
              'left-0 right-0 mx-auto',
              'bg-white px-base pt-[20px] pb-4 rounded-t-base max-w-[768px]',
              'animate-slide-up transition-transform duration-500 ease-out',
              isOpen ? 'translate-y-0' : 'translate-y-full',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full">
              <div className="relative flex justify-center items-center mb-[21px] w-full">
                <div className="absolute border-[#545454] border-[2.14px] md:border-[3px] rounded-[5px] w-[49.33px] md:w-[115.5px]"></div>
                <button
                  className="top-[-10px] right-0 absolute flex justify-center items-center w-8 h-8 text-gray-500 hover:text-gray-700"
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
