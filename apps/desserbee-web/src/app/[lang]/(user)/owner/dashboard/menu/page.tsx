'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import type { CreateMenuRequest, Menu } from '@repo/entity/src/store';
import { useContext, useEffect, useState } from 'react';
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
        const requests: CreateMenuRequest[]= [{
          name: menu.name,
          price: menu.price,
          description: menu.description || '',
          isPopular: menu.isPopular ?? false,
          imageFileKey: imageFiles && imageFiles.length > 0 ? imageFiles[0].name : undefined
        }];
  
        await createMenu({
          storeUuid,
          requests,
          menuImages: imageFiles?.length ? imageFiles : undefined
        });
  
        alert('메뉴 등록 성공!');
      }
    } catch (error) {
      console.error(error);
      alert('메뉴 등록에 실패했습니다');
    }
    pop('modal');
  };
  
  console.log(menulist);

  useEffect(() => {
    async function fetchMenuList() {
      try {
        const menulist = await getMenuList({ storeUuid: storeUuid! });
        setMenulist(menulist);
      } catch (error) {
        console.log(error);
      }
    }
    if (storeUuid) {
      fetchMenuList();
    }
  }, [storeUuid]);

  return (
    <div>
      <DashBoardHeader title="메뉴 관리하기" />
      <button
        // onClick={() =>
        //   router.push(
        //     navigationService.getHref(NavigationPathname.OwnerDashboardMenuRegister) +
        //       `?storeUuid=${storeUuid}`,
        //   )
        // }
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
