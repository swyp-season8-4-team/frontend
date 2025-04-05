import IconPlusRound from '@repo/design-system/components/icons/IconPlusRound';
import { cn } from '@repo/ui/lib/utils';

interface AddButtonProps {
  onClick?: () => void;
  text?: string;
  clasName?: string;
}

export function AddButton({ onClick, text, clasName }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex w-full items-center gap-[10px] rounded-[6px] border border-[#CDC8C3] bg-white px-3 py-[10px]',
        clasName,
      )}
    >
      <div className="h-[18px] w-[18px]">
        <IconPlusRound className="text-neutral-20 h-full w-full" />
      </div>
      <div className="text-neutral-20 h-full w-full text-sm">{text}</div>
    </button>
  );
}
