import { useState } from 'react';

export function useBottomSheet() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheetOpen = () => {
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  return {
    isBottomSheetOpen,
    handleBottomSheetOpen,
    handleBottomSheetClose,
  };
}
