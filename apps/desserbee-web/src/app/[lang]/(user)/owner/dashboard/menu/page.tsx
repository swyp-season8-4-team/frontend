'use client';

import { useContext, useState } from 'react';
import type { Menu } from '@repo/entity/src/store';
import { MenuAddModal } from '../../register/_modals/MenuAddModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import IconX from '@repo/design-system/components/icons/IconX';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { AddButton } from '../../register/_components/AddButton';
interface MenuWithImage extends Menu {
  id: string;
}

export default function RegisterMenuPage() {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const [menus, setMenus] = useState<MenuWithImage[]>([]);

  const openMenuAddModal = () => {
    push('modal', {
      component: <MenuAddModal onClose={closeMenuAddModal} />,
    });
  };

  const closeMenuAddModal = (menu?: Menu, imageFiles?: File[]) => {
    if (menu && imageFiles?.[0]) {
      const menuWithId = {
        ...menu,
        id: `menu-${Date.now()}`,
        imageFileKey: URL.createObjectURL(imageFiles[0]),
      };
      setMenus((prev) => [...prev, menuWithId]);
    }
    pop('modal');
  };

  const handleDeleteMenu = (menuId: string) => {
    setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (menus.length === 0) return;
  };

  return (
    <>
      {/* 헤더 추가하셔야해요  - 공통 헤더로 사용 불가능 - 사장님 대시보드 배지있음음*/}
      <form onSubmit={onSubmit}>
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
                <AddButton
                  onClick={openMenuAddModal}
                  text="새 메뉴 추가"
                  clasName="mt-[10px] max-w-[130px]"
                />
              </div>
            </div>
          ) : (
            <div className="p-base flex items-center justify-between border-y border-[#CDC8C3]">
              <div className="flex items-center gap-[5px]">
                <div className="text-sm font-semibold">메뉴</div>
                <div className="text-xs text-[#898989]">{menus.length}개</div>
              </div>
              <AddButton
                onClick={openMenuAddModal}
                text="새 메뉴 추가"
                clasName="max-w-[130px]"
              />
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
                <div className="text-neutral-30 text-xs">
                  {menu.description}
                </div>
                <div className="text-sm font-medium">
                  {menu.price.toLocaleString()}원
                </div>
              </div>
              {menu.imageFileKey && (
                <div className="h-20 w-20 overflow-hidden rounded-md border border-[#EFEDEB]">
                  <Image
                    width={100}
                    height={100}
                    src={menu.imageFileKey || ''}
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
          <OliveButton
            isDisabled={menus.length === 0}
            className="w-full font-semibold"
            text="다음"
            type="submit"
          />
        </div>
      </form>
    </>
  );
}
