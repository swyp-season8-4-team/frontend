'use client';
import Link from 'next/link';
import { DashBoardHeader } from '../dashboard/_components/DashBoardHeader';
import StoreCard from './_components/StoreCard';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';
import {
  getOwnerStoreList,
  getStoreSummary,
} from '../../(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import type {
  getOwnerStoreListResponse,
  StoreSummaryInfoData,
} from '@repo/entity/src/store';
import { useEffect, useState } from 'react';

const navigationService = new NavigationService({});

export default function StoreList() {
  const [stores, setStores] = useState<getOwnerStoreListResponse[]>([]);
  const [storesWithDetails, setStoresWithDetails] = useState<
    (getOwnerStoreListResponse & { details?: StoreSummaryInfoData })[]
  >([]);

  useEffect(() => {
    async function fetchStoresWithDetails() {
      // 1. 가게 목록 가져오기
      const storesList = await getOwnerStoreList();
      setStores(storesList);

      // 2. 각 가게마다 상세정보 병렬로 가져오기
      const detailsPromises = storesList.map(async (store) => {
        const summaryInfo = await getStoreSummary({
          storeUuid: store.storeUuid,
        });

        // 각 가게 정보와 상세 정보 합치기
        return { ...store, details: summaryInfo };
      });
      const fullStoreData = await Promise.all(detailsPromises);
      setStoresWithDetails(fullStoreData);
    }

    fetchStoresWithDetails();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#EBEBEB] pb-5">
      <DashBoardHeader
        title="내 가게 목록"
        num={storesWithDetails.length.toString()}
      />
      <div className="flex w-full flex-col space-y-4">
        {storesWithDetails.map((store) => (
          <StoreCard
            key={store.storeUuid}
            name={store.name}
            tag={store.details?.tags || []}
            description={store.details?.description || ''}
            img={store.details?.storeImages?.[0]?.url || undefined}
            storeUuid={store.storeUuid}
          />
        ))}
      </div>
      <Link
        href={navigationService.getHref(NavigationPathname.OwnerRegister)}
        className="mx-auto mt-2 block w-[95%] rounded-[10px] border border-solid border-[#949494] bg-[#F5F5F5] px-4 py-2 text-center hover:bg-[#C9C9C9]"
      >
        + 내 가게 추가하기
      </Link>
    </div>
  );
}
