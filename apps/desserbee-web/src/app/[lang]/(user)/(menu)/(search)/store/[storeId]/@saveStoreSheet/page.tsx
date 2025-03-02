import { SaveStoreBottomSheetContainer } from '../_components/(bottomSheet)';

interface SavedStoreSheetProps {
  searchParams: Promise<{
    saveStore: string;
    storeUuid: string;
  }>;
}

export default async function SavedStoreSheet({
  searchParams,
}: SavedStoreSheetProps) {
  const params = await searchParams;

  const bottomsheet = params.saveStore === 'true';
  const storeUuid = params.storeUuid;

  return (
    <SaveStoreBottomSheetContainer
      storeUuid={storeUuid}
      showBottomSheet={bottomsheet}
    />
  );
}
