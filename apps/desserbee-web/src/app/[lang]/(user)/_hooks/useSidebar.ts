import { useState } from 'react';

export function useSideBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleSideBarOpen = () => {
    setIsSideBarOpen(true);
  };

  const handleSideBarClose = () => {
    setIsSideBarOpen(false);
  };

  return {
    isSideBarOpen,
    handleSideBarOpen,
    handleSideBarClose,
  };
}
