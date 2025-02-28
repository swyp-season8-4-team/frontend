'use client';

import IconButton from "@repo/design-system/components/buttons/IconButton";
import { IconSize } from "@repo/design-system/components/icons";
import IconEllipsisVertical from "@repo/design-system/components/icons/IconElllipsisVertical";
import { useCallback, useState } from "react";
import Dropdown from "./Dropdown";
type FilterOption = 'all' | 'recruiting';

export default function SeeMoreIconButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<FilterOption>('all');
  
  const handleToggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const handleSelectOption = useCallback((option: FilterOption) => {
    setCurrentFilter(option);
    setIsOpen(false);
    
    // 여기서 필터링 로직 실행 또는 상태를 부모 컴포넌트로 전달
    // 예: onFilterChange(option);
  }, []);
  
  return (
    <Dropdown
      trigger={
        <IconButton size={IconSize.xs} onClick={handleToggleMenu}>
          <IconEllipsisVertical />
        </IconButton>
      }
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      items={[
        {
          id: 'recruiting',
          label: '모집중만 보기',
          onClick: () => handleSelectOption('recruiting'),
          isActive: currentFilter === 'recruiting'
        },
        {
          id: 'all',
          label: '전체보기',
          onClick: () => handleSelectOption('all'),
          isActive: currentFilter === 'all'
        }
      ]}
    />
  );
}