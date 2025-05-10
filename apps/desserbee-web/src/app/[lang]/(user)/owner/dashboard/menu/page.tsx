'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import type { CreateMenuRequest, Menu } from '@repo/entity/src/store';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  createMenu,
  getMenuList,
} from '../../../(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { MenuCard } from '../_components/MenuCard';
import NavigationService from '@repo/usecase/src/navigationService';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { MenuAddModal } from '../../register/_modals/MenuAddModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';

const navigationService = new NavigationService({});
export default function MenuPage() {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const [menulist, setMenulist] = useState<Menu[]>([]);
  const router = useRouter();
  const { push, pop } = useContext(PortalContext);

  const openMenuAddModal = () => {
    push('modal', {
      component: <MenuAddModal onClose={closeMenuAddModal} />,
    });
  };

  const closeMenuAddModal = async (menu?: Menu, imageFiles?: File[]) => {
    try {
      if (menu && storeUuid) {
        const requests: CreateMenuRequest[] = [
          {
            name: menu.name,
            price: menu.price,
            description: menu.description || '',
            isPopular: menu.isPopular ?? false,
            ...(imageFiles && imageFiles.length > 0
              ? { imageFileKey: imageFiles[0].name }
              : {}),
          },
        ];

        await createMenu({
          storeUuid,
          requests,
          menuImages: imageFiles || []
        });

        alert('메뉴 등록 성공!');
        await fetchMenuList();
      }
    } catch (error) {
      console.error(error);
      alert('메뉴 등록에 실패했습니다');
    }
    router.refresh();
    pop('modal');
  };

  const fetchMenuList = useCallback(async () => { //useEffect의 의존성 배열 안에 들어가므로 useCallback 사용
    try {
      const menulist = await getMenuList({ storeUuid: storeUuid! });
      setMenulist(menulist);
    } catch (error) {
      console.log(error);
    }
  }, [storeUuid]);
  
  useEffect(() => {
    if (storeUuid) {
      fetchMenuList();
    }
  }, [storeUuid, fetchMenuList]);

  return (
    <div>
      <DashBoardHeader title="메뉴 관리하기" />
      <button
        onClick={openMenuAddModal}
        className="mx-auto mb-[5px] block w-[95%] rounded-[10px] border border-solid border-[#949494] bg-[#F5F5F5] px-4 py-2 hover:bg-[#C9C9C9]"
      >
        + 새 메뉴 추가하기
      </button>
      <div>
        {menulist.map((item, idx) => (
          <div key={idx}>
            <MenuCard
              img={item.images}
              name={item.name}
              description={item.description}
              price={item.price}
              isDelete={true}
              storeUuid={storeUuid || ''}
              menuUuid={item.menuUuid}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
