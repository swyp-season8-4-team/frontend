import type { ReactNode } from 'react';
import IconXRound from '../icons/IconXRound';

interface PhotoBoxProps {
  image: ReactNode;
  deleteFunction?: (index?: any) => void;
}

export function PhotoBox({ image, deleteFunction }: PhotoBoxProps) {
  return (
    <div>
      <div className="h-[68px] w-[68px] overflow-hidden rounded-[9.38px] border-[1.17px] border-[#96938E]">
        {image}
      </div>
      {deleteFunction && (
        <button
          type="button"
          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#CDC8C3] text-sm text-white shadow-[0px_1px_3px_1px_#39393921]"
          onClick={deleteFunction}
        >
          <IconXRound className="h-full w-full text-[#CDC8C3]" />
        </button>
      )}
    </div>
  );
}
