import { cn } from '@repo/ui/lib/utils';

interface StoreRegisterHeaderProps {
  title: string;
  isSub?: boolean;
}

export function StoreRegisterHeader({
  title,
  isSub,
}: StoreRegisterHeaderProps) {
  return (
    <header
      className={cn(
        'flex h-[50px] w-full items-center justify-center',
        isSub ? 'bg-[#F7F6F2]' : 'bg-[#E8E8E8]',
      )}
    >
      <div className="font-semibold">{title}</div>
    </header>
  );
}
