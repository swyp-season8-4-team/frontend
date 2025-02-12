import type { ReactNode } from 'react';

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
    <AnimatePresence mode="wait">
      {isBottomSheetOpen && (
        <motion.div
        // TODO: 바텀시트 어떻게 닫히는지 (빈 공간 클릭 OR 드래그)
        // className="fixed inset-0  z-bottomSheet"
        // animate={isOpen ? { opacity: 1 } : { opacity: 0, display: 'none' }}
        // initial={{ opacity: 0 }}
        // onClick={toggleOpen}
        >
          <motion.div
            layoutId="bottomSheet"
            style={{ willChange: 'transform' }}
            className="fixed bottom-0 left-0 right-0  w-full rounded-t-base bg-white px-base pt-[19px]  z-bottomSheet"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragDirectionLock
            dragMomentum={false}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 300) {
                handleBottomSheetClose();
              }
            }}
            variants={{
              open: {
                y: 0,
                height: '500px',
                transition: {
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                  mass: 0.8,
                  restDelta: 0.001,
                },
              },
              collapsed: {
                y: '100%',
                height: 0,
                transition: {
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                  mass: 0.8,
                  restDelta: 0.001,
                },
              },
            }}
          >
            <div>
              <div className="w-full flex justify-center items-center">
                <div className="border-[3px] rounded-[5px] w-[115.5px] h- border-[#545454] mb-[21px]"></div>
              </div>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
