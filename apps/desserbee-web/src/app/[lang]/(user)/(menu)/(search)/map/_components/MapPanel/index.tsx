import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import IconTarget from '@repo/design-system/components/icons/IconTarget';
import { useContext, useState } from 'react';
import { SaveListNotSignInModal } from '../../_modals/SaveListNotSignInModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';

interface MapPanelProps {
  moveToCurrentPosition: () => void;
}

export function MapPanel({ moveToCurrentPosition }: MapPanelProps) {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const [isUserSignIn] = useState(true); // TODO: 후에 인증 구현되면 수정

  const closeModal = () => {
    pop('modal');
  };

  const handleOpenSideBarBtnClick = () => {
    if (isUserSignIn) {
      router.push(`/map?sidebar=true`);
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
              router.push(`/map?sidebar=true`); // 사이드바 열기 위해
            } else {
              handleOpenSideBarBtnClick();
            }
          }}
          className="flex justify-center items-center bg-white p-1 rounded-sm w-8 h-8 aspect-square"
        >
          <IconFlowerOutline className="w-full h-full text-[#6F6F6F]" />
        </button>
        <button
          onClick={moveToCurrentPosition}
          className="flex justify-center items-center bg-white p-1 rounded-sm w-8 h-8 aspect-square"
        >
          <IconTarget className="w-full h-full text-[#6F6F6F]" />
        </button>
      </div>
    </div>
  );
}
