'use client';

import { useContext, useState } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import type { Menu } from '@repo/entity/src/store';
import { MenuAddModal } from '../_modals/MenuAddModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import IconX from '@repo/design-system/components/icons/IconX';

interface MenuWithImage extends Menu {
  id: string;
  imageUrls?: string[];
}

export default function RegisterMenuPage() {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const {
    storeData,
    updateMenus,
    updateMenuImages,
    completeStep,
    goToNextStep,
    updateMenuImage,
    removeMenuImage,
    getMenuThumbnailUrl,
  } = useRegister();

  const [menus, setMenus] = useState<MenuWithImage[]>(
    (storeData.menus || []).map((menu) => ({
      ...menu,
      id: `menu-${Date.now()}-${Math.random()}`,
    })),
  );

  const openMenuAddModal = () => {
    push('modal', {
      component: <MenuAddModal onClose={closeMenuAddModal} />,
    });
  };

  const closeMenuAddModal = (menu?: Menu, files?: File[]) => {
    if (menu) {
      const menuWithId = {
        ...menu,
        id: `menu-${Date.now()}`,
      };

      setMenus((prev) => [...prev, menuWithId]);

      if (files?.length && menu.imageFileKey?.length) {
        files.forEach((file, index) => {
          if (menu.imageFileKey?.[index]) {
            updateMenuImage(menu.imageFileKey[index], file);
          }
        });
      }
    }
    pop('modal');
  };

  const handleDeleteMenu = (menuId: string) => {
    const menuToDelete = menus.find((menu) => menu.id === menuId);

    if (menuToDelete?.imageFileKey?.length) {
      menuToDelete.imageFileKey.forEach((key) => {
        removeMenuImage(key);
      });
    }

    setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    updateMenus(menus);
    const menuImageFiles = Array.from(storeData.menuImageMap.values());
    updateMenuImages(menuImageFiles);

    completeStep(RegisterStep.MENU);
    goToNextStep();
    router.push(`${NavigationPathname.OwnerRegisterComplete}`);
  };

  const handlePrevStep = () => {
    updateMenus(menus);
    const menuImageFiles = Array.from(storeData.menuImageMap.values());
    updateMenuImages(menuImageFiles);
    router.back();
  };

  return (
    <form onSubmit={handleNextStep}>
      <div className="px-base">
        <button
          onClick={openMenuAddModal}
          type="button"
          className="w-full rounded-[10px] border border-[#949494] bg-[#F5F5F5] px-[14px] py-3"
        >
          + 새 메뉴 추가
        </button>
      </div>

      <div className="flex flex-col pb-[80px]">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="px-base flex gap-3 border-b border-[#A7A7A7] py-[18.5px]"
          >
            {menu.imageFileKey?.[0] &&
              getMenuThumbnailUrl(menu.imageFileKey[0]) && (
                <div className="h-[74px] w-[74px] overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#F5F5F5]">
                  <Image
                    width={100}
                    height={100}
                    src={getMenuThumbnailUrl(menu.imageFileKey[0])!}
                    alt={`메뉴 사진 ${menu.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            <div className="flex-1 flex-col justify-center">
              <div className="font-semibold">{menu.name}</div>
              <div className="overflow-hidden truncate text-xs">
                {menu.description}
              </div>
              <div className="text-sm font-medium">
                {menu.price.toLocaleString()}원
              </div>
            </div>
            <button
              type="button"
              className="flex items-start"
              onClick={() => handleDeleteMenu(menu.id)}
            >
              <div className="h-6 w-6">
                <IconX className="h-full w-full text-[#B9B9B9]" />
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 left-0 right-0 mx-4 flex gap-x-2">
        <button
          type="button"
          onClick={handlePrevStep}
          className="w-[20%] text-nowrap rounded-[99px] border border-[#B3B3B3] bg-white p-[10px]"
        >
          이전
        </button>
        <button
          type="submit"
          className="w-[80%] rounded-[99px] bg-[#FFB700] p-[10px] text-center"
        >
          적용
        </button>
      </div>
    </form>
  );
}
