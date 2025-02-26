import { BottomSheetContainer } from './_components/BottomSheetContainer';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';

interface BottomSheetPageProps {
  searchParams: Promise<{
    bottomsheet: string;
    storeId?: string;
  }>;
}

export default async function BottomSheetPage({
  searchParams,
}: BottomSheetPageProps) {
  const params = await searchParams;
  const storeId = params.storeId;

  const bottomsheet = params.bottomsheet === 'true';
  console.log('bottomsheet:', bottomsheet);
  console.log('storeId:', storeId);
  const storeService = new StoreService({
    storeRepository: new StoreAPIRepository(),
  });

  // 조건문을 더 명확하게 수정
  if (!storeId || !bottomsheet) {
    return null;
  }

  const storeSummary = await storeService.getStoreSummary(storeId);
  return (
    <BottomSheetContainer
      showBottomSheet={bottomsheet}
      storeSummary={storeSummary}
    />
  );
}
