import type { WithChildren, WithClassName } from '@repo/ui/index';
import IconX from '../icons/IconX';
import { IconSize } from '../icons';
import { motion, AnimatePresence } from 'framer-motion';
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
    <AnimatePresence mode="sync">
      {isSideBarOpen && (
        <motion.div
          className={cn(
            'relative h-full px-[13.05px] py-[10.88px] md:px-6  md:py-5 bg-white rounded-[10px] md:rounded-base z-sidebar',
            className,
          )}
          layoutId="map-sidebar"
          layout={false}
          style={{ willChange: 'transform' }}
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          onClick={(e) => e.stopPropagation()}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragDirectionLock
          dragMomentum={false}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100 || info.velocity.x > 300) {
              handleSideBarClose();
            }
          }}
          variants={{
            open: {
              x: 0,
              width: '50%',
              transition: {
                type: 'spring',
                damping: 20,
                stiffness: 150,
                restDelta: 0.0001,
                restSpeed: 0.0001,
              },
            },
            collapsed: {
              x: '100%',
              width: '50%', // 닫힐 때 너비 유지
              transition: {
                type: 'spring',
                damping: 25,
                stiffness: 120,
                restDelta: 0.0001,
                restSpeed: 0.0001,
              },
            },
          }}
        >
          <button
            className="hidden md:block top-7 right-[26.19px] md:absolute"
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
