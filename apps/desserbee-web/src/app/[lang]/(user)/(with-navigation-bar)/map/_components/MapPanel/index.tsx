import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import IconTarget from '@repo/design-system/components/icons/IconTarget';
import { useContext } from 'react';
import { SaveListNotSignInModal } from '../../_modals/SaveListNotSignInModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/UserContext';
import { NavigationPathname } from '@repo/entity/src/navigation';

interface MapPanelProps {
  moveToCurrentPosition: () => void;
}

export default function MapPanel({ moveToCurrentPosition }: MapPanelProps) {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const { user } = useContext(UserContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleOpenSideBarBtnClick = () => {
    if (user) {
      router.push(`${NavigationPathname.Map}?sidebar=true`);
    } else {
      push('modal', {
        component: <SaveListNotSignInModal onClose={closeModal} />,
      });
    }
  };
  return (
    <div>
      <div className="absolute bottom-[28.05px] left-4 z-10 flex aspect-square w-[47px] flex-col gap-2">
        <button
          onClick={() => {
            if (user) {
              router.push(`/map?sidebar=true`); // 사이드바 열기 위해
            } else {
              handleOpenSideBarBtnClick();
            }
          }}
          className="active:bg-neutral-80 flex aspect-square h-8 w-8 items-center justify-center rounded-sm bg-white p-1"
          aria-label="저장한 가게 리스트 사이드바 열기"
        >
          <IconFlowerOutline className="h-full w-full text-[#6F6F6F]" />
        </button>
        <button
          onClick={moveToCurrentPosition}
          className="active:bg-neutral-80 flex aspect-square h-8 w-8 items-center justify-center rounded-sm bg-white p-1"
          aria-label="내 위치로 돌아가기"
        >
          <IconTarget className="h-full w-full text-[#6F6F6F]" />
        </button>
      </div>
    </div>
  );
}
