'use client';

import IconButton from "@repo/design-system/components/buttons/IconButton";
import { IconSize } from "@repo/design-system/components/icons";
import IconEllipsisVertical from "@repo/design-system/components/icons/IconElllipsisVertical";
import { useCallback, useState } from "react";
import Dropdown from "@repo/design-system/components/DropDown";
import { toast } from "react-hot-toast";

type FilterOption = 'url' | 'share';

export default function MateDetailSeeMoreButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const handleSelectOption = useCallback((option: FilterOption) => {
    switch (option) {
      case 'url':
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            toast.success('URL이 클립보드에 복사되었습니다.');
          })
          .catch(() => {
            toast.error('URL 복사에 실패했습니다.');
          });
        break;
      case 'share':
        // Check if Web Share API is supported
        if (navigator.share) {
          navigator.share({
            title: '디저트 - 디저비 메이트',
            text: '디저비에서 메이트를 확인해보세요!',
            url: window.location.href,
          })
          .catch((error) => {
            console.error('공유하기 실패:', error);
            // Fallback to clipboard copy if sharing fails
            navigator.clipboard.writeText(window.location.href)
              .then(() => {
                toast.success('URL이 클립보드에 복사되었습니다.');
              })
              .catch(() => {
                toast.error('공유하기에 실패했습니다.');
              });
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          navigator.clipboard.writeText(window.location.href)
            .then(() => {
              toast.success('URL이 클립보드에 복사되었습니다.');
            })
            .catch(() => {
              toast.error('공유하기에 실패했습니다.');
            });
        }
        break;
    }
    setIsOpen(false);
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
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="11" viewBox="0 0 18 11" fill="none">
              <path d="M10.125 5.5C10.125 7.885 8.1975 9.8125 5.8125 9.8125C3.4275 9.8125 1.5 7.885 1.5 5.5C1.5 3.115 3.4275 1.1875 5.8125 1.1875" stroke="#393939" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 5.5C7.5 3.0175 9.5175 1 12 1C14.4825 1 16.5 3.0175 16.5 5.5C16.5 7.9825 14.4825 10 12 10" stroke="#393939" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          label: 'URL 복사',
          onClick: () => handleSelectOption('url')
        },
        {
          id: 'all',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M4.43692 4.09899L11.0153 1.90618C13.9675 0.922127 15.5714 2.5338 14.5951 5.48596L12.4023 12.0644C10.9301 16.4887 8.5126 16.4887 7.0404 12.0644L6.38953 10.1118L4.43692 9.46091C0.0125626 7.9887 0.0125626 5.57894 4.43692 4.09899Z" stroke="#393939" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.53662 9.77876L9.31056 6.99707" stroke="#393939" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          label: '공유하기',
          onClick: () => handleSelectOption('share'),
        }
      ]}
    />
  );
}