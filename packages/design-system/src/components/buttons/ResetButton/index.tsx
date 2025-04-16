import IconXRound from '../../icons/IconXRound';

interface ResetButtonProps {
  isShown?: boolean;
  onClick?: () => void;
  height?: number;
  width?: number;
}

const getContainerStyle = (h: number, w: number) => `h-[${h}px] w-[${w}px]`;

export function ResetButton({
  isShown = false,
  onClick,
  height = 15,
  width = 15,
}: ResetButtonProps) {
  if (!isShown) return null;

  return (
    <div className={getContainerStyle(height, width)} onClick={onClick}>
      <IconXRound className="h-full w-full cursor-pointer text-[#CDC8C3]" />
    </div>
  );
}
