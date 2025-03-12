import IconLoadingSpinner from '@repo/design-system/components/icons/IconLoadingSpinner';

export default async function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <IconLoadingSpinner size={104} viewBox="0 0 104 104" />
    </div>
  );
}
