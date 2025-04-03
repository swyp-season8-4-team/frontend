import { cn } from '@repo/ui/lib/utils';
import IconCheck from '../icons/IconCheck';

interface CheckButtonProps {
  setFunction: (index?: any) => void;
  isChecked?: boolean;
  isAllChecked?: boolean;
}

export function CheckButton({
  setFunction,
  isChecked,
  isAllChecked, // 전체 선택
}: CheckButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-[7px]"
      onClick={setFunction}
    >
      <div
        className={cn(
          'border-neutral-30 flex aspect-square h-[13.5px] w-[13.5px] items-center justify-center rounded-[1.5px]',
          isChecked && 'bg-secondary-60',
          isAllChecked && 'bg-[#7A590C]',
          !isChecked && !isAllChecked && 'border-[2px] bg-white',
        )}
      >
        {isChecked && (
          <div className="h-2 w-2">
            <IconCheck className="flex h-full w-full items-center text-white" />
          </div>
        )}
        {isAllChecked && (
          <div className="w-2 border-t-[2px] border-white"></div>
        )}
      </div>
    </button>
  );
}
