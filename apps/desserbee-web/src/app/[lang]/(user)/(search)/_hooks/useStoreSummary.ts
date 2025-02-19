import { useEffect, useState } from 'react';

import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

const storeService = new StoreService({
  storeRepository: new StoreAPIReopository(),
});

export function useStoreSummary(storeUuid: string) {
  const [storeSummary, setStoreSummary] = useState<
    StoreSummaryInfoData | undefined
  >();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchStoreSummary = async (storeUuid: string) => {
      if (!storeUuid) return;
      const result = await storeService.getStoreSummary(storeUuid);
      setStoreSummary(result);
    };

    fetchStoreSummary(storeUuid);
  }, [storeUuid]);

  return {
    storeSummary,
    error,
  };
}
