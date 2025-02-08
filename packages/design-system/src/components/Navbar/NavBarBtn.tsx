import { cn } from '@repo/ui/lib/utils';

interface NavBarBtnProps {
  icon: React.ReactNode;
  text: string;
  isSelected: boolean;
  onClick?: () => void;
}

export function NavBarBtn({ icon, text, isSelected, onClick }: NavBarBtnProps) {
  return (
    <button onClick={onClick}>
      <div className="flex flex-col justify-center items-center">
        <div>{icon}</div>
        <div
          className={cn(
            '-tracking-[3%] text-nowrap',
            isSelected
              ? 'text-primary font-bold'
              : 'text-[#545454] font-normal',
          )}
        >
          {text}
        </div>
      </div>
    </button>
  );
}
