import { useRef, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import type { WithChildren } from '@repo/ui/index';

interface BottomSheetProps extends WithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export function BottomSheet({ children, isOpen, onClose }: BottomSheetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setStartY(clientY);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const delta = Math.max(0, clientY - startY); // 음수 값 방지

    setOffsetY(delta);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 150; // 드래그 임계값 증가

    if (offsetY > threshold) {
      onClose();
    } else {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.style.transform = 'translateY(0)';
      }
    }
    setOffsetY(0);
  };

  return (
    <>
      {isOpen && (
        <div>
          <div
            ref={bottomSheetRef}
            className={cn(
              'right-0 bottom-0 z-bottomSheet left-0 fixed  select-none',
              'bg-white px-base pt-[19px] pb-4 rounded-t-base w-full',
              'animate-slide-up transition-transform',
              isDragging
                ? 'transition-none'
                : 'transition-transform duration-500',
            )}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
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
