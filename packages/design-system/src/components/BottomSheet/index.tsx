import { useRef, useState, useEffect } from 'react';
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
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      setIsOpening(false); // 초기화

      // 다음 프레임에서 translate-y-0 적용 (트랜지션 유도)
      requestAnimationFrame(() => {
        setIsOpening(true);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setIsOpening(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 100);
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className="z-bottomSheet fixed inset-0 flex h-full w-full justify-center"
      onClick={handleClose}
    >
      <div
        ref={bottomSheetRef}
        className={cn(
          'z-bottomSheet fixed bottom-0 w-full select-none pb-4',
          'left-0 right-0 mx-auto',
          'px-base rounded-t-base max-w-[768px] bg-white pt-[10px]',
          'transition-transform duration-300 ease-out',
          isClosing
            ? 'translate-y-full'
            : isOpening
              ? 'translate-y-0'
              : 'translate-y-full',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full">
          <div className="mb-[21px] flex w-full items-center">
            <div className="flex w-full justify-center">
              <div className="w-[49.33px] rounded-[5px] border-[2.14px] border-[#545454] md:w-[115.5px] md:border-[3px]"></div>
            </div>
            <button
              className="ml-auto flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-700"
              onClick={handleClose}
              aria-label="닫기"
            >
              <IconX />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
