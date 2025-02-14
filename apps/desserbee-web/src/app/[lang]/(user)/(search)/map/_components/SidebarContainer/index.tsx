import { SideBar } from '@repo/design-system/components/SideBar';
interface sideBarProps {
  isSideBarOpen: boolean;
  handleSideBarClose: () => void;
}

export function SideBarContainer({
  isSideBarOpen,
  handleSideBarClose,
}: sideBarProps) {
  const sideBarProps = {
    className: 'absolute top-0 h-full md:w-[320px] right-0',
    isSideBarOpen,
    handleSideBarClose,
  };

  return (
    <SideBar {...sideBarProps}>
      <div>리스트</div>
    </SideBar>
  );
}
