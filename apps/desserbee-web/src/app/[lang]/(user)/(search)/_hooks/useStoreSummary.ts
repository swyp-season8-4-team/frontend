import { useEffect, useState } from 'react';

import type { StoreSummaryData } from '@repo/entity/src/store';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

const storeService = new StoreService({
  storeRepository: new StoreAPIReopository(),
});

export function useStoreSummary(storeId: number) {
  const [storeSummary, setStoreSummary] = useState<
    StoreSummaryData | undefined
  >();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchStoreSummary = async (storeId: number) => {
      if (!storeId) return;
      const result = await storeService.getStoreSummary(storeId);
      setStoreSummary(result);
    };

    fetchStoreSummary(storeId);
  }, [storeId]);

  return {
    storeSummary,
    error,
  };
}
