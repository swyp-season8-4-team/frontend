import { SaveStoreBottomSheetContainer } from './_components/SaveStoreBottomSheetContainer';

interface SavedStoreSheetProps {
  params: Promise<{
    storeId: string;
  }>;
  searchParams: Promise<{
    saveStore: string;
  }>;
}

export default async function SavedStoreSheet({
  params,
  searchParams,
}: SavedStoreSheetProps) {
  const { saveStore } = await searchParams;
  const { storeId } = await params;

  const bottomsheet = saveStore === 'true';

  return (
    <SaveStoreBottomSheetContainer
      storeUuid={storeId}
      showBottomSheet={bottomsheet}
    />
  );
}
