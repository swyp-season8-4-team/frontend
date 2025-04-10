import { BottomSheetContainer } from './_components/BottomSheetContainer';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';

export default async function BottomSheetPage({
  searchParams,
}: {
  searchParams: Promise<{ bottomsheet?: string; storeId?: string }>;
}) {
  const searchParam = await searchParams;
  const bottomsheet = searchParam.bottomsheet === 'true';
  const storeId = searchParam.storeId;

  let storeSummary = null;

  if (storeId) {
    const storeService = new StoreService({
      storeRepository: new StoreAPIRepository(),
    });

    try {
      storeSummary = await storeService.getStoreSummary(storeId);
    } catch (error) {
      console.log(error);
    }
  }

  if (!storeId || !bottomsheet) {
    return null;
  }

  return (
    <BottomSheetContainer
      showBottomSheet={bottomsheet}
      storeSummary={storeSummary}
    />
  );
}
