import type { WithClassName } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";

interface Props extends WithClassName {
  text: string;
  onClick?: () => void;
}

export default function Chip({ text, onClick, className }: Props) {
  return (  
    <span
      className={cn("flex justify-center items-center px-[3.219px] py-[4.829px] rounded-[40.239px] border-[0.402px] border-[#6F6F6F]", className)}
      onClick={onClick}
    >
      {text}
    </span>
  );
}