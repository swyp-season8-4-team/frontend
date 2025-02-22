import type { WithChildren, WithClassName } from '@repo/ui/index';
import { cn } from '@repo/ui/lib/utils';
import IconX from '../icons/IconX';

interface CustomModal extends WithChildren, WithClassName {
  onClose: () => void;
}

export function CustomModal({ onClose, children, className }: CustomModal) {
  return (
    <div className="z-modal relative">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-800/60 animate-fadeIn"
      />
      <div
        className={cn(
          'top-[40%] left-1/2 fixed bg-white border border-[#6F6F6F] rounded-[10px] text-nowrap -translate-x-1/2 -translate-y-1/2 transform animate-fadeIn',
          className,
        )}
      >
        <div
          onClick={onClose}
          className="top-2 md:top-4 right-2 md:right-4 absolute flex justify-center items-center w-5 md:w-7 md:h-7"
        >
          <IconX className="w-full h-full text-[#545454]" />
        </div>
        {children}
      </div>
    </div>
  );
}
