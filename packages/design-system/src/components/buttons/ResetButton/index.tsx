import IconXRound from '../../icons/IconXRound';
interface ResetButtonProps {
  isShown?: boolean;
  onClick?: () => void;
}
export function ResetButton({ isShown = false, onClick }: ResetButtonProps) {
  if (!isShown) return null;

  return (
    <div className="h-[15px] w-[15px]" onClick={onClick}>
      <IconXRound className="h-full w-full cursor-pointer text-[#CDC8C3]" />
    </div>
  );
}
