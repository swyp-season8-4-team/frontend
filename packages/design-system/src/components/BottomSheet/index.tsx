import { memo, type ReactNode, useRef, useState } from 'react';
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
    const delta = clientY - startY;

    if (delta > 0) {
      // 아래로 드래그할 때만
      setOffsetY(delta);
      if (bottomSheetRef.current) {
        bottomSheetRef.current.style.transform = `translateY(${delta}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (offsetY > 100) {
      // 100px 이상 드래그하면 닫기
      handleBottomSheetClose();
    } else {
      // 원위치로 돌아가기
      if (bottomSheetRef.current) {
        bottomSheetRef.current.style.transform = 'translateY(0)';
      }
    }
    setOffsetY(0);
  };

  return (
    <>
      {isBottomSheetOpen && (
        <div>
          <div
            ref={bottomSheetRef}
            className={cn(
              'right-0 bottom-0 z-bottomSheet left-0 fixed',
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
