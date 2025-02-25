import type { Menu } from '@repo/entity/src/store';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useContext, useState } from 'react';
import { MenuPictureCarouselModal } from '../../_modals/MenuPictureCarouselModal';

interface MenuTabProps {
  menus: Menu[];
}

export function MenuTab({ menus }: MenuTabProps) {
  const [showAll] = useState(false);
  const displayedMenus = showAll ? menus : menus.slice(0, 6);
  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleMoreBtnClick = () => {
    push('modal', {
      component: (
        <MenuPictureCarouselModal menus={menus} onClose={closeModal} />
      ),
    });
  };

  return (
    <div className="pb-[19px] w-full">
      <div className="flex justify-between">
        <div className="flex w-fit font-semibold text-[8px] md:text-lg">
          <span>메뉴 &nbsp;</span>
          <span className="text-[#898989]">{menus.length}</span>
        </div>
        <button onClick={handleMoreBtnClick} className="text-[6.833px] md:text-base">
          더보기
        </button>
      </div>
      <div className="gap-x-[5px] grid grid-cols-2">
        {displayedMenus.map((menu, index) => (
          <div
            key={`${menu.menuUuid}-${index}`}
            className="flex justify-between w-full text-[8px] "
          >
            <div className='md:text-xl'>{menu.name}</div>
            <div className='md:text-lg'>{menu.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
