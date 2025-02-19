import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

import { useEffect, useState } from 'react';
import type { SavedListItem } from '@repo/entity/src/store';

export const useSavedList = (userId: number) => {
  const [savedList, setSavedList] = useState<SavedListItem[]>([]);

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const fetchSavedList = async (userId: number) => {
    const result = await storeService.getSavedListAll('인증', userId);
    setSavedList(result);
  };
  useEffect(() => {
    fetchSavedList(userId);
  }, [userId]);

  return {
    savedList,
  };
};
