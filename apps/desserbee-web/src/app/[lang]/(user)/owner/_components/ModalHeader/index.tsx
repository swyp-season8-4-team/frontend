import IconDirection from '@repo/design-system/components/icons/IconDirection';
import { cn } from '@repo/ui/lib/utils';

interface ModalHeaderProps {
  title: string;
  isSub?: boolean;
  onClose?: () => void;
}

export function ModalHeader({
  title,
  isSub, // NOTICE: 이전 디자인에서 헤더가 선택창일 때는 색깔이 바뀌어서 적용한 것. 혹시 몰라 둠
  onClose,
}: ModalHeaderProps) {
  return (
    <header
      className={cn(
        // border-b border-b-[rgba(0,0,0,0.15)]
        'relative h-[54px]',
        isSub ? 'bg-white' : 'bg-[#FFC858] text-[#14100C]',
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
