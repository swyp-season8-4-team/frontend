import type { InputHTMLAttributes } from 'react';
import type { WithClassName } from '@repo/ui';
import type { Iconable } from './icons';

interface Props extends WithClassName, InputHTMLAttributes<HTMLInputElement> {
  icon?: Iconable;
}

export default function InputField({
  className,
  placeholder,
  name,
  type,
  icon,
  defaultValue,
}: Props) {
  return (
    <div className="flex self-stretch relative w-full mx-auto">
      {/* 아이콘 */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 peer-focus:text-mint-600">
        {icon}
      </div>

      <input
        className={`
          w-full min-w-[214px] h-12 
          px-4 
          text-base font-normal leading-4 
          text-brand-450
          placeholder:text-gray-800 placeholder:text-base placeholder:font-normal placeholder:leading-4
          border border-gray-800 
          rounded-full
          hover:border-gray-600
          focus:outline-none focus:border-mint-600 focus:caret-mint-600
          ${className}
        `}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}