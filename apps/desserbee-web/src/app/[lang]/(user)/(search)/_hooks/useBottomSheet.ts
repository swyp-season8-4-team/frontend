import { useState } from 'react';

export function useBottomSheet() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen((prev) => !prev);
  };

  return {
    isBottomSheetOpen,
    toggleBottomSheet,
  };
}
