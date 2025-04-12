import type { ChangeEvent } from 'react';

interface HiddenImageInputProps {
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export function HiddenImageInput({
  id,
  onChange,
  multiple,
  disabled,
}: HiddenImageInputProps) {
  return (
    <input
      className="hidden"
      type="file"
      id={id}
      onChange={onChange}
      accept="image/*"
      multiple={multiple}
      disabled={disabled}
    />
  );
}
