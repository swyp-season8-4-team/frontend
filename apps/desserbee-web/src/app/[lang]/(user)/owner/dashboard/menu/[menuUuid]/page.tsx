'use client';
import {
  editMenu,
  getMenu,
} from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import type { EditMenuRequest, Menu } from '@repo/entity/src/store';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { MenuAddModal } from '../../../register/_modals/MenuAddModal';

export default function MenuDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const menuUuid = params.menuUuid as string;
  const storeUuid = searchParams.get('storeUuid');
  const { push, pop } = useContext(PortalContext);

  const [menu, setMenu] = useState<Menu>();

  useEffect(() => {
    if (storeUuid && menuUuid) {
      const fetchMenu = async () => {
        try {
          const data = await getMenu({ storeUuid, menuUuid });
          setMenu(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMenu();
    }
  }, [storeUuid, menuUuid]);
  console.log(menu);

  const openMenuAddModal = () => {
    push('modal', {
      component: (
        <MenuAddModal
          onClose={closeMenuAddModal}
          menu={menu} // 기존 메뉴 데이터 전달
          mode="edit" // 모드 지정
        />
      ),
    });
  };

  const closeMenuAddModal = async (updatedMenu?: Menu, imageFiles?: File[]) => {
    try {
      if (updatedMenu && storeUuid && menuUuid) {
        const request: EditMenuRequest = {
          name: updatedMenu.name,
          price: updatedMenu.price,
          isPopular: updatedMenu.isPopular ?? false,
          description: updatedMenu.description || '',
          ...(imageFiles && imageFiles.length > 0
            ? { imageFileKey: imageFiles[0].name }
            : {}),
        };
        await editMenu({
          storeUuid,
          menuUuid,
          request,
          file: imageFiles && imageFiles.length > 0 ? imageFiles[0] : undefined,
        });
        alert('메뉴 수정 성공!');
        router.back();
      }
    } catch (error) {
      console.error(error);
      alert('메뉴 수정에 실패했습니다');
    }
    pop('modal');
  };

  if (!menu) return null;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full p-6 md:w-[768px]">
        <div className="mb-6 flex items-center justify-center">
          <div className="relative h-96 w-96 flex-shrink-0 overflow-hidden">
            {menu?.images && menu.images.length > 0 && menu.images[0] ? (
              <Image
                fill
                src={menu.images[0]}
                alt="메뉴 사진"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{menu.name}</div>
          <div className="mt-1 text-lg font-semibold text-green-600">
            {menu.price.toLocaleString()}{' '}
            <span className="text-base text-gray-700">원</span>
          </div>
        </div>
        <hr className="mb-4 mt-2" />
        <div className="mb-6 min-h-[48px] whitespace-pre-line text-base leading-relaxed text-gray-700">
          {menu.description || (
            <span className="text-gray-400">설명이 없습니다.</span>
          )}
        </div>
        <OliveButton
          className="w-full py-3 text-lg"
          text="수정하기"
          onClick={openMenuAddModal}
        />
      </div>
    </div>
  );
}
