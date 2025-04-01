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
import IconPlusRound from '@repo/design-system/components/icons/IconPlusRound';

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
      <div>
        {menus.length === 0 ? (
          <div className="px-base py-base flex min-h-[calc(100vh-150px)] w-full flex-col items-center justify-center gap-2">
            <div className="flex w-full flex-col items-center gap-0">
              <div className="text-sm text-[#424242]">
                현재 등록된 메뉴가 없습니다.
              </div>
              <div className="text-sm text-[#424242]">
                새 메뉴를 추가해주세요
              </div>
              <button
                onClick={openMenuAddModal}
                type="button"
                className="mt-4 flex w-full max-w-[130px] items-center gap-[11.5px] rounded-[6px] border border-[#CDC8C3] bg-white px-3 py-[10px]"
              >
                <div className="h-[18px] w-[18px]">
                  <IconPlusRound className="text-neutral-20 h-full w-full" />
                </div>
                <div className="text-neutral-20 h-full w-full text-sm">
                  새 메뉴 추가
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-base flex items-center justify-between border-y border-[#CDC8C3]">
            <div className="flex items-center gap-[5px]">
              <div className="text-sm font-semibold">메뉴</div>
              <div className="text-xs text-[#898989]">{menus.length}개</div>
            </div>
            <button
              onClick={openMenuAddModal}
              type="button"
              className="flex w-full max-w-[130px] items-center gap-[10px] rounded-[6px] border border-[#CDC8C3] bg-white px-3 py-[10px]"
            >
              <div className="h-[18px] w-[18px]">
                <IconPlusRound className="text-neutral-20 h-full w-full" />
              </div>
              <div className="text-neutral-20 h-full w-full text-sm">
                새 메뉴 추가
              </div>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col pb-[80px]">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="px-base flex gap-3 border-b border-[#CDC8C3] py-[18.5px]"
          >
            <div className="flex-1 flex-col justify-center">
              <div className="font-semibold">{menu.name}</div>
              <div className="overflow-hidden truncate text-xs">
                {menu.description}
              </div>
              <div className="text-sm font-medium">
                {menu.price.toLocaleString()}원
              </div>
            </div>
            {menu.imageFileKey?.[0] &&
              getMenuThumbnailUrl(menu.imageFileKey[0]) && (
                <div className="h-20 w-20 overflow-hidden rounded-md border border-[#EFEDEB]">
                  <Image
                    width={100}
                    height={100}
                    src={getMenuThumbnailUrl(menu.imageFileKey[0])!}
                    alt={`메뉴 사진 ${menu.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            <button
              type="button"
              className="flex items-start"
              onClick={() => handleDeleteMenu(menu.id)}
            >
              <div className="h-6 w-6">
                <IconX className="text-neutral-40 h-full w-full" />
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 left-0 right-0 mx-4 flex gap-x-2">
        {/* <button
          type="button"
          onClick={handlePrevStep}
          className="w-[20%] text-nowrap rounded-[6px] border border-[#B3B3B3] bg-white p-[10px]"
        >
          이전
        </button>
        <button
          type="submit"
          className="bg-primary-80 w-[80%] rounded-[6px] p-[10px] text-center text-[#412D00]"
        >
          다음
        </button> */}
        <button
          type="submit"
          className="bg-secondary-40 w-full rounded-[6px] p-[10px] text-center text-white"
        >
          다음
        </button>
      </div>
    </form>
  );
}
