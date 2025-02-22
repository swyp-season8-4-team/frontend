import type { WithClassName } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";

interface Props extends WithClassName {
  text: string;
  onClick?: () => void;
}

export default function Chip({ text, onClick, className }: Props) {
  return (  
    <span
      className={cn("flex justify-center items-center gap-[6.05px] px-[9.076px] py-[6.05px] rounded-[75.63px] border-[0.756px] border-[#6F6F6F]", className)}
      onClick={onClick}
    >
      {text}
    </span>
  );
}