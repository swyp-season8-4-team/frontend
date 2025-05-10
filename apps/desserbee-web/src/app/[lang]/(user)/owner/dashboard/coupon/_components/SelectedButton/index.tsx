import React from "react";

interface SelectButtonProps {
  value: string | boolean | string[];
  options: { value: string | boolean; label: string }[];
  onChange: (value: string | boolean | string[]) => void;
}

export function SelectButton({
  value,
  options,
  onChange,
}: SelectButtonProps) {
  // 다중 선택 로직 추가
  const handleToggle = (itemValue: string | boolean) => {
    if (Array.isArray(value)) {
      // 배열인 경우: 다중 선택 모드
      const newValue = value.includes(itemValue as string)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue as string];
      onChange(newValue);
    } else {
      // 단일 선택 모드
      onChange(itemValue);
    }
  };

  // 선택 상태 체크 로직
  const isSelected = (itemValue: string | boolean) => {
    return Array.isArray(value)
      ? value.includes(itemValue as string)
      : value === itemValue;
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {options.map((item) => (
        <button
          key={String(item.value)}
          type="button"
          onClick={() => handleToggle(item.value)}
          className={
            "h-[36px] w-[120px] rounded-[8px] border transition " +
            (isSelected(item.value)
              ? "border-transparent text-[#635F59]"
              : "border-gray-300 bg-white text-[#635F59]")
          }
          style={
            isSelected(item.value)
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
