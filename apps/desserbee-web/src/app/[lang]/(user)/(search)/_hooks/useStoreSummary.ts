import { useEffect, useState } from 'react';

import type { StoreSummaryData } from '@repo/entity/src/store';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

export function useStoreSummary(storeId: number) {
  const [storeSummary, setStoreSummary] = useState<
    StoreSummaryData | undefined
  >();
  const [error, setError] = useState<string>();

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const fetchStoreSummary = async (storeId: number) => {
    const result = await storeService.getStoreSummary(storeId);
    setStoreSummary(result);
  };

  useEffect(() => {
    fetchStoreSummary(storeId);
  }, [storeId]);

  return {
    storeSummary,
    error,
  };
}
