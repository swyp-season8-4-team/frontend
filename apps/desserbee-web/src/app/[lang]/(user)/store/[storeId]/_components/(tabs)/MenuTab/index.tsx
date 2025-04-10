import type { Menu } from '@repo/entity/src/store';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useContext, useState } from 'react';
import { MenuPictureCarouselModal } from '../../../_modals/MenuPictureCarouselModal';

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
    <div className="pb-[19px] md:pb-[44px] w-full">
      <div className="flex justify-between">
        <div className="flex md:mb-[18px] w-fit font-semibold text-[10px] md:text-lg">
          <div></div>
          <span>메뉴 &nbsp;</span>
          <span className="text-[#898989]">{menus.length}</span>
        </div>
        {menus.length > 0 && (
          <button
            onClick={handleMoreBtnClick}
            className="text-[10px] md:text-base"
          >
            더보기
          </button>
        )}
      </div>
      <div className="gap-x-[5px] md:gap-y-[18px] md:gap-x-[14px] grid grid-cols-2">
        {displayedMenus.map((menu, index) => (
          <div
            key={`${menu.menuUuid}-${index}`}
            className="flex justify-between w-full text-[10px]"
          >
            <div className="flex gap-[2px] items-center">
              <div className="md:text-xl">{menu.name}</div>
              {menu.isPopular ? (
                <div className="text-[8px] md:text-base text-primary">
                  인기 메뉴
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="md:text-lg">{menu.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
