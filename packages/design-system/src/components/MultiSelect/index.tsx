import { cn } from '@repo/ui/lib/utils';
import { useState, useRef, useEffect, type MouseEvent } from 'react';
import IconCheck from '../icons/IconCheck';

interface Option {
  value: any;
  label: string;
}

interface MultiSelectProps {
  disabled?: boolean;
  placeholder?: string;
  options: Option[];
  value?: string[];
  onChange?: (selectedValues: string[]) => void;
  selectClassName?: string;
  optionClassName?: string;
}

export const MultiSelect = ({
  disabled,
  placeholder,
  options,
  value,
  onChange,
  selectClassName,
  optionClassName,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set<string>());
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedOptions(new Set(value));
  }, [value]);

  const toggleOption = (option: string) => {
    const newSelectedOptions = new Set(selectedOptions);

    if (newSelectedOptions.has(option)) {
      newSelectedOptions.delete(option);
    } else {
      newSelectedOptions.add(option);
    }

    setSelectedOptions(newSelectedOptions);
    onChange && onChange(Array.from(newSelectedOptions));
  };

  const getDisplayText = () => {
    if (selectedOptions.size === 0) {
      return placeholder || '선택하세요';
    }

    const labels = Array.from(selectedOptions).map((value) => {
      const option = options.find((opt) => opt.value === value);
      return option ? option.label : value;
    });

    return labels.join(', ');
  };

  return (
    <div
      className={cn(
        'relative w-full max-w-[149px] cursor-pointer rounded-[6px] border border-[#58616A] border-opacity-50 px-3 py-[10px] text-sm',
        disabled ? 'cursor-not-allowed opacity-50' : '',
        selectClassName,
      )}
      ref={dropdownRef}
    >
      <div
        className="flex items-center justify-between"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="truncate">{getDisplayText()}</div>
        <div className="ml-2">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}

      {isOpen && !disabled && (
        <div
          className={cn(
            'absolute left-0 top-[45px] z-10 w-full rounded-md border border-[#58616A] border-opacity-50 bg-white shadow-lg',
            optionClassName || 'max-w-[149px]',
          )}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="hover:bg-neutral-80 flex cursor-pointer items-center justify-between px-3 py-2 text-sm"
            >
              <span>{option.label}</span>
              {selectedOptions.has(option.value) && (
                <button className="h-3 w-3">
                  <IconCheck className="text-secondary-30 h-full w-full text-opacity-50" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
