import type { ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";

interface TagProps {
  children: ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
}

export function Tag({
  children,
  isSelected = false,
  disabled = false,
}: TagProps) {
  return (
    <button
      className={cn(
        "rounded-[100px] w-[104px] h-[37px] font-medium text-center text-lg text-nowrap",
        isSelected && "bg-primary text-white",
        !isSelected && "bg-white text-[#545454]"
      )}
      disabled={disabled}>
      {children}
    </button>
  );
}
