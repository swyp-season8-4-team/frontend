import type { WithChildren, WithClassName } from '@repo/ui/index';
import IconX from '../icons/IconX';
import { cn } from '@repo/ui/lib/utils';
import { useRef, useState } from 'react';

interface SideBarProps extends WithChildren, WithClassName {
  isSideBarOpen: boolean;
  handleSideBarClose: () => void;
  isCloseBtnShow?: boolean;
}

export function SideBar({
  children,
  className,
  isSideBarOpen,
  handleSideBarClose,
  isCloseBtnShow = true,
}: SideBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startX;

    if (delta > 0) {
      // 오른쪽으로 드래그할 때만
      setOffsetX(delta);
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = `translateX(${delta}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (offsetX > 50) {
      // 50px 이상 드래그하면 닫기
      handleSideBarClose();
    } else {
      // 원위치로 돌아가기
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = 'translateX(0)';
      }
    }
    setOffsetX(0);
  };

  return (
    <>
      {isSideBarOpen && (
        <div
          ref={sidebarRef}
          className={cn(
            'overflow-hidden" bottom-0',
            'md:rounded-base z-sidebar overflow-hidden" relative inset-1/2 h-full rounded-[10px] bg-white px-[13.05px] py-[10.88px] md:px-6 md:py-5',
            'animate-slide-in transition-transform',
            isDragging
              ? 'transition-none'
              : 'transition-transform duration-300',
            className,
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
          {isCloseBtnShow && (
            <button
              className="absolute right-4 top-4 md:right-[26.19px] md:top-5"
              onClick={handleSideBarClose}
            >
              <div className="h-4 w-4 md:h-6 md:w-6">
                <IconX className="h-full w-full" />
              </div>
            </button>
          )}
          {children}
        </div>
      )}
    </>
  );
}
