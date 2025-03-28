import IconDirection from '@repo/design-system/components/icons/IconDirection';
import { cn } from '@repo/ui/lib/utils';

interface StoreRegisterHeaderProps {
  title: string;
  isSub?: boolean;
  onClose?: () => void;
}

export function StoreRegisterHeader({
  title,
  isSub,
  onClose,
}: StoreRegisterHeaderProps) {
  return (
    <header
      className={cn(
        'relative h-[50px]',
        isSub ? 'bg-[#F7F6F2]' : 'bg-[#E8E8E8]',
      )}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute left-[10px] top-[50%] -translate-y-1/2 rotate-90"
        >
          <IconDirection />
        </button>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
        {title}
      </div>
    </header>
  );
}
