import IconCalendar from "@repo/design-system/components/icons/IconCalendar";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface CustomButtonProps {
  value?: string;
  onClick?: () => void;
}

const CustomButton = forwardRef<HTMLDivElement, CustomButtonProps>(
  ({ value, onClick }, ref) => (
    <div
      className="w-[38px] h-10 bg-[#FFC803] p-2 flex items-center justify-center cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      <IconCalendar className="w-full h-full" />
    </div>
  )
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
