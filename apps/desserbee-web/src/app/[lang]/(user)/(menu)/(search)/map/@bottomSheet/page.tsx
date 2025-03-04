'use client';

import { BottomSheetContainer } from './_components/BottomSheetContainer';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import type { StoreSummaryInfoData } from '@repo/entity/src/store';

export default function BottomSheetPage() {
  const searchParams = useSearchParams();
  const [storeSummary, setStoreSummary] = useState<StoreSummaryInfoData | null>(
    null,
  );

  const bottomsheet = searchParams.get('bottomsheet') === 'true';
  const storeId = searchParams.get('storeId');

  const fetchStoreSummary = useCallback(async (id: string) => {
    if (!id) return;

    const storeService = new StoreService({
      storeRepository: new StoreAPIRepository(),
    });

    try {
      const summary = await storeService.getStoreSummary(id);
      setStoreSummary(summary);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!storeId || !bottomsheet) {
    return null;
  }

  return (
    <BottomSheetContainer
      showBottomSheet={bottomsheet}
      storeSummary={storeSummary}
      fetchStoreSummary={fetchStoreSummary}
    />
  );
}
