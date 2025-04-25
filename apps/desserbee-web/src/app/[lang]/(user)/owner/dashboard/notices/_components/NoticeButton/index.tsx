interface ButtonProps {
  color?: string;
  height?:number;
  content: string;
  onClick?: () => void;
}

export default function NoticeButton({
  color = "#EBEBEB",
  height= 40,
  content,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        rounded-[4px] border-none cursor-pointer
        flex items-center justify-center
        transition-colors
        hover:brightness-95
        w-full
      `}
      style={{
        backgroundColor: color,
        height: `${height}px`,
      }}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
