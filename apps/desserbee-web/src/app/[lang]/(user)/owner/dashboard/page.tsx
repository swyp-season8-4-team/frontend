'use client';
import { ShopInfo } from './_components/ShopInfo';
import { ShopDetail } from './_components/ShopDetail';
import { Notice } from './_components/Notice';
import { MenuList } from './_components/MenuList';
import { DashBoardHeader } from './_components/DashBoardHeader';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStoreDetail } from '../../(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import type { StoreDetailInfoData } from '@repo/entity/src/store';

export default function DashBoardHomePage() {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const [storeInfo, setStoreInfo] = useState<StoreDetailInfoData | null>(null);

  useEffect(() => {
    async function fetchStoreDetails() {
      if (!storeUuid) return;
      const detail = await getStoreDetail({ storeUuid });
      setStoreInfo(detail);
    }
    fetchStoreDetails();
  }, [storeUuid]);

  return (
    <div className="h-full bg-[#EBEBEB]">
      <DashBoardHeader title="기본 정보 관리하기" />
      <div className="flex flex-col gap-4">
        <ShopInfo
          img={storeInfo?.storeImages || []}
          name={storeInfo?.name || ''}
          phone={storeInfo?.phone || ''}
          address={storeInfo?.address || ''}
          operatingTime={storeInfo?.operatingHours || []}
          sns={storeInfo?.storeLinks || []}
          storeUuid={storeUuid || ''}
        />
        <ShopDetail
          tags={storeInfo?.tags || []}
          description={storeInfo?.description || ''}
          animalYn={storeInfo?.animalYn}
          tumblerYn={storeInfo?.tumblerYn}
          parkingYn={storeInfo?.parkingYn}
        />
        <MenuList title="메뉴리스트" menuLists={storeInfo?.menus || []} />
        <Notice
          title="최근 공지"
          notices={storeInfo?.notices || []}
        />
      </div>
    </div>
  );
}
