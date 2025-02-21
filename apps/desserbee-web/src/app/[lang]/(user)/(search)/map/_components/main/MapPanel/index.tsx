import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import IconTarget from '@repo/design-system/components/icons/IconTarget';
import { cn } from '@repo/ui/lib/utils';
import { useContext, useState } from 'react';
import { SaveListNotSignInModal } from '../../modal/SaveListNotSignInModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';

interface MapPanelProps {
  handleSideBarOpen: () => void;
  moveToCurrentPosition: () => void;
}

export function MapPanel({
  handleSideBarOpen,
  moveToCurrentPosition,
}: MapPanelProps) {
  const { push, pop } = useContext(PortalContext);

  const [isUserSignIn, setIsUserSignIn] = useState(true); // TODO: 후에 인증 구현되면 수정

  const closeModal = () => {
    pop('modal');
  };

  const handleOpenSideBarBtnClick = () => {
    if (isUserSignIn) {
      handleSideBarOpen();
    } else {
      push('modal', {
        component: <SaveListNotSignInModal onClose={closeModal} />,
      });
    }
  };
  return (
    <div>
      <div className="bottom-[28.05px] left-4 z-10 absolute flex flex-col gap-2 w-[47px] aspect-square">
        <button
          onClick={() => {
            if (isUserSignIn) {
              handleSideBarOpen();
            } else {
              handleOpenSideBarBtnClick();
            }
          }}
          className="flex justify-center items-center bg-white rounded-sm aspect-square"
        >
          <IconFlowerOutline className="text-[#6F6F6F]" />
        </button>
        <button
          onClick={moveToCurrentPosition}
          className={cn(
            'flex justify-center items-center aspect-square rounded-sm bg-white',
          )}
        >
          <IconTarget className="text-[#6F6F6F]" />
        </button>
      </div>
    </div>
  );
}
