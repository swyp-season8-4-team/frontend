import IconLoadingSpinner from '@repo/design-system/components/icons/IconLoadingSpinner';
import { MobileScreenProvider } from './_contexts/MobileScreenProvider';

export default async function Loading() {
  return (
    <MobileScreenProvider>
      <main className="flex flex-col items-center justify-center h-full min-h-screen">
        <IconLoadingSpinner
          className="animate-spin"
          size={104}
          viewBox="0 0 104 104"
        />
      </main>
    </MobileScreenProvider>
  );
}
