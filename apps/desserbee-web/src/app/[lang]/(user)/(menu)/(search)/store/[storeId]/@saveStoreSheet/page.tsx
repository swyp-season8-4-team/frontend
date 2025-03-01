import { SaveStoreBottomSheetContainer } from '../_components/(bottomSheet)';

interface SavedStoreSheetProps {
  searchParams: Promise<{
    saveStore: string;
  }>;
}

export default async function SavedStoreSheet({
  searchParams,
}: SavedStoreSheetProps) {
  const params = await searchParams;

  const bottomsheet = params.saveStore === 'true';

  return <SaveStoreBottomSheetContainer showBottomSheet={bottomsheet} />;
}
