import { useEffect, useState } from 'react';

import type { StoreDetailData } from '@repo/entity/src/store';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

const storeService = new StoreService({
  storeRepository: new StoreAPIReopository(),
});

export function useStoreDetail(storeId: number) {
  const [storeDetail, setStoreDetail] = useState<StoreDetailData>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchStoreDetail = async (storeId: number) => {
      if (!storeId) return;
      const result = await storeService.getStoreDetail(storeId);
      setStoreDetail(result);
    };

    fetchStoreDetail(storeId);
  }, [storeId]);
  return {
    storeDetail,
  };
}
