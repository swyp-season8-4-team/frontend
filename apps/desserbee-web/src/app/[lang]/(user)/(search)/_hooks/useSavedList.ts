import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

import { useEffect, useState } from 'react';
import type { SavedListData } from '@repo/entity/src/store';

export const useSavedList = (userUuid: string) => {
  const [savedList, setSavedList] = useState<SavedListData[]>([]);

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const fetchSavedList = async (userUuid: string) => {
    const result = await storeService.getSavedListAll('인증', userUuid);
    setSavedList(result);
  };
  useEffect(() => {
    fetchSavedList(userUuid);
  }, [userUuid]);

  return {
    savedList,
  };
};
