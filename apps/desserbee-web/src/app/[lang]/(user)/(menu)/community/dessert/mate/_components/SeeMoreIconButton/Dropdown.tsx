'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Dropdown({ trigger, items, isOpen, onClose }: DropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, onClose]);
  
  return (
    <div className="relative">
      {trigger}
      
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 top-8 w-28 bg-white rounded-md shadow-md z-10 py-1 border border-gray-100"
        >
          {items.map(item => (
            <button 
              key={item.id}
              className={`w-full text-left px-4 py-2 text-[#6F6F6F] text-xs font-semibold hover:bg-gray-50 ${
                item.isActive ? 'bg-gray-50' : ''
              }`}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 