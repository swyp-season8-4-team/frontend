
interface Props {
  text: string;
  onClick?: () => void;
}

export default function Chip({ text, onClick }: Props) {
  return (
    <span
      className="flex justify-center items-center gap-[6.05px] px-[9.076px] py-[6.05px] rounded-[75.63px] border-[0.756px] border-[#6F6F6F]"
      onClick={onClick}
    >
      {text}
    </span>
  );
}