import type { ReactNode } from 'react';

interface BottomSheetProps {
  children: ReactNode;
  isOpen: boolean;
}

export function BottomSheet({ children, isOpen }: BottomSheetProps) {
  return (
    <div className="rounded-t-base bg-white px-base pt-[19px] ">
      <div className="w-full flex justify-center items-center">
        <div className="border-[5px] rounded-[5px] w-[115.5px] border-[#545454]"></div>
      </div>
      {children}
    </div>
  );
}
