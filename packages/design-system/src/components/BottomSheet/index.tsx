import { memo, type ReactNode } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

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
  return (
    <AnimatePresence mode="sync">
      {isBottomSheetOpen && (
        <motion.div
        // TODO: 바텀시트 어떻게 닫히는지 (빈 공간 클릭 OR 드래그)
        // className="z-bottomSheet fixed inset-0"
        // animate={isOpen ? { opacity: 1 } : { opacity: 0, display: 'none' }}
        // initial={{ opacity: 0 }}
        // onClick={toggleOpen}
        >
          <motion.div
            layoutId="map-bottom-sheet"
            layout={false}
            style={{ willChange: 'transform' }}
            className="right-0 bottom-0 z-bottomSheet left-0 fixed bg-white px-base pt-[19px] pb-4 rounded-t-base w-full"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragDirectionLock
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 300) {
                handleBottomSheetClose();
              }
            }}
            variants={{
              open: {
                y: 0,
                height: 'auto',
                transition: {
                  type: 'spring',
                  damping: 20,
                  stiffness: 150,
                  restDelta: 0.0001,
                  restSpeed: 0.0001,
                },
              },
              collapsed: {
                y: '100%',
                height: 0,
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
            <div className="h-full">
              <div className="flex justify-center items-center mb-[21px] w-full">
                <div className="absolute border-[#545454] border-[2.14px] md:border-[3px] rounded-[5px] w-[49.33px] md:w-[115.5px]"></div>
              </div>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
