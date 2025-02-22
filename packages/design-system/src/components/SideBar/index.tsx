import type { WithChildren, WithClassName } from '@repo/ui/index';
import IconX from '../icons/IconX';
import { cn } from '@repo/ui/lib/utils';
import { memo } from 'react';

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
  return (
    <>
      {isSideBarOpen && (
        <div
          className={cn(
            'relative h-full px-[13.05px] py-[10.88px] md:px-6 md:py-5 bg-white rounded-[10px] md:rounded-base z-sidebar',
            'animate-slide-in',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
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
