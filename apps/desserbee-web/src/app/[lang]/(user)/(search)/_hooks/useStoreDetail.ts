import { useEffect, useState } from 'react';

import type { StoreDetailInfoData } from '@repo/entity/src/store';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

const storeService = new StoreService({
  storeRepository: new StoreAPIReopository(),
});

export function useStoreDetail(storeUuid: string) {
  const [storeDetail, setStoreDetail] = useState<StoreDetailInfoData>();

  useEffect(() => {
    const fetchStoreDetail = async (storeUuid: string) => {
      if (!storeUuid) return;
      const result = await storeService.getStoreDetail(storeUuid);
      setStoreDetail(result);
    };

    fetchStoreDetail(storeUuid);
  }, [storeUuid]);
  return {
    storeDetail,
  };
}
