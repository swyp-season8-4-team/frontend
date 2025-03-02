import type { WithClassName } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";

interface Props extends WithClassName {
  text: string;
  onClick?: () => void;
}

export default function Chip({ text, onClick, className }: Props) {
  return (  
    <span
      className={cn("flex justify-center items-center px-[3.219px] py-[4.829px] rounded-[40.239px]", className)}
      onClick={onClick}
    >
      {text}
    </span>
  );
}