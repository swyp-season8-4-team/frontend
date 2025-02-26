import { BottomSheetContainer } from './_components/BottomSheetContainer';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';

interface BottomSheetPageProps {
  searchParams: Promise<{
    bottomsheet: boolean;
    storeId?: string;
  }>;
}

export default async function BottomSheetPage({
  searchParams,
}: BottomSheetPageProps) {
  const params = await searchParams;
  const storeId = params.storeId;
  const bottomsheet = params.bottomsheet === true;

  const storeService = new StoreService({
    storeRepository: new StoreAPIRepository(),
  });

  if (storeId && bottomsheet) {
    const storeSummary = await storeService.getStoreSummary(storeId);
    return (
      <BottomSheetContainer
        showBottomSheet={bottomsheet}
        storeSummary={storeSummary}
      />
    );
  } else {
    return null;
  }
}
