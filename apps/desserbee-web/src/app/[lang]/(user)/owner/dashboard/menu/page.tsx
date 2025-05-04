'use client';
import { useSearchParams } from 'next/navigation';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import type { Menu } from '@repo/entity/src/store';
import { useEffect, useState } from 'react';
import { getMenuList } from '../../../(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { MenuCard } from '../_components/MenuCard';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const [menulist, setMenulist] = useState<Menu[]>([]);

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
  console.log(menulist);

  return (
    <div>
      <DashBoardHeader title="메뉴 관리하기" />
      <button
        // onClick={() =>
        //   router.push(
        //     navigationService.getHref(NavigationPathname.OwnerRegisterNotice) +
        //       `?storeUuid=${storeUuid}`,
        //   )
        // }
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
