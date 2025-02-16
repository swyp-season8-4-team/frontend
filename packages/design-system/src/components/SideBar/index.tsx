import type { WithChildren, WithClassName } from '@repo/ui/index';
import IconX from '../icons/IconX';
import { IconSize } from '../icons';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@repo/ui/lib/utils';

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
    <AnimatePresence mode="wait">
      {isSideBarOpen && (
        <motion.div
          className={cn(
            'relative h-full px-6 py-5 bg-white rounded-base z-sidebar',
            className,
          )}
        >
          <button
            className="absolute right-[26.19px] top-7"
            onClick={handleSideBarClose}
          >
            <IconX />
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
