import React from "react";

interface SelectButtonProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function SelectButton({
  value,
  options,
  onChange,
}: SelectButtonProps) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {options.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={
            "h-[36px] w-[60px] rounded-[8px] border transition " +
            (value === item.value
              ? "border-transparent text-[#635F59]"
              : "border-gray-300 bg-white text-[#635F59]")
          }
          style={
            value === item.value
              ? { backgroundColor: "#FFDEA7" }
              : {}
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
