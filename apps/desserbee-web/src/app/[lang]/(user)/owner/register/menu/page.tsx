'use client';

import { useContext, useState, useEffect } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import type { Menu } from '@repo/entity/src/store';
import { MenuAddModal } from '../_modals/MenuAddModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import IconX from '@repo/design-system/components/icons/IconX';
import IconPlusRound from '@repo/design-system/components/icons/IconPlusRound';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { AddButton } from '../_components/AddButton';
import MapService from '@repo/usecase/src/mapService';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';
import { KakaoMapAdapter } from '@repo/infrastructures/src/adapters/kakaoMapAdapter';

interface MenuWithImage extends Menu {
  id: string;
}

export default function RegisterMenuPage() {
  const router = useRouter();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [mapService, setMapService] = useState<MapService | null>(null);

  useEffect(() => {
    if (isScriptLoaded && !mapService) {
      // 카카오맵 로드
      kakao.maps.load(() => {
        // 임시 div 생성
        const tempDiv = document.createElement('div');
        const map = new kakao.maps.Map(tempDiv, {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        });

        // MapService 초기화
        const adapter = new KakaoMapAdapter(map);
        const controller = new KakaoMapController();
        controller['map'] = adapter; // private 필드 접근을 위해 임시로 이렇게 처리

        setMapService(new MapService({ mapController: controller }));
      });
    }
  }, [isScriptLoaded, mapService]);

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
    updateFormData,
  } = useRegister();

  // 초기 메뉴 설정 시 이미지 미리보기도 함께 설정
  useEffect(() => {
    storeData.menus.forEach((menu) => {
      if (menu.imageFileKey) {
        const file = storeData.menuImageMap.get(menu.imageFileKey);
        if (file) {
          updateMenuImage(menu.imageFileKey, file);
        }
      }
    });
  }, []);

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

      if (files?.length && menu.imageFileKey) {
        updateMenuImage(menu.imageFileKey, files[0]);
      }
    }
    pop('modal');
  };

  const handleDeleteMenu = (menuId: string) => {
    const menuToDelete = menus.find((menu) => menu.id === menuId);

    if (menuToDelete?.imageFileKey) {
      removeMenuImage(menuToDelete.imageFileKey);
    }

    setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (menus.length === 0) return;

    updateMenus(menus);
    const menuImageFiles = Array.from(storeData.menuImageMap.values());
    updateMenuImages(menuImageFiles);

    completeStep(RegisterStep.MENU);
    goToNextStep();
    router.push(`${NavigationPathname.OwnerRegisterLoading}`);
  };

  return (
    <>
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
                    src={getMenuThumbnailUrl(menu.imageFileKey) || ''}
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
