import { cn } from '@repo/ui/lib/utils';
import IconCheck from '../icons/IconCheck';

interface CheckButtonProps {
  setFunction: (index?: any) => void;
  isChecked?: boolean;
}

export function CheckButton({ setFunction, isChecked }: CheckButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-[7px]"
      onClick={setFunction}
    >
      <div
        className={cn(
          'flex aspect-square h-[13.5px] w-[13.5px] items-center justify-center rounded-[1.5px]',
          isChecked ? 'bg-secondary-60' : 'bg-[#9D9D9D]',
        )}
      >
        <div className="h-2 w-2">
          <IconCheck className="h-full w-full text-white" />
        </div>
      </div>
    </button>
  );
}
