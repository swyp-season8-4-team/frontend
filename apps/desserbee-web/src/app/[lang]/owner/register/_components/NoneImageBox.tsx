import type { ReactNode } from 'react';

interface NoneImageBoxProps {
  isShown?: boolean;
  description: ReactNode;
}

export function NoneImageBox({ isShown, description }: NoneImageBoxProps) {
  return (
    <>
      {isShown && (
        <div className="text-neutral-40 flex h-[68px] grow flex-col items-center justify-center rounded-[12px] bg-[#EFEDEB] text-sm">
          {description}
        </div>
      )}
    </>
  );
}
