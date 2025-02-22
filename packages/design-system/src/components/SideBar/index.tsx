import type { WithChildren, WithClassName } from '@repo/ui/index';
import IconX from '../icons/IconX';
import { cn } from '@repo/ui/lib/utils';
import { useRef, useState } from 'react';

interface SideBarProps extends WithChildren, WithClassName {
  isSideBarOpen: boolean;
  handleSideBarClose: () => void;
}

export function SideBar({
  children,
  className,
  isSideBarOpen,
  handleSideBarClose,
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
    if (offsetX > 100) {
      // 100px 이상 드래그하면 닫기
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
            'relative h-full px-[13.05px] py-[10.88px] md:px-6 md:py-5 bg-white rounded-[10px] md:rounded-base z-sidebar',
            'animate-slide-in transition-transform',
            isDragging
              ? 'transition-none'
              : 'transition-transform duration-500',
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
          <button
            className="hidden md:block top-7 right-[26.19px] md:absolute"
            onClick={handleSideBarClose}
          >
            <IconX />
          </button>
          {children}
        </div>
      )}
    </>
  );
}
