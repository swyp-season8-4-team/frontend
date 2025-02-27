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
  // const fakeStoreId = '18c1cf2d-788c-4de5-8c2a-932515e06625';

  const bottomsheet = params.bottomsheet === 'true';

  const storeService = new StoreService({
    storeRepository: new StoreAPIRepository(),
  });

  // 조건문을 더 명확하게 수정
  if (!storeId || !bottomsheet) {
    return null;
  }

  const storeSummary = await storeService.getStoreSummary(storeId); //TODO 서버에 가게 모두 등록되면 수정
  return (
    <BottomSheetContainer
      showBottomSheet={bottomsheet}
      storeSummary={storeSummary}
    />
  );
}
